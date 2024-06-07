import React from 'react';

const PhotosMap = ({ photos, onDelete }) => {
    return (
        <div>
            <div className="row row-cols-auto row-cols-md-2 row-cols-lg-5">
                {photos.map(photo => (
                    <div key={photo.id} className="col position-relative photo_col py-3 mb-4">
                        <div className="col_image h-100" style={{backgroundImage: `url(${photo.filePath})` }}>
                            <button className="remove_btn position-absolute border-0" onClick={() => onDelete(photo.id)}>
                                <i className="bi bi-trash"></i>
                            </button>
                        </div>
                        <p>{photo.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotosMap;
