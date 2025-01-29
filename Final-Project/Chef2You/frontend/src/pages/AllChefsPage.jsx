import React, { useEffect, useState } from 'react';
import { fetchChefs } from '../services/chefService';
import ChefCard from '../components/ChefCard';
import Slider from 'react-slick'; 

// Carousel settings for the chefs
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function AllChefsPage() {
  const [chefs, setChefs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Adding a loading state
  const [error, setError] = useState(null); // Adding an error state

  useEffect(() => {
    const getAllChefs = async () => {
      try {
        const response = await fetchChefs(); 
        if (Array.isArray(response)) {
          setChefs(response); 
        } else {
          console.error('Error: chefs data is not an array.');
          setError('Failed to load chefs data.');
        }
      } catch (error) {
        console.error('Error fetching all chefs:', error);
        setError('Failed to fetch chefs data.');
      } finally {
        setIsLoading(false); // end of loading
      }
    };

    getAllChefs();
  }, []);

  if (isLoading) {
    return <div>Loading chefs...</div>; // Display loading message 
  }

  if (error) {
    return <div>{error}</div>; // Display an error message
  }

  return (
    <div>
      <h1>All Chefs</h1>
      {chefs.length > 0 ? (
        <Slider {...sliderSettings}>
          {chefs.map((chef) => (
            <div key={chef.id}>
              <ChefCard chef={chef} /> {/* Displaying cards with toggle details */}
            </div>
          ))}
        </Slider>
      ) : (
        <p>No chefs available.</p>
      )}
    </div>
  );
}

export default AllChefsPage;





