import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Background from "../assets/footer.jpg";
import Footer from "../components/Footer";
import { FlowerContext } from "../context/FlowerContext";

const HomePage = () => {
  
  const { flowers } = useContext(FlowerContext);
  const { filteredFlowers } = useContext(FlowerContext);
  const [ randomFlowers, setRandomFlowers ] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    
    
    const shuffledFlowers = shuffleArray([...flowers]);
    setRandomFlowers(shuffledFlowers);
  }, [flowers]);

  const results = filteredFlowers.length > 0 ? filteredFlowers : randomFlowers;
  const limitedResults = results.slice(0, 12);

  return (
    <div className="min-h-screen p-6 bg-white-100 ">
      <h1 className="text-3xl font-bold text-center mb-6"> BEST SELLERS</h1>
      <p className=" text-center text-lg text-gray-700 leading-relaxed mb-6">
        {" "}
        Limited offers, Get them before we sold out!!!
      </p>

      {limitedResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-items-center pt-10">
          {limitedResults.map((flower) => (
            <div key={flower.id}>
              <Link to={`/flower/${flower.id}`}>
                <img
                  src={flower.imageUrl}
                  alt={flower.name}
                 className="w-full max-w-xs h-auto object-contain rounded-lg shadow-md"
                />
              </Link>
              <h3 className=" text-center text-2xl font-bold font-[Rosarivo] mt-2">
                {flower.name}
              </h3>
              
              <p className=" text-center text-gray-600 font-semibold mt-1">
                From: €{flower.price}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          No gift flowers available.
        </p>
      )}
      <div className="relative h-96 w-full mt-20">
        <img
          src={Background}
          alt="footer"
          className="h-full w-full object-cover absolute inset-0 "
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center p-4">
          <p className="text-center text-lg max-w-2xl text-white leading-relaxed ml-7 mt-5">
            "With a gentle smile, they extended the flower, its petals soft and
            vibrant in the light. A quiet moment passed before the other person
            accepted it, fingers brushing lightly against the stem—a silent
            exchange of warmth and meaning."
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between bg-white p-6 rounded-lg shadow-md">
        <div className="max-w-md">
          <h3 className="text-xl font-semibold text-gray-800">
            Get the Latest From FloralBouquet
          </h3>
          <h4 className="text-gray-600 mt-2 text-sm">
            Be the first to hear about new arrivals, promotions, style
            inspiration, and exclusive sneak peeks.
          </h4>
        </div>

        <div className="flex items-center bg-gray-200 px-3 py-2 rounded-md border border-gray-300 w-[300px]">
          <label
            htmlFor="email"
            className="text-gray-600 text-sm font-semibold mr-2"
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="Write here..."
            name="email"
            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;