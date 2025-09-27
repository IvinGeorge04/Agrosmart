// import React, { useState } from 'react';
// import axios from 'axios';
// import { useAppContext } from '../context/AppContext';
// const DiseaseDetection = () => {
//     const [file, setFile] = useState(null);
//     const [result, setResult] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const { updateScanStats } = useAppContext();
//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!file) {
//             setError('Please select an image file.');
//             return;
//         }
//         setLoading(true);
//         setError('');
//         setResult(null);

//         const formData = new FormData();
//         formData.append('image', file);

//         try {
//             const response = await axios.post('http://localhost:3001/api/detect-disease', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             setResult(response.data);
//             updateScanStats({ isHealthy: response.data.health_assessment.is_healthy });
//         } catch (err) {
//             setError('An error occurred. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <div className="page-header"><h2>AI Plant Disease Detection</h2><p>Upload a clear image of a plant leaf to check its health.</p></div>
//             <div className="card">
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group"><label htmlFor="plantImage">Plant Image</label><input type="file" id="plantImage" className="form-control" onChange={handleFileChange} accept="image/*" /></div>
//                     <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Analyzing...' : 'Check Health'}</button>
//                 </form>
//                 {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
//             </div>
//             {result && (
//                 <div className="card" style={{ marginTop: '2rem' }}>
//                     <h3>Analysis Result</h3>
//                     {result.health_assessment.is_healthy ? (
//                         <p style={{color: 'green'}}><strong>The plant appears to be healthy!</strong></p>
//                     ) : (
//                         <div>
//                             <h4>Diseases Found:</h4>
//                             <ul>
//                                 {result.health_assessment.diseases.map(disease => (
//                                     <li key={disease.id}>
//                                         <strong>{disease.name}</strong> (Probability: {(disease.probability * 100).toFixed(2)}%)
//                                         {/* You can display more details like description and treatment here if you requested them in the API call */}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };
// export default DiseaseDetection;
import React, { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import './DiseaseDetection.css'; // Create this CSS file for specific styles

const DiseaseDetection = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { updateScanStats } = useAppContext();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setResult(null); // Clear previous results
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select an image file.');
            return;
        }
        setLoading(true);
        setError('');
        setResult(null);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:3001/api/detect-disease', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setResult(response.data);
            updateScanStats({ isHealthy: response.data.health_assessment.is_healthy });
        } catch (err) {
            setError('An error occurred during analysis. The image may be unclear or the plant part not recognized. Please try again with a different image.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>AI Plant Disease Detection</h2>
                <p>Upload a clear image of a plant leaf to check its health.</p>
            </div>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="plantImage">Upload Plant Image</label>
                        <input type="file" id="plantImage" className="form-control" onChange={handleFileChange} accept="image/*" />
                    </div>
                    {preview && <img src={preview} alt="Preview" className="image-preview" />}
                    <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Analyzing...' : 'Check Health'}</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>

            {result && (
                <div className="card result-card">
                    <h3>Analysis Result</h3>
                    {result.health_assessment.is_healthy ? (
                        <div className="healthy-result">
                            <p><strong>✅ The plant appears to be healthy!</strong></p>
                        </div>
                    ) : (
                        <div className="disease-result">
                            <h4>Diseases Found:</h4>
                            {result.health_assessment.diseases.map(disease => (
                                <div key={disease.id} className="disease-details">
                                    <h4>{disease.name}</h4>
                                    <p><strong>Probability:</strong> {(disease.probability * 100).toFixed(2)}%</p>
                                    
                                    {/* --- TREATMENT RECOMMENDATION PART --- */}
                                    {disease.disease_details.treatment && (
                                        <div className="treatment-section">
                                            <h5>📋 Treatment Recommendations</h5>
                                            {disease.disease_details.treatment.prevention && (
                                                <div>
                                                    <strong>Prevention:</strong>
                                                    <ul>
                                                        {disease.disease_details.treatment.prevention.map((tip, index) => <li key={index}>{tip}</li>)}
                                                    </ul>
                                                </div>
                                            )}
                                            {disease.disease_details.treatment.biological && (
                                                <div>
                                                    <strong>Biological Treatment:</strong>
                                                     <ul>
                                                        {disease.disease_details.treatment.biological.map((tip, index) => <li key={index}>{tip}</li>)}
                                                    </ul>
                                                </div>
                                            )}
                                            {disease.disease_details.treatment.chemical && (
                                                <div>
                                                    <strong>Chemical Treatment:</strong>
                                                     <ul>
                                                        {disease.disease_details.treatment.chemical.map((tip, index) => <li key={index}>{tip}</li>)}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {/* --- END OF TREATMENT PART --- */}

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DiseaseDetection;