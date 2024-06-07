import React, { useState, useEffect } from 'react';
import Toast from '../Toast';
import { createAlbum, updateAlbum } from '../../Api';

const CreateAlbumsForm = ({ userId, addAlbum, onSave, album, isEditing }) => {
    const [title, setTitle] = useState(album.title);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [successMesssage, setSuccessMessage] = useState(null);

    useEffect(() => {
        setTitle(album.title);
    }, [album]);

    const triggerError = (message) => {
        setShowToast(true);
        setError(message);
        setTimeout(() => {
            setShowToast(false);
            setError(null);
        }, 5000);
    };

    const triggerSuccess = (message) => {
        setShowToast(true);
        setSuccessMessage(message);
        setTimeout(() => {
            setShowToast(false);
            setSuccessMessage(null);
        }, 5000);
    };


    const onHandleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous messages
        setError(null);
        setSuccessMessage(null);

        if(isEditing) {
            await updateAlbum(userId, album.id, title, onSave, triggerSuccess, setError, setTitle);
        } else {
            await createAlbum(userId, title, addAlbum, triggerSuccess, setError, setTitle);
        }
    }
    

    return (
        <div>
            <form onSubmit={onHandleSubmit}>
                <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Enter Title" className="form-control"/>              
                
                {error &&  <Toast show={showToast} type="danger" message={error} onClose={() => setShowToast(false)}/>}
                {successMesssage &&  <Toast show={showToast} type="success" message={successMesssage} onClose={() => setShowToast(false)}/>}

                <div className="d-flex justify-content-start">
                    <button className="btn btn_form mt-3 text-start" type="submit" onClick={() => triggerError(error)}>{isEditing ? 'Update' : 'Create'}</button>
                </div>
            </form>
        </div>
    );
};

export default CreateAlbumsForm;
