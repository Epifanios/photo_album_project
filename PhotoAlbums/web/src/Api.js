import axios from 'axios';


export const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
};


export const fetchUsersByID = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};


export const fetchAlbums = async () => {
  const response = await fetch('/api/albums');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export const fetchAlbumsByUser = async (userId, setAlbums, setLoading) => {
  try {
      setLoading(true);
      const response = await axios.get(`/api/albums/user/${userId}`);
      setAlbums(response.data);
      setLoading(false);
  } catch (error) {
      setLoading(false);
      throw new Error('Error fetching albums');
  }
};


export const fetchAlbumByID = async (albumId, setAlbumTitle) => {
  try {
      const response = await axios.get(`/api/albums/${albumId}`);
      setAlbumTitle(response.data.title);
  } catch (error) {
      throw new Error('Error fetching album details');
  }
};




// PHOTOS //

// GET PHOTOS BY ALBUM
export const fetchPhotosByAlbum = async (albumId, setPhotos, setTotalCount, setpage = 1, pageSize = 10) => {
    try {
        const response = await axios.get(`/api/photos?albumId=${albumId}&page=${setpage}&pageSize=${pageSize}`);
        setPhotos(response.data.photos || []);        
        setTotalCount(response.data.totalCount);
    } catch (error) {
          throw new Error('Error fetching photos');
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
