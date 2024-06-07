import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import AlbumsMap from '../components/maps/AlbumsMap';
import CreateAlbumsForm from '../components/forms/CreateAlbumsForm';
import { fetchUsersByID, fetchAlbumsByUser, deleteAlbumById } from '../Api';
import SpinnerLoading from '../components/SpinnerLoading';
import Pagination from '../components/Pagination';
import { FormattedMessage } from 'react-intl';

function Albums() {
    const { userId } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [albums, setAlbums] = useState([]);
    const [userName, setUserName] = useState('');

    // Edit Form
    const [editingAlbum, setEditingAlbum] = useState({ title: '' });
    const [isEditing, setIsEditing] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 10;

    const fetchAlbums = useCallback(async (page = currentPage) => {
        setLoading(true);
        setError(null); // Reset the error state before making the API call
        try {
            const { albums: fetchedAlbums, totalCount: total } = await fetchAlbumsByUser(userId, false, page, pageSize);
            setAlbums(fetchedAlbums);
            setTotalCount(total);
        } catch (error) {
            setError('Error fetching albums');
        } finally {
            setLoading(false);
        }
    }, [userId, currentPage, pageSize]);

    useEffect(() => {
        fetchAlbums(currentPage);
        const fetchUserName = async () => {
            try {
                const user = await fetchUsersByID(userId);
                setUserName(user.name);
            } catch (error) {
                setError('Error fetching user name');
            }
        };
        fetchUserName();
    }, [userId, currentPage, fetchAlbums]);

    // Add new album to existing values on the state
    const addAlbum = (newAlbum) => {
        setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
        setTotalCount((prevCount) => prevCount + 1);
        const totalPages = Math.ceil((totalCount + 1) / pageSize);
        if (currentPage < totalPages) {
            setCurrentPage(totalPages);
        }
    };

    // Set edit states value for edit button
    const onHandleEdit = (album) => {
        setEditingAlbum(album);
        setIsEditing(true);
    };

    const onHandleSave = (album) => {
        if (isEditing) {
            setAlbums((prevAlbums) => prevAlbums.map((u) => (u.id === album.id ? album : u)));
        } else {
            addAlbum(album);
        }
        setEditingAlbum({ title: '' });
        setIsEditing(false);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const onHandleDeleteAlbum = async (albumId) => {
        try {
            await deleteAlbumById(albumId);
            const updatedAlbums = albums.filter((album) => album.id !== albumId);
            setAlbums(updatedAlbums);
            setTotalCount((prevCount) => prevCount - 1);

            if (updatedAlbums.length === 0 && currentPage > 1) {
                setCurrentPage((prevPage) => prevPage - 1);
            } else {
                fetchAlbums(currentPage);
            }
        } catch (err) {
            setError('An error occurred while deleting the album.');
        }
    };

    return (
        <div className="container text-center">
            <div className="row mt-4">
                <h2 className="pb-5 mb-5"><FormattedMessage id="AlbumsOf"/> {userName}</h2>

                <div className="col-lg-3 text-start">
                    <div className="back_link pb-5">
                        <a href={`/`}>
                            <i className="bi bi-chevron-left pr-4"><FormattedMessage id="BackToUsers"/></i>
                        </a>
                    </div>
                    <h5 className="mb-3 text-start">{isEditing ? <FormattedMessage id="Edit"/> : <FormattedMessage id="AddNewAlbum"/>}</h5>
                    <CreateAlbumsForm userId={userId} addAlbum={addAlbum} onSave={onHandleSave} album={editingAlbum} isEditing={isEditing}/>                                     
                </div>
                <div className="col-lg-9 mt-lg-0 mt-5">
                    {loading ? (
                        <SpinnerLoading loading={loading}/>
                    ) : error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                        <>
                            {albums.length === 0 ? (
                                <p className="text-center"><FormattedMessage id="NoAlbums"/></p>
                            ) : (
                                <AlbumsMap albums={albums} userId={userId} onDelete={onHandleDeleteAlbum} onEdit={onHandleEdit}/>
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

export default Albums;
