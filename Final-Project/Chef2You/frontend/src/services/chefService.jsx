import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
});

// Function to add local photos to chefs
const mapChefPhotos = (chefs) => {
  return chefs.map(chef => ({
    ...chef,
    photos: [
      `/images/chefs/${chef.id}-photo1.jpg`,
      `/images/chefs/${chef.id}-photo2.jpg`,
      `/images/chefs/${chef.id}-photo3.jpg`,
    ],
  }));
};

// Function to fetch all chefs and add local photos
export const fetchChefs = () => {
  return api.get('/chefs')
    .then(response => {
    
      console.log('Response:', response); 
      console.log('Response Data:', response.data); 

      
      return mapChefPhotos(response.data);
    })
    .catch(error => {
      console.error('Error fetching chefs:', error);
      throw error;
    });
};

// Function to fetch a specific chef by ID and add local photos
export const fetchChefById = (id) => {
  return api.get(`/chef/${id}`)
    .then(response => ({
      ...response.data,
      photos: [
        `/images/chefs/${response.data.id}-photo1.jpg`,
        `/images/chefs/${response.data.id}-photo2.jpg`,
        `/images/chefs/${response.data.id}-photo3.jpg`,
      ],
    }))
    .catch(error => {
      console.error(`Error fetching chef with ID ${id}:`, error);
      throw error;
    });
};

// Function to fetch the top 3 rated chefs and add local photos
export const fetchTopRatedChefs = () => {
  return api.get('/chefs?limit=3&sort=rating') 
    .then(response => mapChefPhotos(response.data))
    .catch(error => {
      console.error('Error fetching top-rated chefs:', error);
      throw error;
    });
};





