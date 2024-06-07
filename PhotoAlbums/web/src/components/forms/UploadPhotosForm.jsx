import React, { useState, useRef } from 'react';
import Toast from '../Toast';
import { uploadPhotos } from '../../Api';

const UploadPhotosForm = ({ albumId, addPhotos }) => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('');
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null); // Reference for the file input
    const [showToast, setShowToast] = useState(false);
    const [successMesssage, setSuccessMessage] = useState(null);

    const triggerError = (message) => {
        setShowToast(true);
        setError(message);

        setTimeout(() => {
            setShowToast(false);
            setError(null);
        }, 5000);
    };


    //Validation for access only Images
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            setError(null);
        } else {
            setFile(null);
            fileInputRef.current.value = ''; // Clear file input field using ref
            setError('Please select a valid image file.');
        }
    };

    //Upload new Photo
    const onhandleSubmitPhotos = async (e) => {
        e.preventDefault();      
        uploadPhotos(albumId, file, title, addPhotos, setSuccessMessage, setError, setFile, setTitle, fileInputRef)
    }

    return (
        <div>
            <form onSubmit={onhandleSubmitPhotos}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="form-control"
                    ref={fileInputRef}
                />
                <div>
                    <input
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        className="form-control mt-3"
                    />
                </div>
                {error &&  <Toast show={showToast} type="danger" message={error} onClose={() => setShowToast(false)}/>}
                {successMesssage &&  <Toast show={showToast} type="success" message={successMesssage} onClose={() => setShowToast(false)}/>}

                <div className="d-flex justify-content-start">
                    <button className="btn btn_form mt-3 text-start" type="submit" onClick={() => triggerError(error)}>Upload</button>
                </div>
            </form>
        </div>
    );
};

export default UploadPhotosForm;
