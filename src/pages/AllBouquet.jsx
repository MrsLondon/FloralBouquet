import Card from "../components/Card.jsx";
import Navbar from "../components/Navbar"; // Import Navbar

function AllBouquet() {
  return (
    <div className="min-h-screen bg-white-100">
      {/* Navbar positioned at the top */}
      <Navbar />

      {/* Full-width background image section */}
      <div
        className="w-full h-[50vh] bg-cover bg-center mt-24" // Increased mt-16 to mt-24 (6rem)
        style={{
          backgroundImage: `url('https://res.cloudinary.com/duu9km8ss/image/upload/v1739563828/bouq_v7nkc3.jpg')`,
        }}
      >
        {/* Optional: Add text or content here without the overlay */}
      </div>

      {/* Main Content */}
      <div className="p-6 mt-8"> {/* Added mt-8 for spacing */}
        <Card />
      </div>
    </div>
  );
}

export default AllBouquet;