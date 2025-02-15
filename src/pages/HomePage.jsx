import { useState, useEffect, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import Background from "../assets/footer.jpg";
import Footer from "../components/Footer";
import { FlowerContext } from "../context/FlowerContext";
import { AuthContext } from "../context/auth.context";
import Navbar from "../components/Navbar.jsx";

const HomePage = () => {
  const { flowers, filteredFlowers } = useContext(FlowerContext);
  const [randomFlowers, setRandomFlowers] = useState([]);
  const { user } = useContext(AuthContext);

  const shuffleArray = useMemo(() => (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }, []);

  useEffect(() => {
    if (flowers.length > 0) {
      const shuffledFlowers = shuffleArray([...flowers]);
      setRandomFlowers(shuffledFlowers);
    }
  }, [flowers, shuffleArray]);

  const results = filteredFlowers.length > 0 ? filteredFlowers : randomFlowers;
  const limitedResults = results.slice(0, 12);

  return (
    <div className="min-h-screen bg-white-100">
      {/* Background Image Section */}
      <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-cover bg-center relative"
  style={{
    backgroundImage: `url('https://res.cloudinary.com/duu9km8ss/image/upload/v1739603796/tender-ranunculus-flowers-trendy-ceramic-260nw-2107689617_bnvena.jpg')`,
  }}
  role="img"
  aria-label="Tender ranunculus flowers background"
>
  {/* Navbar positioned even closer to the top */}
  <div className="absolute inset-x-0 top-[8%] transform -translate-y-1/2 z-50">
    <Navbar />
  </div>
</div>




      {/* Add space between background image and content */}
      <div className="mt-12"></div>

      {/* Main Content */}
      <div className="p-6">
        {/* Grid Layout with Media Query */}
        {limitedResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4 justify-items-center">
            {limitedResults.map((flower) => (
              <div
                key={flower.id}
                className="w-full max-w-xs bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
              >
                <Link to={`/flower/${flower.id}`}>
                  <img
                    src={flower.imageUrl}
                    alt={flower.name}
                    className="w-full h-64 object-contain"
                    loading="lazy"
                  />
                </Link>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {flower.name}
                  </h3>
                  <p className="text-lg font-semibold text-green-600">
                    From: €{flower.price}
                  </p>
                </div>
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
            alt="Flower background"
            className="h-full w-full object-cover absolute inset-0"
            loading="lazy"
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
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;