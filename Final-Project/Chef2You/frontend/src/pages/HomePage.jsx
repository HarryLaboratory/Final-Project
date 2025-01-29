import React, { useEffect, useState } from 'react';
import { fetchChefs } from '../services/chefService'; 
import ChefCard from '../components/ChefCard'; 
import '../styles/HomePage.css';

function HomePage() {
  const [chefs, setChefs] = useState([]);
  const [error, setError] = useState(null);  // State to handle errors
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const getChefs = async () => {
      setLoading(true); 
      try {
        const response = await fetchChefs(); 
        console.log('Response from API (chefs):', response); // Log the full response to inspect the structure

        // Check the structure of the response (simpler, we check if response is an array)
        if (Array.isArray(response)) {
          const randomChefs = response
            .sort(() => 0.5 - Math.random()) // Shuffle the order
            .slice(0, 3); // Take the first 3 after shuffling

          setChefs(randomChefs);
        } else {
          console.error("Response is not in the expected format (array):", response);
          setError("Unable to fetch chefs. Please try again later.");
        }
      } catch (error) {
        console.error('Error fetching chefs:', error);
        setError("Error fetching chefs.");
      } finally {
        setLoading(false); // End loading
      }
    };

    getChefs();
  }, []);

  return (
    <div>
      <h1>Welcome to Chef2You</h1>
      <p>Find the best personal chefs with top ratings!</p>

      <h2>Featured Chefs</h2>

      {loading && <p>Loading chefs...</p>}  {/* Show the loading message */}

      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display the error if it exists */}

      <div className="top-chefs">
        {Array.isArray(chefs) && chefs.length > 0 ? (
          chefs.map((chef) => (
            <ChefCard chef={chef} key={chef.id} />
          ))
        ) : (
          !loading && <p>No chefs found.</p>  // Message if no chefs are found and loading is finished
        )}
      </div>
    </div>
  );
}

export default HomePage;






