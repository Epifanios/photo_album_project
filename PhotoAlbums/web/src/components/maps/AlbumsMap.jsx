import React from 'react';

const AlbumsMap = ({ albums, userId, onDelete, onEdit }) => {
    return (
        <div>
            <div className="row row-cols-2 row-cols-lg-5">
                {albums.map((album) => (
                    <div key={album.id} className="col position-relative album_col p-3">
                        <a href={`/user/${userId}/album/${album.id}/photos`} className="d-block">
                            <div className="m-3 position-relative">
                                <i className="bi bi-images"></i>
                                <p className="album_title">{album.title}</p>
                            </div>
                        </a>
                        <button className="remove_btn position-absolute border-0" onClick={() => onDelete(album.id)}>
                            <i className="bi bi-trash"></i>
                        </button>
                        <button className="btn btn_form mt-3 text-start" onClick={() => onEdit(album)}>Edit</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlbumsMap;
