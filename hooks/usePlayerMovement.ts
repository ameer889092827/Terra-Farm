

import { useState, useEffect, useRef, useCallback } from 'react';
import { FARMER_SPEED, TILE_SIZE } from '../constants';

export const usePlayerMovement = (gridRef: React.RefObject<HTMLDivElement>) => {
    const [position, setPosition] = useState({ x: 300, y: 200 });
    const [direction, setDirection] = useState<'down' | 'up' | 'left' | 'right'>('down');
    const [currentTileIndex, setCurrentTileIndex] = useState<number | null>(null);

    const keysPressed = useRef<{ [key: string]: boolean }>({});

    // Set up keyboard event listeners once.
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { keysPressed.current[e.key.toLowerCase()] = true; };
        const handleKeyUp = (e: KeyboardEvent) => { keysPressed.current[e.key.toLowerCase()] = false; };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // The main animation loop.
    useEffect(() => {
        let animationFrameId: number;

        const gameLoop = () => {
            setPosition(prevPosition => {
                let { x: newX, y: newY } = prevPosition;
                let moved = false;

                if (keysPressed.current['w'] || keysPressed.current['ArrowUp']) {
                    newY -= FARMER_SPEED;
                    setDirection('up');
                    moved = true;
                }
                if (keysPressed.current['s'] || keysPressed.current['ArrowDown']) {
                    newY += FARMER_SPEED;
                    setDirection('down');
                    moved = true;
                }
                if (keysPressed.current['a'] || keysPressed.current['ArrowLeft']) {
                    newX -= FARMER_SPEED;
                    setDirection('left');
                    moved = true;
                }
                if (keysPressed.current['d'] || keysPressed.current['ArrowRight']) {
                    newX += FARMER_SPEED;
                    setDirection('right');
                    moved = true;
                }

                if (gridRef.current) {
                    const rect = gridRef.current.getBoundingClientRect();
                    newX = Math.max(0, Math.min(newX, rect.width - 32)); // farmer width
                    newY = Math.max(0, Math.min(newY, rect.height - 48)); // farmer height
                }
                
                // If the position changed, update tile proximity
                if (moved) {
                    const farmerCenterX = newX + 16;
                    const farmerCenterY = newY + 40; // towards the feet
    
                    if (gridRef.current) {
                        const gridRect = gridRef.current.getBoundingClientRect();
                        const tiles = gridRef.current.querySelectorAll('.tile-hittarget');
                        let closestTile: { index: number | null, distance: number } = { index: null, distance: Infinity };
    
                        tiles.forEach(tileNode => {
                            const indexStr = (tileNode as HTMLElement).dataset.index;
                            if (indexStr === undefined) return;
                            const index = parseInt(indexStr, 10);
                            
                            const tileRect = tileNode.getBoundingClientRect();
                            const tileCenterX = tileRect.left - gridRect.left + tileRect.width / 2;
                            const tileCenterY = tileRect.top - gridRect.top + tileRect.height / 2;
                            const distance = Math.sqrt(Math.pow(farmerCenterX - tileCenterX, 2) + Math.pow(farmerCenterY - tileCenterY, 2));
    
                            if (distance < closestTile.distance) {
                                closestTile = { index, distance };
                            }
                        });
                        
                        if (closestTile.distance < TILE_SIZE / 1.5) { // Interaction radius
                            setCurrentTileIndex(closestTile.index);
                        } else {
                            setCurrentTileIndex(null);
                        }
                    }
                    return { x: newX, y: newY };
                }

                // If not moved, return the same state to prevent unnecessary re-renders
                return prevPosition;
            });
            
            animationFrameId = requestAnimationFrame(gameLoop);
        };
        
        animationFrameId = requestAnimationFrame(gameLoop);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [gridRef]); // Only re-run if gridRef changes.

    return { position, direction, currentTileIndex };
};