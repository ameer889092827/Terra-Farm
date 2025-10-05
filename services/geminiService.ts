

import { GoogleGenAI, Type } from "@google/genai";
import { GameState, NasaData, Location, FarmAnalysis, Crop, TileState } from "../types";
import { MASTER_PROMPT } from '../prompts';

// Using the new API key provided by the user to resolve the quota issue.
const API_KEY = "AIzaSyAcQRsPFq6ySL--L5ZytSzoUP_-_RkvrrA";

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = "gemini-2.5-flash";

export const getFarmAnalysis = async (gameState: GameState, nasaData: NasaData, location: Location): Promise<FarmAnalysis> => {
    const plantedTiles = gameState.tiles.filter(t => t.planted && !t.locked);
    const harvestableTiles = plantedTiles.filter(t => t.growth >= 4).length;

    const prompt = `
    You are Terra, an expert AI farm analyst for the game "NASA Data Farm". Your task is to analyze the provided game state and satellite data and return a structured JSON response.

    Your analysis should include:
    1.  A "summary": A brief, friendly, 1-2 sentence overview of the farm's current situation.
    2.  A "recommendations" array: A list of 2-3 of the most impactful, actionable recommendations for the player. These should be short bullet points.

    Current Location: ${location.name}
    Current Game State & Data:
    - Money: ${gameState.money}, Level: ${gameState.level}
    - Season: ${gameState.season}, Day: ${gameState.day}
    - Water: ${gameState.water}/${gameState.maxWater}L, Energy: ${gameState.energy}/${gameState.maxEnergy}
    - Planted Tiles: ${plantedTiles.length}
    - Harvestable Tiles: ${harvestableTiles}
    - Soil Moisture: ${nasaData.soilMoisture.toFixed(0)}%
    - Temperature: ${nasaData.temperature.toFixed(0)}°C
    - NDVI (Vegetation Index): ${nasaData.ndvi.toFixed(2)}

    Decision Logic for Recommendations:
    - Check for immediate needs: low water, very dry/wet soil, harvest-ready crops.
    - Suggest strategic actions: buying affordable upgrades, expanding the farm if money allows.
    - Provide seasonal advice: preparing for the next season, planting appropriate crops.
    - Reference NASA data: "Soil moisture is low (35%), consider watering your crops."

    Provide your response ONLY in the specified JSON format.
  `;
    
    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        summary: { type: Type.STRING },
                        recommendations: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    }
                }
            }
        });

        const jsonText = response.text.trim();
        const parsed = JSON.parse(jsonText) as FarmAnalysis;
        return parsed;

    } catch (error) {
        console.error("Gemini analysis call failed:", error);
        return {
            summary: "I had a system error while analyzing the farm. Please check the raw data yourself!",
            recommendations: ["- Check soil moisture levels manually.", "- Monitor for visual signs of crop stress."],
        };
    }
};

export const getEducationalContent = async (
  context: string, 
  crop: Crop | null,
  tile: TileState | null, 
  nasaData: NasaData
): Promise<string> => {
  if (!API_KEY) {
    return "The educational content module is currently offline. Please check your configuration.";
  }

  const prompt = `
    ${MASTER_PROMPT}

    ---
    CURRENT CONTEXT FOR YOUR RESPONSE:
    - User Action: ${context}
    - Current Crop: ${crop ? crop.name : 'N/A'}
    - Current Tile State: ${tile ? JSON.stringify(tile) : 'N/A'}
    - Current NASA Data: ${JSON.stringify(nasaData)}

    Please generate the appropriate educational content based on the user's action and the provided context. Follow the output format requirements from the prompt. For example, if the user is inspecting a crop, provide the detailed crop profile and process information. If they are viewing a data guide, explain that specific metric. Respond in clean markdown.
  `;
  
  try {
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature: 0.5,
        }
    });

    return response.text;
  } catch(error) {
    console.error("Gemini educational content call failed:", error);
    return "I'm having trouble retrieving detailed information at the moment. Please try again shortly.";
  }
};