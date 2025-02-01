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
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {flowers.map(flower => (
        <div key={flower.id} className="bg-white shadow-lg p-4 rounded-lg flex flex-col h-full">
          <img 
            src={flower.imageUrl} 
            alt={flower.name} 
            className="object-cover rounded-lg"
          />
          <h3 className="text-2xl font-bold font-[Rosarivo] mt-2">{flower.name}</h3>
          <p className="text-gray-700 mt-2 flex-grow">{flower.description}</p>
          <p className="text-gray-600 font-semibold mt-1">From: {flower.price}</p>
        </div>
      ))}
    </div>
  );
}  

export default Card;