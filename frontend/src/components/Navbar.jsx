// src/components/Navbar.js
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <nav className="w-full bg-white shadow-md p-4 flex items-center">
      <h1 className="font-bold text-xl text-blue-600">Habit Tracker</h1>
      <div className="ml-auto flex items-center gap-4">
        {/* Profile icon button */}
        <button
          onClick={() => navigate("/profile")}
          title="View Profile"
          className="text-blue-600 hover:text-blue-800"
        >
          <User size={28} />
        </button>

        {/* Logout button */}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
