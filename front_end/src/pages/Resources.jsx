import React from 'react';

const Resources = () => {
    return (
        <div>
            <div className="page-header"><h2>Fertilizers & Pesticides</h2><p>Learn about common treatments and nutrients for your crops.</p></div>
            <div className="card" style={{marginBottom: '2rem'}}>
                <h3>Understanding Fertilizers</h3>
                <p>Fertilizers provide essential nutrients to plants. The three primary nutrients are Nitrogen (N), Phosphorus (P), and Potassium (K).</p>
                <ul>
                    <li><strong>Nitrogen (N):</strong> Crucial for leaf growth and green color.</li>
                    <li><strong>Phosphorus (P):</strong> Essential for root growth, flower, and fruit development.</li>
                    <li><strong>Potassium (K):</strong> Important for overall plant health and disease resistance.</li>
                </ul>
                <p><strong>Vermicompost</strong> is an excellent organic fertilizer created by earthworms. It's rich in nutrients and improves soil structure.</p>
            </div>
             <div className="card">
                <h3>Common Pesticides</h3>
                <p>Pesticides are used to control pests, including insects, weeds, and fungi.</p>
                <ul>
                    <li><strong>Neem Oil:</strong> A natural, organic insecticide and fungicide that is effective against many pests.</li>
                    <li><strong>Insecticidal Soap:</strong> A non-toxic option for soft-bodied insects like aphids.</li>
                    <li><strong>Bacillus thuringiensis (Bt):</strong> A microbial insecticide that targets specific insect pests without harming beneficial insects.</li>
                </ul>
            </div>
        </div>
    );
};
export default Resources;