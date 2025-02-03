import NavbarPage from './Navbar';
import SidebarPage from './Sidebar';

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar at the top */}
      <NavbarPage />

      {/* Layout with Sidebar and Hero Content */}
      <div className="flex pt-24">
        {/* Sidebar on the left */}
        <SidebarPage />

        {/* Main Hero Section */}
        <div className="flex-1 p-8 flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">
            Welcome to Your Health Hub
          </h1>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;