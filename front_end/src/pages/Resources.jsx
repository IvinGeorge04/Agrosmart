import React from 'react';

// A simple functional component for a single resource item to keep the code clean
const ResourceItem = ({ title, children }) => (
    <div style={{ marginBottom: '1rem' }}>
        <strong>{title}</strong>
        <p style={{ marginTop: '0.25rem', paddingLeft: '1rem', borderLeft: '3px solid #eee' }}>
            {children}
        </p>
    </div>
);

const Resources = () => {
    return (
        <div>
            <div className="page-header">
                <h2>Fertilizers & Pest Management</h2>
                <p>A comprehensive guide to crop nutrition and protection for healthy, productive yields.</p>
            </div>

            {/* FERTILIZERS SECTION */}
            <div className="card" style={{ marginBottom: '2rem' }}>
                <h3>Understanding Fertilizers: Plant Nutrition</h3>
                <p>Fertilizers replenish essential nutrients in the soil that plants consume to grow. Proper nutrition is key to plant health, disease resistance, and yield.</p>

                <h4>Primary Macronutrients (N-P-K)</h4>
                <p>These are required in the largest quantities and are the basis of most common fertilizers.</p>
                <ul>
                    <li><strong>Nitrogen (N):</strong> A fundamental component of chlorophyll (giving leaves their green color) and proteins. Essential for vegetative growth, especially leaves and stems. <em>Signs of deficiency: Yellowing of older leaves (chlorosis), stunted growth.</em></li>
                    <li><strong>Phosphorus (P):</strong> Crucial for energy transfer, photosynthesis, and genetic material (DNA, RNA). It promotes strong root development, early plant maturity, and flower and fruit production. <em>Signs of deficiency: Stunted growth, purplish discoloration of leaves.</em></li>
                    <li><strong>Potassium (K):</strong> Known as the "quality" nutrient. It regulates water movement, activates enzymes, and is vital for overall plant vigor, disease resistance, and fruit quality. <em>Signs of deficiency: Yellowing or browning on the edges of older leaves, weak stems.</em></li>
                </ul>
                <hr style={{margin: '1rem 0'}} />

                <h4>Secondary Macronutrients</h4>
                <p>These are also essential but are required in smaller quantities than N-P-K.</p>
                <ul>
                    <li><strong>Calcium (Ca):</strong> Builds strong cell walls, contributing to plant structure and preventing blossom-end rot in fruits like tomatoes.</li>
                    <li><strong>Magnesium (Mg):</strong> The central atom in the chlorophyll molecule, making it essential for photosynthesis.</li>
                    <li><strong>Sulfur (S):</strong> A component of some amino acids and vitamins, important for giving flavor and odor to crops like onions and mustard.</li>
                </ul>
                <hr style={{margin: '1rem 0'}} />

                <h4>Types of Fertilizers & Soil Amendments</h4>
                <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
                    <div style={{flex: 1, minWidth: '300px'}}>
                        <h5>Organic & Bio-Fertilizers</h5>
                        <p>These improve soil health over time by adding organic matter.</p>
                        <ResourceItem title="Vermicompost:">
                            An excellent all-purpose fertilizer created by earthworms. Rich in a wide range of nutrients, improves soil aeration, water retention, and microbial activity.
                        </ResourceItem>
                         <ResourceItem title="Farm Yard Manure (FYM):">
                            Decomposed mixture of cattle dung, urine, and bedding. Provides nutrients and adds significant organic matter to the soil.
                        </ResourceItem>
                        <ResourceItem title="Neem Cake:">
                            A by-product of neem oil production. It provides nitrogen and other nutrients while also having pesticidal properties, helping to control nematodes and soil-borne pests.
                        </ResourceItem>
                        <ResourceItem title="Rhizobium / Azotobacter:">
                            Bio-fertilizers containing bacteria that fix atmospheric nitrogen in the soil, making it available for plants. Especially useful for legumes.
                        </ResourceItem>
                    </div>
                    <div style={{flex: 1, minWidth: '300px'}}>
                        <h5>Synthetic (Chemical) Fertilizers</h5>
                        <p>These provide a concentrated and rapid supply of specific nutrients.</p>
                        <ResourceItem title="Urea:">
                            A highly concentrated source of nitrogen (46% N). It's fast-acting but can be volatile if not incorporated into the soil.
                        </ResourceItem>
                        <ResourceItem title="Di-Ammonium Phosphate (DAP):">
                            Provides both Nitrogen (18%) and Phosphorus (46%). Excellent for use at planting time to promote root growth.
                        </ResourceItem>
                        <ResourceItem title="Muriate of Potash (MOP):">
                            A primary source of Potassium (Potassium Chloride). Essential for fruit and flower development.
                        </ResourceItem>
                        <ResourceItem title="NPK Complexes:">
                             Balanced fertilizers available in various ratios (e.g., 10-26-26, 19-19-19) to provide all three primary nutrients in one application.
                        </ResourceItem>
                    </div>
                </div>

            </div>

             {/* PEST & DISEASE MANAGEMENT SECTION */}
            <div className="card" style={{ marginBottom: '2rem' }}>
                <h3>Pest & Disease Management</h3>
                <p>Effective management involves a combination of preventative measures and targeted treatments, often referred to as Integrated Pest Management (IPM).</p>
                
                <h4>Bio-Pesticides & Organic Methods</h4>
                <p>These options are generally safer for the environment, beneficial insects, and consumers.</p>
                 <ul>
                    <li><strong>Neem Oil:</strong> A broad-spectrum, natural insecticide, fungicide, and miticide. It acts as a repellent and growth disruptor. Effective against aphids, whiteflies, and spider mites.</li>
                    <li><strong>Bacillus thuringiensis (Bt):</strong> A soil bacterium that produces proteins toxic to specific insect larvae, particularly caterpillars (Lepidoptera). It is harmless to humans, birds, and beneficial insects.</li>
                    <li><strong>Insecticidal Soap:</strong> A formulation of potassium fatty acids that dissolves the outer protective layer of soft-bodied insects like aphids, mealybugs, and thrips, causing them to dehydrate.</li>
                    <li><strong>Trichoderma:</strong> A beneficial fungus used as a bio-fungicide to control soil-borne diseases like root rot by parasitizing pathogenic fungi.</li>
                     <li><strong>Pheromone Traps:</strong> Used to monitor and trap specific insect pests (like fruit flies) by using synthetic attractants.</li>
                </ul>
                <hr style={{margin: '1rem 0'}} />

                <h4>Chemical Pesticides</h4>
                <p>Used for severe infestations when other methods are insufficient. <strong>Always use with extreme caution and follow label instructions.</strong></p>
                <ul>
                    <li><strong>Insecticides:</strong> Used to control insects. Examples include <em>Imidacloprid</em> (systemic, for sucking pests) and <em>Cypermethrin</em> (contact, for chewing pests).</li>
                    <li><strong>Fungicides:</strong> Used to control fungal diseases like rusts, mildews, and blights. Examples include <em>Mancozeb</em> (broad-spectrum protectant) and <em>Carbendazim</em> (systemic).</li>
                    <li><strong>Herbicides:</strong> Used to control weeds. Examples include <em>Glyphosate</em> (non-selective, post-emergent) and <em>Pendimethalin</em> (selective, pre-emergent).</li>
                </ul>
            </div>

            {/* SAFETY SECTION */}
            <div className="card" style={{border: '2px solid #ffcc00', backgroundColor: '#fffbe6'}}>
                <h3>Important: Safety & Best Practices</h3>
                <p>The application of any fertilizer or pesticide requires responsibility and care to protect yourself, your crops, and the environment.</p>
                <ol>
                    <li><strong>Always Read the Label:</strong> The product label is a legal document. It contains critical information on dosage, application method, target pests/crops, and safety precautions.</li>
                    <li><strong>Use Personal Protective Equipment (PPE):</strong> When handling chemical products, always wear gloves, masks, goggles, and full-sleeved clothing.</li>
                    <li><strong>Correct Dosage:</strong> Never use more than the recommended amount. Over-application can damage your plants, harm the soil, and pollute water sources. "More" is not "better."</li>
                    <li><strong>Timing is Everything:</strong> Apply pesticides in the early morning or late evening when beneficial insects like bees are less active and the weather is calm to avoid spray drift.</li>
                    <li><strong>Environmental Care:</strong> Avoid application near water bodies like ponds or streams. Dispose of empty containers responsibly as per local guidelines.</li>
                    <li><strong>Integrated Pest Management (IPM):</strong> Prioritize preventative and biological methods first. Use chemical pesticides as a last resort to minimize resistance and environmental impact.</li>
                </ol>
            </div>
        </div>
    );
};

export default Resources;