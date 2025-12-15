import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const nav = useNavigate();

  const [data, setData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    dob: ""
  });

  const submit = async () => {
  try {
    console.log(data); // 🔥 check all fields before sending

    await api.post("/auth/register", data);
    alert("Account created!");
    nav("/");
  } catch (err) {
    console.error(err.response?.data);
    alert(err.response?.data?.message || "Registration failed");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

        <input
          className="border p-2 w-full mb-2 rounded"
          placeholder="Full Name"
          onChange={(e) => setData({ ...data, fullName: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-2 rounded"
          placeholder="Username"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-2 rounded"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          className="border p-2 w-full mb-2 rounded"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <input
          type="password"
          className="border p-2 w-full mb-2 rounded"
          placeholder="Confirm Password"
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
        />

        <input
          className="border p-2 w-full mb-2 rounded"
          placeholder="Phone"
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />

        <select
          className="border p-2 w-full mb-2 rounded"
          onChange={(e) => setData({ ...data, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          type="date"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setData({ ...data, dob: e.target.value })}
        />

        <button
          onClick={submit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
        >
          Register
        </button>

        <Link to="/" className="block text-center mt-3 text-blue-600">
          Already have an account?
        </Link>
      </div>
    </div>
  );
}
