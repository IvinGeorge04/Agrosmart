import React from 'react';

// Centralized styles for a cleaner, more maintainable component
const styles = {
    pageContainer: {
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        lineHeight: 1.6,
        color: '#333',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '2rem',
    },
    header: {
        textAlign: 'center',
        marginBottom: '3rem',
    },
    headerTitle: {
        fontSize: '2.5rem',
        fontWeight: 700,
        marginBottom: '0.5rem',
        color: '#111',
    },
    headerSubtitle: {
        fontSize: '1.1rem',
        color: '#666',
    },
    section: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
    sectionTitle: {
        fontSize: '1.75rem',
        fontWeight: 600,
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: '0.75rem',
        marginBottom: '1.5rem',
    },
    subsectionTitle: {
        fontSize: '1.25rem',
        fontWeight: 600,
        color: '#005a9c', // A subtle accent color
        marginTop: '2rem',
        marginBottom: '1rem',
    },
    list: {
        paddingLeft: '1.25rem',
        listStyle: 'disc',
    },
    listItem: {
        marginBottom: '1rem',
    },
    deficiency: {
        display: 'block',
        fontSize: '0.9rem',
        color: '#777',
        marginTop: '0.25rem',
        fontStyle: 'italic',
    },
    flexContainer: {
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        marginTop: '1.5rem',
    },
    flexChild: {
        flex: 1,
        minWidth: '300px',
    },
    resourceItem: {
        marginBottom: '1.5rem',
    },
    resourceTitle: {
        fontSize: '1rem',
        fontWeight: 600,
        marginBottom: '0.25rem',
    },
    resourceDescription: {
        fontSize: '0.95rem',
        color: '#555',
        margin: 0,
    },
    safetySection: {
        backgroundColor: '#fffaf0',
        borderLeft: '5px solid #f7b731',
        boxShadow: 'none',
    },
    orderedList: {
        paddingLeft: '1.25rem',
    }
};

// A cleaner, more semantic component for resource items
const ResourceItem = ({ title, children }) => (
    <div style={styles.resourceItem}>
        <h5 style={styles.resourceTitle}>{title}</h5>
        <p style={styles.resourceDescription}>{children}</p>
    </div>
);

const Resources = () => {
    return (
        <div style={styles.pageContainer}>
            <header style={styles.header}>
                <h2 style={styles.headerTitle}>Fertilizers & Pest Management</h2>
                <p style={styles.headerSubtitle}>A guide to crop nutrition and protection for healthy, productive yields.</p>
            </header>

            {/* FERTILIZERS SECTION */}
            <section style={styles.section}>
                <h3 style={styles.sectionTitle}>Understanding Fertilizers</h3>
                <p>Fertilizers replenish essential nutrients in the soil. Proper nutrition is key to plant health, disease resistance, and yield.</p>

                <h4 style={styles.subsectionTitle}>Primary Macronutrients (N-P-K)</h4>
                <ul style={styles.list}>
                    <li style={styles.listItem}>
                        <strong>Nitrogen (N):</strong> Essential for vegetative growth (leaves and stems). A core component of chlorophyll.
                        <span style={styles.deficiency}>Deficiency: Yellowing of older leaves, stunted growth.</span>
                    </li>
                    <li style={styles.listItem}>
                        <strong>Phosphorus (P):</strong> Promotes strong roots, early maturity, and flower/fruit production.
                        <span style={styles.deficiency}>Deficiency: Stunted growth, purplish discoloration of leaves.</span>
                    </li>
                    <li style={styles.listItem}>
                        <strong>Potassium (K):</strong> The "quality" nutrient. Vital for overall vigor, disease resistance, and fruit quality.
                        <span style={styles.deficiency}>Deficiency: Yellowing/browning on edges of older leaves, weak stems.</span>
                    </li>
                </ul>

                <h4 style={styles.subsectionTitle}>Secondary Macronutrients</h4>
                <ul style={styles.list}>
                    <li><strong>Calcium (Ca):</strong> Builds strong cell walls, preventing issues like blossom-end rot.</li>
                    <li><strong>Magnesium (Mg):</strong> The central atom in chlorophyll, essential for photosynthesis.</li>
                    <li><strong>Sulfur (S):</strong> Key for flavor and odor in crops like onions and mustard.</li>
                </ul>

                <h4 style={styles.subsectionTitle}>Types of Fertilizers</h4>
                <div style={styles.flexContainer}>
                    <div style={styles.flexChild}>
                        <h5>Organic & Bio-Fertilizers</h5>
                        <ResourceItem title="Vermicompost">
                            All-purpose fertilizer from earthworms. Improves soil aeration and water retention.
                        </ResourceItem>
                        <ResourceItem title="Farm Yard Manure (FYM)">
                            Decomposed mixture of cattle dung and bedding. Adds significant organic matter.
                        </ResourceItem>
                        <ResourceItem title="Neem Cake">
                            Provides nitrogen and has natural pesticidal properties against soil pests.
                        </ResourceItem>
                         <ResourceItem title="Rhizobium / Azotobacter">
                            Bio-fertilizers with bacteria that fix atmospheric nitrogen, making it available to plants.
                        </ResourceItem>
                    </div>
                    <div style={styles.flexChild}>
                        <h5>Synthetic (Chemical) Fertilizers</h5>
                        <ResourceItem title="Urea">
                            A highly concentrated (46% N), fast-acting source of nitrogen.
                        </ResourceItem>
                        <ResourceItem title="Di-Ammonium Phosphate (DAP)">
                            Provides Nitrogen (18%) and Phosphorus (46%), ideal for promoting root growth.
                        </ResourceItem>
                        <ResourceItem title="Muriate of Potash (MOP)">
                            A primary source of Potassium, essential for fruit and flower development.
                        </ResourceItem>
                        <ResourceItem title="NPK Complexes">
                            Balanced fertilizers available in various ratios (e.g., 10-26-26) for complete nutrition.
                        </ResourceItem>
                    </div>
                </div>
            </section>

             {/* PEST & DISEASE MANAGEMENT SECTION */}
            <section style={styles.section}>
                <h3 style={styles.sectionTitle}>Pest & Disease Management</h3>
                <p>Effective management involves a combination of preventative and targeted treatments, known as Integrated Pest Management (IPM).</p>
                
                <h4 style={styles.subsectionTitle}>Bio-Pesticides & Organic Methods</h4>
                <ul style={styles.list}>
                    <li><strong>Neem Oil:</strong> A natural, broad-spectrum insecticide, fungicide, and miticide.</li>
                    <li><strong>Bacillus thuringiensis (Bt):</strong> Soil bacterium toxic to specific insect larvae, especially caterpillars.</li>
                    <li><strong>Insecticidal Soap:</strong> Dissolves the protective outer layer of soft-bodied insects.</li>
                    <li><strong>Trichoderma:</strong> A beneficial fungus that controls soil-borne diseases like root rot.</li>
                    <li><strong>Pheromone Traps:</strong> Used to monitor and trap specific insect pests like fruit flies.</li>
                </ul>
                
                <h4 style={styles.subsectionTitle}>Chemical Pesticides</h4>
                 <p>Use as a last resort for severe infestations. <strong>Always follow label instructions with extreme caution.</strong></p>
                <ul style={styles.list}>
                    <li><strong>Insecticides:</strong> Control insects (e.g., <em>Imidacloprid</em>, <em>Cypermethrin</em>).</li>
                    <li><strong>Fungicides:</strong> Control fungal diseases (e.g., <em>Mancozeb</em>, <em>Carbendazim</em>).</li>
                    <li><strong>Herbicides:</strong> Control weeds (e.g., <em>Glyphosate</em>, <em>Pendimethalin</em>).</li>
                </ul>
            </section>

            {/* SAFETY SECTION */}
            <section style={{...styles.section, ...styles.safetySection}}>
                <h3 style={styles.sectionTitle}>Safety & Best Practices</h3>
                <ol style={styles.orderedList}>
                    <li style={styles.listItem}><strong>Read the Label:</strong> It contains critical info on dosage, application, and safety.</li>
                    <li style={styles.listItem}><strong>Use PPE:</strong> Always wear gloves, masks, and protective clothing when handling chemicals.</li>
                    <li style={styles.listItem}><strong>Correct Dosage:</strong> Over-application can damage plants, soil, and water sources.</li>
                    <li style={styles.listItem}><strong>Proper Timing:</strong> Apply in early morning or late evening to protect beneficial insects.</li>
                    <li style={styles.listItem}><strong>Environmental Care:</strong> Avoid application near water bodies and dispose of containers responsibly.</li>
                    <li style={styles.listItem}><strong>Prioritize IPM:</strong> Use chemical pesticides as a last resort, not a first choice.</li>
                </ol>
            </section>
        </div>
    );
};

export default Resources;