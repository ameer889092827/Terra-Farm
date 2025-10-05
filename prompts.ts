
export const MASTER_PROMPT = `
## Context
You are creating detailed agricultural information content for an educational farming game that uses NASA satellite data. The game teaches sustainable farming practices through real-world data integration. Generate comprehensive, scientifically accurate information that's accessible to users with basic to intermediate agricultural knowledge.

## Task 1: Process Descriptions for User Actions

### When User Plants a Crop
Generate detailed explanations for what happens during planting, including:
- Seed germination process (imbibition, enzyme activation, radicle emergence)
- Optimal planting depth for each crop type
- Soil temperature requirements for germination
- How satellite data (NDVI, soil moisture) indicates planting readiness
- Root development stages and timeframes
- Initial nutrient uptake mechanisms
- Photosynthesis activation timeline

### When User Waters
Explain the irrigation process:
- Water absorption through root hairs via osmosis
- Capillary action in soil and plant tissues
- Transpiration and its role in nutrient transport
- How to interpret soil moisture percentage (field capacity vs. wilting point)
- Effects of overwatering (root rot, nutrient leaching, oxygen deprivation)
- Relationship between ET (evapotranspiration) rates and satellite data
- Water stress indicators visible in NDVI readings

### When User Fertilizes
Detail the fertilization process:
- NPK (Nitrogen, Phosphorus, Potassium) roles in plant growth
- Micronutrient functions (Iron, Zinc, Manganese, etc.)
- How fertilizers affect soil pH and microbial activity
- Nutrient mobility in soil solution
- Signs of nutrient deficiency in NDVI data
- Slow-release vs. quick-release fertilizer mechanics
- Environmental impact of over-fertilization (runoff, eutrophication)

### When User Harvests
Describe harvest optimization:
- Crop maturity indicators in satellite imagery
- Sugar/starch conversion in fruits and grains
- Optimal harvest moisture content for storage
- Post-harvest respiration rates
- How NDVI values correlate with crop ripeness
- Yield calculation based on plant density and environmental factors

## Task 2: Crop-Specific Information

For each crop in the game (Corn 🌽, Carrots 🥕, Potatoes 🥔, Wheat 🌾, Lettuce 🥬, Tomatoes 🍅), provide:

### Detailed Crop Profiles:
1. **Scientific name and family**
2. **Growth stages** (emergence, vegetative, reproductive, maturity)
3. **Days to maturity** under optimal conditions
4. **Temperature requirements**:
   - Minimum germination temp
   - Optimal growth range
   - Maximum tolerable temp
   - Frost sensitivity
5. **Water requirements**:
   - Daily water needs (mm/day)
   - Critical growth periods for irrigation
   - Drought tolerance rating
6. **Nutrient requirements**:
   - Primary nutrient ratios needed
   - pH preference
   - Common deficiency symptoms
7. **NDVI interpretation**:
   - Expected NDVI range during each growth stage
   - Stress indicators in vegetation indices
8. **Common challenges**:
   - Pest susceptibility
   - Disease risks at different moisture levels
   - Weather-related vulnerabilities

## Task 3: Non-Standard Scenarios (Edge Cases)

### Scenario 1: Extreme Weather Event
"A heat wave hits (temperature > 35°C for 3+ days). Explain:"
- Physiological effects on each crop type
- Heat stress mitigation strategies
- How satellite thermal data predicts crop stress
- Emergency irrigation scheduling
- Shade cloth or mulching benefits visible in data
- Recovery period requirements

### Scenario 2: Soil Moisture Sensor Malfunction
"Soil moisture reading shows 0% but plants look healthy. Explain:"
- Alternative indicators in NASA data (surface temperature, NDVI trends)
- Using weather data to estimate soil moisture
- Visual plant stress indicators
- Calculating water budget from precipitation and ET data
- Cross-referencing multiple satellite datasets for verification

### Scenario 3: Unexpected Pest Outbreak
"NDVI suddenly drops despite good conditions. Explain:"
- How pest damage appears in satellite imagery
- Differentiating pest damage from nutrient deficiency in data
- Integrated Pest Management (IPM) principles
- Using weather data to predict pest emergence
- Economic threshold concepts for treatment decisions

## Task 4: Advanced Agricultural Concepts

### Soil Science Fundamentals
- Soil texture triangle and water-holding capacity
- Cation Exchange Capacity (CEC) and nutrient retention
- Soil organic matter's role in fertility
- Microbial communities and nutrient cycling
- How satellite data indirectly measures soil health

### Precision Agriculture Techniques
- Variable rate application based on NDVI zones
- GPS-guided farming principles
- Yield mapping and data analysis
- Site-specific management zones
- Remote sensing for crop scouting

### Sustainable Practices
- Crop rotation benefits and planning
- Cover crop selection for soil health
- Conservation tillage effects on moisture retention
- Integrated nutrient management
- Carbon sequestration in agricultural soils

### Climate Adaptation Strategies
- Selecting climate-resilient varieties
- Adjusting planting dates based on climate data
- Water conservation techniques (drip irrigation, mulching)
- Windbreak effectiveness in satellite data
- Microclimate management

## Task 5: NASA Data Interpretation Guide

### Understanding Each Metric:
1. **NDVI (Normalized Difference Vegetation Index)**
   - Scale interpretation (0.1-0.9)
   - What each range means for crop health
   - Seasonal variations expected
   - Limitations and potential misinterpretations

2. **Soil Moisture Percentage**
   - Depth of measurement consideration
   - Relationship to soil type
   - Available water vs. total water content
   - Optimal ranges for different crops

3. **Temperature Data**
   - Air vs. soil vs. canopy temperature
   - Growing Degree Days (GDD) calculation
   - Thermal time concepts
   - Frost risk assessment

4. **Precipitation**
   - Effective rainfall vs. total rainfall
   - Rainfall intensity impacts
   - Water infiltration rates
   - Runoff potential indicators

5. **UV Index / Solar Irradiance**
   - Effects on photosynthesis
   - Plant stress responses
   - Protective mechanisms in plants
   - Optimal ranges for different crops

6. **Wind Speed**
   - Effects on transpiration rates
   - Mechanical damage thresholds
   - Pollination impacts
   - Spray drift considerations
   
7. **Relative Humidity**
   - Effects on transpiration, disease, and pests.

## Output Format Requirements:
- Use clear, educational language suitable for ages 12+
- Use markdown for formatting (headings, lists, bold text).
- Include practical tips that connect theory to game mechanics
- Provide "Did You Know?" facts to maintain engagement
- Use metric units with imperial conversions where helpful
- Include relevance to real-world farming challenges
- Highlight connections between NASA data and farming decisions
- Emphasize sustainable and conservation practices

## Example Output Structure:
\`\`\`markdown
### PROCESS: Planting Corn
When you plant corn in NASA Data Farm, here's what happens beneath the surface:

**1. Germination Begins** (0-3 days)
   - The seed absorbs water (imbibition), swelling to 1.5x its size.
   - Enzymes activate, converting stored starch to sugar for energy.
   - **NASA Data Check:** Soil moisture should be 60-70% for optimal germination.
   
**2. Root Emergence** (3-5 days)
   - The radicle (primary root) breaks through the seed coat.
   - Root hairs develop, increasing water absorption by 500x.
   - **🛰️ Satellite Insight:** Soil temperature above 10°C (50°F) is needed.
   
[Continue with similar detail...]

**💡 Pro Tip:** Watch NDVI values - they'll stay near 0.1-0.2 during germination but jump to 0.3+ once leaves emerge!
\`\`\`
Generate comprehensive content following these guidelines, ensuring scientific accuracy while maintaining accessibility and engagement for educational purposes.
`;
