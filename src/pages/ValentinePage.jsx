import { Link } from "react-router-dom";
import { useContext } from "react";
import { FlowerContext } from "../context/FlowerContext";
import Navbar from "../components/Navbar"; // Import Navbar

const ValentinePage = () => {
  const { flowers } = useContext(FlowerContext);

  const giftFlowers = flowers.filter((flower) =>
    flower.category.includes("valentine")
  );

  return (
    <div className="min-h-screen bg-white-100">
      {/* Navbar */}
      <Navbar />

      {/* Full-width background image section */}
      <div
        className="w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-cover bg-center -mt-16" // Responsive height and negative margin
        style={{
          backgroundImage: `url('https://res.cloudinary.com/duu9km8ss/image/upload/v1739559536/valentine1_zharvb.webp')`,
        }}
      ></div>

      {/* Rest of the content */}
      <div className="p-6">
        {/* Improved Links Section */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-8">
          <Link
            to="/lilies?context=valentine"
            className="bg-white text-orange-600 font-semibold py-2 px-4 sm:px-6 rounded-full shadow-lg hover:bg-orange-600 hover:text-white transition-all duration-300 text-sm sm:text-base"
          >
            Lilies
          </Link>
          <Link
            to="/roses?context=valentine"
            className="bg-white text-orange-600 font-semibold py-2 px-4 sm:px-6 rounded-full shadow-lg hover:bg-orange-600 hover:text-white transition-all duration-300 text-sm sm:text-base"
          >
            Roses
          </Link>
          <Link
            to="/tulips?context=valentine"
            className="bg-white text-orange-600 font-semibold py-2 px-4 sm:px-6 rounded-full shadow-lg hover:bg-orange-600 hover:text-white transition-all duration-300 text-sm sm:text-base"
          >
            Tulips
          </Link>
        </div>

        {/* Flower Grid */}
        {giftFlowers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 justify-items-center">
            {giftFlowers.map((flower) => (
              <div
                key={flower.id}
                className="flex flex-col items-center text-center p-4 sm:p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-sm"
              >
                <Link to={`/flower/${flower.id}`} className="w-full">
                  <img
                    src={flower.imageUrl}
                    alt={flower.name}
                    className="w-full h-40 sm:h-48 object-contain rounded-lg" // Responsive image height
                  />
                </Link>
                <h3 className="text-xl sm:text-2xl font-bold font-[Rosarivo] mt-4">
                  {flower.name}
                </h3>
                <p className="text-gray-700 mt-2 flex-grow text-sm sm:text-base">
                  {flower.description}
                </p>
                <p className="text-orange-600 font-semibold mt-4 text-sm sm:text-base">
                  From: €{flower.price}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No Valentine's flowers available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ValentinePage;