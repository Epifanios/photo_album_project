import React from 'react';

const FilterAlbumsForm = ({ albums, selectedAlbum, onAlbumChange }) => {
    return (
        <select className="form-select" aria-label="Default select example" value={selectedAlbum || ''} onChange={onAlbumChange}>
            <option value="" disabled>Select Album</option>
            {albums.map((album) => (
                <option key={album.id} value={album.id}>
                    {album.title}
                </option>
            ))}
        </select>
    );
};

export default FilterAlbumsForm;
