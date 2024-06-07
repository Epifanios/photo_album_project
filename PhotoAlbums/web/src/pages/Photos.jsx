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
    const pageSize = 10;

    // Fetch albums only once when userId changes
    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                setLoading(true);
                const { albums: fetchedAlbums } = await fetchAlbumsByUser(userId, true);
                setAlbums(fetchedAlbums);
                setLoading(false);
            } catch (error) {
                setError('Error fetching albums');
                setLoading(false);
            }
        };
        fetchAlbums();
    }, [userId]);

    // Fetch album details and photos when selectedAlbum or currentPage changes
    useEffect(() => {
        const fetchAlbumDetailsAndPhotos = async () => {
            try {
                setLoading(true);
                await fetchAlbumByID(selectedAlbum, setAlbumTitle);
                const { photos: fetchedPhotos, totalCount: total } = await fetchPhotosByAlbum(selectedAlbum, currentPage, pageSize);
                setPhotos(fetchedPhotos);
                setTotalCount(total);
                setLoading(false);
            } catch (error) {
                setError('Error fetching album details or photos');
                setLoading(false);
            }
        };
        if (selectedAlbum) {
            fetchAlbumDetailsAndPhotos();
        }
    }, [selectedAlbum, currentPage]);

    const onHandleAlbumChange = (e) => {
        setSelectedAlbum(e.target.value);
        setCurrentPage(1); // Reset to first page when album changes
    };

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
            setTotalCount(prevCount => prevCount - 1); // Decrease total count by 1

            const updatedPhotos = photos.filter(photo => photo.id !== photoId);
            setPhotos(updatedPhotos);

            // Refetch photos to reflect the changes
            const { photos: fetchedPhotos, totalCount: total } = await fetchPhotosByAlbum(selectedAlbum, currentPage, pageSize);
            setPhotos(fetchedPhotos);
            setTotalCount(total);

            // Adjust the current page if necessary
            if (fetchedPhotos.length === 0 && currentPage > 1) {
                setCurrentPage(prevPage => prevPage - 1);
            }
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

                <div className="col-xl-3 text-start ">
                    <div className="back_link pb-5">
                        <a href={`/user/${userId}/albums`}>
                            <i className="bi bi-chevron-left pr-4">Back to Albums</i>
                        </a>
                    </div>
                    <h5 className="mb-3 text-start">Add New Photo</h5>
                    <UploadPhotosForm albumId={selectedAlbum} addPhotos={addPhoto} />

                    <h5 className="pt-5 mb-3 text-start">Filter Album</h5>
                    <FilterAlbumsForm albums={albums} selectedAlbum={selectedAlbum} onAlbumChange={onHandleAlbumChange} />                  
                </div>
                <div className="col-xl-9 mt-xl-0 mt-5 position-relative">
                    {loading ? (
                        <SpinnerLoading loading={loading} />
                    ) : error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                        <>
                            {photos.length === 0 ? (
                                <p className="text-center">No photos available for this album.</p>
                            ) : (
                                <PhotosMap photos={photos} onDelete={onHandleDeletePhoto} />
                            )}
                            <div className="w-100 d-flex justify-content-center mt-3">
                                <Pagination
                                    currentPage={currentPage}
                                    pageSize={pageSize}
                                    totalItems={totalCount}
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
