import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import Navbar from "../components/Navbar";
import TaskItem from "../components/TaskItem";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

export default function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  const headers = { Authorization: `Bearer ${token}` };

  const loadData = async () => {
    try {
      const taskRes = await api.get("/tasks", { headers });
      setTasks(taskRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      const res = await api.post("/tasks", { title }, { headers });
      setTasks([...tasks, res.data]);
      setTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id, updatedTitle) => {
    try {
      const res = await api.put(`/tasks/${id}`, { title: updatedTitle }, { headers });
      setTasks(tasks.map(t => t._id === id ? res.data : t));
    } catch (err) {
      console.error(err);
    }
  };

  const delTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, { headers });
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-400 to-indigo-600">
      <Navbar>
        <button
          onClick={() => navigate('/profile')}
          className="ml-auto text-white"
          title="View Profile"
        >
          <User size={28} />
        </button>
      </Navbar>

      <div className="flex flex-col items-center p-10">
        <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">Habit Tracker</h1>

        {/* Add Task */}
        <div className="flex gap-2 w-full max-w-md mb-4">
          <input
            className="flex-grow px-4 py-3 rounded-l-xl border-2 border-white focus:outline-none focus:ring-2 focus:ring-white shadow-lg placeholder-gray-300"
            placeholder="Add New Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="bg-white text-blue-600 font-semibold px-6 rounded-r-xl hover:bg-gray-100 shadow-lg transition"
            onClick={addTask}
          >
            Add
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full max-w-md px-4 py-3 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-white border-2 border-white shadow-md placeholder-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Task List */}
        <div className="w-full max-w-md space-y-3">
          {filteredTasks.map((t) => (
            <TaskItem
              key={t._id}
              task={t}
              onDelete={delTask}
              onUpdate={updateTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
