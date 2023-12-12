import { FaHome, FaUsers, FaEnvelope, FaEllipsisH } from "react-icons/fa";

const BottomNavbar = () => {
  return (
    <div className="fixed md:hidden bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4 flex justify-around items-center">
      <FaHome size={24} className="text-gray-600" />
      <FaUsers size={24} className="text-gray-600" />
      <FaEnvelope size={24} className="text-gray-600" />
      <FaEllipsisH size={24} className="text-gray-600" />
    </div>
  );
};

export default BottomNavbar;
