import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const teamMembers = [
    {
      name: "Sophia Mascardo",
      github: "https://github.com/mscrdsophia",
      linkedin: "https://www.linkedin.com/in/sophia-mascardo-1036542b4/",
    },
    {
      name: "Ayat",
      github: "https://github.com/MrsLondon",
      linkedin: "https://linkedin.com/in/sophia-mascardo-1036542b4/",
    },
  ];

  return (
    <footer className="bg-white text-gray-800 py-10 border-t border-gray-300 mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">FloralBouquet</h1>
          <p className="text-gray-600 mt-2 text-sm">
            This is a clone website. We do not own any of the images displayed on this platform.
          </p>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Meet the Team</h3>
          <div className="mt-2 space-y-2">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="font-medium text-gray-800">{member.name}</span>
                <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                  <FaGithub size={18} />
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                  <FaLinkedin size={18} />
                </a>
              </div>
            ))}
          </div>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Legal</h3>
          <ul className="mt-2 space-y-1 text-gray-600 text-sm">
            <li><a href="#" className="hover:text-gray-800">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-800">Terms of Service</a></li>
            <li><a href="#" className="hover:text-gray-800">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-300 pt-4">
        &copy; {new Date().getFullYear()} FloralBouquet. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
