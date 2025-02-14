import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Background from "../assets/footer.jpg";
import Footer from "../components/Footer";
import { FlowerContext } from "../context/FlowerContext";
import { AuthContext } from "../context/auth.context";

const HomePage = () => {
  const { flowers } = useContext(FlowerContext);
  const { filteredFlowers } = useContext(FlowerContext);
  const [randomFlowers, setRandomFlowers] = useState([]);
  const { user, logOutUser } = useContext(AuthContext);

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
    <div className="min-h-screen p-6 bg-white-100">
      {/* Heading with Media Query */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6">
        BEST SELLERS
      </h1>

      {/* Paragraph with Media Query */}
      <p className="text-center text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
        Limited offers, Get them before we sell out!!!
      </p>

      {/* Grid Layout with Media Query */}
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
              {/* Flower Name with Media Query */}
              <h3 className="text-center text-xl sm:text-2xl md:text-3xl font-bold font-[Rosarivo] mt-2">
                {flower.name}
              </h3>
              {/* Flower Price with Media Query */}
              <p className="text-center text-gray-600 font-semibold mt-1">
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

      {/* Footer Image Section with Media Query */}
      <div className="relative h-64 sm:h-80 lg:h-96 w-full mt-20">
        <img
          src={Background}
          alt="footer"
          className="h-full w-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center p-4">
          <p className="text-center text-sm sm:text-base md:text-lg max-w-2xl text-white leading-relaxed ml-7 mt-5">
            "With a gentle smile, they extended the flower, its petals soft and
            vibrant in the light. A quiet moment passed before the other person
            accepted it, fingers brushing lightly against the stem—a silent
            exchange of warmth and meaning."
          </p>
        </div>
      </div>

      {/* Newsletter Section with Media Query */}
      <div className="flex flex-wrap items-center justify-between bg-white p-6 rounded-lg shadow-md mt-10">
        <div className="max-w-md">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
            Get the Latest From FloralBouquet
          </h3>
          <h4 className="text-gray-600 mt-2 text-xs sm:text-sm md:text-base">
            Be the first to hear about new arrivals, promotions, style
            inspiration, and exclusive sneak peeks.
          </h4>
        </div>

        {/* Email Input with Media Query */}
        <div className="flex items-center bg-gray-200 px-3 py-2 rounded-md border border-gray-300 w-full sm:w-[300px] mt-4 sm:mt-0">
          <label
            htmlFor="email"
            className="text-gray-600 text-xs sm:text-sm font-semibold mr-2"
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="Write here..."
            name="email"
            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-xs sm:text-sm"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;