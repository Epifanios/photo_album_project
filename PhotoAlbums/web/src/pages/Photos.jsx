import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAlbumByID, fetchAlbumsByUser, fetchPhotosByAlbum, deletePhotoById } from '../Api';
import PhotosMap from '../components/maps/PhotosMap';
import UploadPhotosForm from '../components/forms/UploadPhotosForm';
import FilterAlbumsForm from '../components/forms/FilterAlbumsForm';
import SpinnerLoading from '../components/SpinnerLoading';
import Pagination from '../components/Pagination';

function Photos() {
    const { userId, albumId } = useParams();
    const [albumTitle, setAlbumTitle] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(albumId);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 8;


    useEffect(() => {
        fetchAlbumsByUser(userId, setAlbums, setLoading); //Get Albums by User
    }, [userId]);


    useEffect(() => {
        if (selectedAlbum) {
            const fetchAlbumDetailsAndPhotos = async () => {
                try {
                    setLoading(true);
                    await fetchAlbumByID(selectedAlbum, setAlbumTitle); //Get Album Id
                    await fetchPhotosByAlbum(selectedAlbum, setPhotos, setTotalCount, currentPage, pageSize); //Get photos by Album Id
                    setLoading(false);
                } catch (error) {
                    setError('Error fetching album details or photos');
                    setLoading(false);
                }
            };
            fetchAlbumDetailsAndPhotos();
        }
    }, [selectedAlbum, currentPage]);

    //Handle Album value
    const onHandleAlbumChange = (e) => {
        setSelectedAlbum(e.target.value);
        setCurrentPage(1); // Reset to first page when album changes
    };

    //Add new photo to existing values on the state
    const addPhoto = (newPhoto) => {
        setPhotos((prevPhotos) => {
            const updatedPhotos = [...prevPhotos, newPhoto];
            const totalPages = Math.ceil((totalCount + 1) / pageSize);
            if (currentPage < totalPages) {
                setCurrentPage(totalPages);
            }
            return updatedPhotos;
        });
        setTotalCount(prevCount => prevCount + 1); // Increase total count by 1

    };


    const onHandleDeletePhoto = async (photoId) => {
        try {
            await deletePhotoById(photoId);
            setPhotos((prevPhotos) => prevPhotos.filter(photo => photo.id !== photoId));
            setTotalCount(prevCount => prevCount - 1); // Decrease total count by 1
        } catch (error) {
            setError('Error deleting photo');
        }
    };


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    return (
        <div className="container text-center">
            <div className="row mt-4">
                <h2 className="pb-5 mb-5">Photos of {albumTitle}</h2>

                <div className="col-lg-3">
                    <h5 className="mb-3 text-start">Add New Photo</h5>
                    <UploadPhotosForm albumId={selectedAlbum} addPhotos={addPhoto} />

                    <h5 className="pt-5 mb-3 text-start">Filter Album</h5>
                    <FilterAlbumsForm albums={albums} selectedAlbum={selectedAlbum} onAlbumChange={onHandleAlbumChange} />                  
                </div>
                <div className="col-lg-9 d-flex justify-content-center position-relative flex-wrap mt-lg-0 mt-5">
                    {loading ? (
                        <SpinnerLoading loading={loading}/>
                    ) : error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                        <>
                        {photos.length === 0 ? (
                            <p className="text-center">No photos available for this album.</p>
                        ) : (
                            <PhotosMap photos={photos} onDelete={onHandleDeletePhoto}/>
                        )}
                            <div className="w-100 d-flex justify-content-center mt-3">
                                <Pagination
                                    currentPage={currentPage}
                                    pageSize={pageSize}
                                    totalItems={totalCount} // Use the total count from the API
                                    onPageChange={handlePageChange}
                                />  
                            </div>                    
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Photos;
