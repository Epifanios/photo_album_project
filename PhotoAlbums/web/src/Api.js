import axios from 'axios';

// USERS //

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
        return response.data;
    } catch (error) {
        throw new Error('Network response was not ok');
    }
};


export const fetchUsersByID = async (userId, setUsername) => {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching user details');
    }
};



// ALBUMS //

// CREATE NEW ALBUM
export const createAlbum = async (userId, title, addAlbum, setSuccessMessage, setError, setTitle) => {
    //Validation
    if (!title) {
        setError('Title is required.');
        return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('title', title);

    try {
        const response = await axios.post('/api/albums', formData);
        //save new album to prop
        addAlbum(response.data);
        setSuccessMessage('Album created successfully!');

        //Clear form fields
        setError(null);
        setTitle(''); 
    } catch (err) {
        setError(err.response?.data || 'An error occurred while creating the album.');
    }  
}


// UPDATE ALBUM
export const updateAlbum = async (userId, albumId, title, onSave, setSuccessMessage, setError, setTitle) => {
    //Validation
    if (!title) {
        setError('Title is required.');
        return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('title', title);

    try {
        const response = await axios.put(`/api/albums/${albumId}`, formData);     
        onSave(response.data);
        setSuccessMessage('Album updated successfully!');

        //Clear form fields
        setError(null);
        setTitle(''); 
    } catch (err) {
        setError(err.response?.data || 'An error occurred while updating the album.');
    }  
}


// GET ALBUMS BY USER
export const fetchAlbumsByUser = async (userId, fetchAll = false, currentPage = 1, pageSize = 10) => {
    try {
        let albums = [];
        let totalCount = 0;
        let page = currentPage;
  
        if (fetchAll) {
            //Fetch Albums without pagination
            do {
                const response = await axios.get(`/api/albums/user/${userId}?page=${page}&pageSize=${pageSize}`);
                albums = albums.concat(response.data.albums);
                totalCount = response.data.totalCount;
                page += 1;
            } while (albums.length < totalCount);
        } else {
            //Fetch Albums with pagination
            const response = await axios.get(`/api/albums/user/${userId}?page=${currentPage}&pageSize=${pageSize}`);
            albums = response.data.albums;
            totalCount = response.data.totalCount;
        }
  
        return { albums, totalCount };
    } catch (error) {
        throw new Error('Error fetching albums');
    }
  };


// GET ALBUM DETAILS BY ID
export const fetchAlbumByID = async (albumId, setAlbumTitle) => {
    try {
        const response = await axios.get(`/api/albums/${albumId}`);
        setAlbumTitle(response.data.title);
    } catch (error) {
        throw new Error('Error fetching album details');
    }
};


// DELETE ALBUM
export const deleteAlbumById = async (albumId) => {
    try {
        await axios.delete(`/api/albums/${albumId}`);
    } catch (error) {
        throw new Error('Error deleting album');
    }
};




// PHOTOS //

// GET PHOTOS BY ALBUM
export const fetchPhotosByAlbum = async (albumId, currentPage, pageSize) => {
    try {
        const response = await axios.get(`/api/photos`, {
            params: {
                albumId: albumId,
                page: currentPage,
                pageSize: pageSize
            }
        });

        return {
            photos: response.data.photos,
            totalCount: response.data.totalCount
        };
    } catch (error) {
        console.error('Error fetching photos by album:', error);
        throw error;
    }
};


// DELETE PHOTO
export const deletePhotoById = async (photoId) => {
    try {
        await axios.delete(`/api/photos/${photoId}`);
    } catch (error) {
        throw new Error('Error deleting photo');
    }
};


// UPLOAD PHOTOS
export const uploadPhotos = async (albumId, file, title, addPhotos, setSuccessMessage, setError, setFile, setTitle, fileInputRef) => {
    //Validation
    if (!file || !title) {
        setError('Both file and title are required.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
        const response = await axios.post(`/api/photos/album/${albumId}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        //save new photo to prop
        addPhotos(response.data);
        setSuccessMessage('Photos uploaded successfully!');

        //Clear form fields
        setError(null);
        setFile(null);
        setTitle(''); 
        fileInputRef.current.value = ''; // Clear file input field using ref

    } catch (err) {
        if (err.response && err.response.data) {
            setError(`Error: ${err.response.data}`);
        } else {
            setError('An error occurred while uploading the photos.');
        }
    }
}
