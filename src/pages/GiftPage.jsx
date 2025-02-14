import { useContext } from "react";
import { FlowerContext } from "../context/FlowerContext"; // Make sure the path is correct
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar

const GiftPage = () => {
  const { flowers } = useContext(FlowerContext);

  // Filter flowers for gifts
  const giftFlowers = flowers.filter((flower) =>
    flower.category.includes("gift")
  );

  return (
    <div className="min-h-screen bg-white-100">
      {/* Navbar positioned at the top */}
      <Navbar />

      {/* Full-width background image section */}
      <div
        className="w-full h-[50vh] bg-cover bg-center mt-20 relative" // Added mt-20 for spacing
        style={{
          backgroundImage: `url('https://res.cloudinary.com/duu9km8ss/image/upload/v1739563834/happy_birthday_agojdo.jpg')`,
        }}
      >
        {/* Dark overlay covering only the background image */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Links Section positioned below the background image */}
      <div className="flex justify-center gap-4 sm:gap-6 py-6 bg-white shadow-sm">
        <Link
          to="/daisy?context=gift"
          className="bg-white text-orange-600 font-semibold py-2 px-4 sm:px-6 rounded-full shadow-lg hover:bg-orange-600 hover:text-white transition-all duration-300 text-sm sm:text-base"
        >
          Daisy
        </Link>
        <Link
          to="/lavender?context=gift"
          className="bg-white text-orange-600 font-semibold py-2 px-4 sm:px-6 rounded-full shadow-lg hover:bg-orange-600 hover:text-white transition-all duration-300 text-sm sm:text-base"
        >
          Lavender
        </Link>
        <Link
          to="/sunflower?context=gift"
          className="bg-white text-orange-600 font-semibold py-2 px-4 sm:px-6 rounded-full shadow-lg hover:bg-orange-600 hover:text-white transition-all duration-300 text-sm sm:text-base"
        >
          Sunflower
        </Link>
      </div>

      {/* Rest of the content */}
      <div className="p-6 mt-8"> {/* Added mt-8 for spacing */}
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
            No gift flowers available.
          </p>
        )}
      </div>
    </div>
  );
};

export default GiftPage;