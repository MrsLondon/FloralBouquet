import axios from 'axios';
import { useEffect, useState } from 'react';

function Card() {
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
      
      {flowers.map(flower => {
        return (
          <div key={flower.id} className='flower'>
            <h3>{flower.name}</h3>
            <img src={flower.imageUrl} alt={flower.name} />
            <p>{flower.description}</p>
            <p>Price: {flower.price}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Card;