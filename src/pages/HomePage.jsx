import '../style/homepage.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Homepage() {
  const [flowers, setFlowers] = useState([]);
  
  useEffect(() => {
    axios.get('https://flowerstore-api-json-server.onrender.com/flowers')
      .then(response => {
        setFlowers(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);
  
  return (
    <div className='homepage'>
      <h2>Flowers</h2>
      <p>"With a gentle smile, they extended the flower, its petals soft and vibrant in the light. A quiet moment passed before the other person accepted it, fingers brushing lightly against the stem—a silent exchange of warmth and meaning."</p>
      
      {flowers.map(flower => {
        return (
          <div key={flower.id} className='flower'>
            <h3>{flower.name}</h3>
            <img src={flower.imageUrl} alt={flower.name} />
            <p>{flower.description}</p>
            <p>Price: ${flower.price}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Homepage;