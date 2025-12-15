import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { token, logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/profile", { headers });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700">
      <Navbar />
      <div className="flex flex-col items-center justify-center p-10">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Profile</h1>
          <div className="mb-4">
            <p className="font-semibold">Full Name:</p>
            <p className="text-gray-600">{user.fullName}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Username:</p>
            <p className="text-gray-600">{user.username}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Email:</p>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Phone:</p>
            <p className="text-gray-600">{user.phone}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Gender:</p>
            <p className="text-gray-600">{user.gender}</p>
          </div>
          <div className="mb-6">
            <p className="font-semibold">Date of Birth:</p>
            <p className="text-gray-600">{user.dob}</p>
          </div>
          <button 
            onClick={logout} 
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold"
          >Logout</button>
        </div>
      </div>
    </div>
  );
}