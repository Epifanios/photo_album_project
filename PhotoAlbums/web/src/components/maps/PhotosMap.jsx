import React from 'react';

const PhotosMap = ({ photos, onDelete }) => {
    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {photos.map(photo => (
                    <div key={photo.id} className="m-3 position-relative">
                        <button className="remove_btn position-absolute border-0" onClick={() => onDelete(photo.id)}>
                            <i className="bi bi-trash"></i>
                        </button>
                        <img src={photo.filePath} alt={photo.title} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                        <p>{photo.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotosMap;
