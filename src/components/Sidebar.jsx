import { useState, useEffect } from "react";
import { LogOut, User, FileText, Users, UserCheck } from "lucide-react";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlSidebar = () => {
    if (window.scrollY > lastScrollY) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlSidebar);
    return () => {
      window.removeEventListener("scroll", controlSidebar);
    };
  }, [lastScrollY]);

  return (
    <aside
      className={`fixed top-4 left-4 w-64 rounded-2xl bg-white bg-opacity-50 shadow-lg backdrop-blur-md transition-transform duration-300 z-50 ${
        showSidebar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex flex-col justify-center h-8 p-6">
        <SidebarButton icon={<User className="w-5 h-5" />} label="Edit Profile" />
        <SidebarButton icon={<FileText className="w-5 h-5" />} label="My Prescription" />
        <SidebarButton icon={<UserCheck className="w-5 h-5" />} label="My Doctors" />
        <SidebarButton icon={<Users className="w-5 h-5" />} label="Family Members" />
        <SidebarButton icon={<LogOut className="w-5 h-5" />} label="Logout" />
      </div>
    </aside>
  );
};

const SidebarButton = ({ icon, label }) => (
  <button className="flex items-center space-x-3 px-4 py-3 font-medium text-gray-800 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition focus:outline-none">
    {icon}
    <span>{label}</span>
  </button>
);

const SidebarPage = () => {
  return (
    <div className="h-2 bg-gray-100 flex">
      <Sidebar />
    </div>
  );
};

export default SidebarPage;
