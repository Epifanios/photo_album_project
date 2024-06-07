import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import AlbumsMap from '../components/maps/AlbumsMap';
import CreateAlbumsForm from '../components/forms/CreateAlbumsForm';
import { fetchUsersByID, fetchAlbumsByUser, deleteAlbumById } from '../Api';
import SpinnerLoading from '../components/SpinnerLoading';
import Pagination from '../components/Pagination';

function Albums() {
    const { userId } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [albums, setAlbums] = useState([]);
    const [userName, setUserName] = useState('');

    //Edit Form
    const [editingAlbum, setEditingAlbum] = useState({ title: '' });
    const [isEditing, setIsEditing] = useState(false);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 10;


    const fetchAlbums = useCallback(async (page = currentPage) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Introduce a 2-second delay for spinner
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
        fetchAlbums();
        // Fetch the user's name
        fetchUsersByID(userId, setUserName);
    }, [userId, currentPage, fetchAlbums]);


    //Add new album to existing values on the state
    const addAlbum = (newAlbum) => {
        const totalPages = Math.ceil((totalCount + 1) / pageSize);
        if (currentPage < totalPages) {
            setCurrentPage(totalPages);
        }
        setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
        setTotalCount((prevCount) => prevCount + 1); // Increase total count by 1
    };


    //Set edit states value for edit button
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

            // Check if we need to fetch the previous page
            if (updatedAlbums.length === 0 && currentPage > 1) {
                setCurrentPage((prevPage) => prevPage - 1);
            } else {
              fetchAlbums();
          }
      } catch (err) {
          setError('An error occurred while deleting the album.');
      }
    };
  

    return (
        <div className="container text-center">
            <div className="row mt-4">
                <h2 className="pb-5 mb-5">Albums of {userName}</h2>

                <div className="col-lg-3 text-start">
                    <div className="back_link pb-5">
                        <a href={`/`}>
                            <i className="bi bi-chevron-left pr-4">Back to Users</i>
                        </a>
                    </div>
                    <h5 className="mb-3 text-start">{isEditing ? 'Edit' : 'Add New'} Album</h5>
                    <CreateAlbumsForm userId={userId}  addAlbum={addAlbum} onSave={onHandleSave} album={editingAlbum} isEditing={isEditing}/>                                     
                </div>
                <div className="col-lg-9 mt-lg-0 mt-5">
                    {loading ? (
                        <SpinnerLoading loading={loading}/>
                    ) : error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                        <>
                        {albums.length === 0 ? (
                            <p className="text-center">No albums available for this user.</p>
                        ) : (
                            <AlbumsMap albums={albums} userId={userId} onDelete={onHandleDeleteAlbum} onEdit={onHandleEdit}/>
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

export default Albums;
