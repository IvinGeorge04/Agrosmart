import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import './DiseaseDetection.css'; // Using the updated CSS file

// Simple inline SVG icon for upload
const UploadIcon = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-9H8v2h3v3h2v-3h3v-2h-3V8h-2v3z" fill="#004d40"/>
        <path d="M13 8h-2v3H8v2h3v3h2v-3h3v-2h-3V8z" opacity="0.3"/>
    </svg>
);


const DiseaseDetection = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const { updateScanStats } = useAppContext();

    const handleFileSelect = (selectedFile) => {
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setResult(null); // Clear previous results
            setError('');
        } else {
            setError('Please select a valid image file.');
        }
    };

    const handleFileChange = (e) => {
        handleFileSelect(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select an image file to analyze.');
            return;
        }
        setLoading(true);
        setError('');
        setResult(null);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('https://agrosmart-7o36.onrender.com/api/detect-disease', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setResult(response.data);
            updateScanStats({ isHealthy: response.data.health_assessment.is_healthy });
        } catch (err) {
            setError('Analysis failed. The image may be unclear or the plant part not recognized. Please try a different image.');
        } finally {
            setLoading(false);
        }
    };

    // Drag and Drop Handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        handleFileSelect(droppedFile);
    };
    
    const triggerFileSelect = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="disease-detection-container">
            <div className="page-header">
                <h2>AI Plant Disease Detection</h2>
                <p>Upload or drag & drop a clear image of a plant leaf to check its health.</p>
            </div>

            <div className="card">
                {preview ? (
                    <div className="preview-container">
                        <img src={preview} alt="Plant Preview" className="image-preview" />
                         <form onSubmit={handleSubmit}>
                            <div className="preview-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => { setPreview(null); setFile(null); }}>Change Image</button>
                                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Analyzing...' : 'Check Health'}</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div 
                        className={`upload-zone ${isDragging ? 'drag-over' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={triggerFileSelect}
                    >
                        <input 
                            type="file" 
                            id="plantImage" 
                            ref={fileInputRef}
                            className="form-control-hidden" 
                            onChange={handleFileChange} 
                            accept="image/*" 
                        />
                        <div className="upload-content">
                            <UploadIcon />
                            <p><strong>Drag & drop an image here</strong></p>
                            <p>or click to browse</p>
                        </div>
                    </div>
                )}
                 {error && <p className="error-message">{error}</p>}
            </div>

            {loading && (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Analyzing Image...</p>
                </div>
            )}

            {result && (
                <div className="card result-card">
                    <h3>Analysis Result</h3>
                    {result.health_assessment.is_healthy ? (
                        <div className="healthy-result">
                            <p>✅ The plant appears to be healthy!</p>
                        </div>
                    ) : (
                        <div className="disease-result">
                            <h4>Diseases Found:</h4>
                            {result.health_assessment.diseases.map(disease => (
                                <div key={disease.id} className="disease-details">
                                    <h4>{disease.name}</h4>
                                    <p><strong>Confidence Score:</strong></p>
                                    <div className="probability-bar">
                                        <div className="probability-fill" style={{ width: `${(disease.probability * 100).toFixed(2)}%` }}>
                                            <span>{(disease.probability * 100).toFixed(2)}%</span>
                                        </div>
                                    </div>
                                    
                                    {disease.disease_details.treatment && (
                                        <div className="treatment-section">
                                            <h5>📋 Treatment Recommendations</h5>
                                            {disease.disease_details.treatment.prevention && (
                                                <div>
                                                    <strong>Prevention:</strong>
                                                    <ul>{disease.disease_details.treatment.prevention.map((tip, index) => <li key={index}>{tip}</li>)}</ul>
                                                </div>
                                            )}
                                            {disease.disease_details.treatment.biological && (
                                                <div>
                                                    <strong>Biological:</strong>
                                                     <ul>{disease.disease_details.treatment.biological.map((tip, index) => <li key={index}>{tip}</li>)}</ul>
                                                </div>
                                            )}
                                            {disease.disease_details.treatment.chemical && (
                                                <div>
                                                    <strong>Chemical:</strong>
                                                     <ul>{disease.disease_details.treatment.chemical.map((tip, index) => <li key={index}>{tip}</li>)}</ul>
                                                </div>
                                            )}
                                        </div>
                                    )}
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
