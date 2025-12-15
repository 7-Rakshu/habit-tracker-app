import { useState } from "react";
import { Trash2, Edit, Check } from "lucide-react";

export default function TaskItem({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const saveEdit = () => {
    if (title.trim()) {
      onUpdate(task._id, title);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition">
      {isEditing ? (
        <input
          className="flex-grow px-2 py-1 border-b-2 border-blue-500 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <span className="text-gray-800">{task.title}</span>
      )}

      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={saveEdit}
            className="text-green-500 hover:text-green-600"
            title="Save"
          >
            <Check size={20} />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-600"
            title="Edit"
          >
            <Edit size={20} />
          </button>
        )}

        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500 hover:text-red-600"
          title="Delete"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
