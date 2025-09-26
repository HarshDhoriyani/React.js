import { useState, useEffect } from "react";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("low");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: input, completed: false, priority },
    ]);
    setInput("");
    setPriority("low");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  // ✅ Edit Task
  const startEditing = (task) => {
    setEditId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    if (editText.trim() === "") return;
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editText } : task
      )
    );
    setEditId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  // ✅ Filter logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 ${
        darkMode
          ? "bg-gradient-to-r from-gray-900 to-gray-700"
          : "bg-gradient-to-r from-blue-400 to-indigo-500"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-2xl shadow-2xl p-6 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1
            className={`text-3xl font-extrabold ${
              darkMode ? "text-indigo-300" : "text-indigo-600"
            }`}
          >
            ✨ My To-Do List
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded-xl bg-gray-200 dark:bg-gray-700 text-sm hover:opacity-80 transition"
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Input Section */}
        <div className="flex mb-6 space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className={`flex-1 px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 focus:ring-indigo-500"
                : "border-gray-300 focus:ring-indigo-400"
            }`}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={`px-2 py-2 rounded-xl text-sm ${
              darkMode
                ? "bg-gray-700 border border-gray-600"
                : "bg-gray-100 border"
            }`}
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
          <button
            onClick={addTask}
            className="bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600 transition"
          >
            Add
          </button>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-4 text-sm">
          <div className="space-x-2">
            <button
              className={`px-2 py-1 rounded ${
                filter === "all"
                  ? darkMode
                    ? "bg-indigo-700 text-white"
                    : "bg-indigo-100 text-indigo-600"
                  : ""
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-2 py-1 rounded ${
                filter === "active"
                  ? darkMode
                    ? "bg-indigo-700 text-white"
                    : "bg-indigo-100 text-indigo-600"
                  : ""
              }`}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={`px-2 py-1 rounded ${
                filter === "completed"
                  ? darkMode
                    ? "bg-indigo-700 text-white"
                    : "bg-indigo-100 text-indigo-600"
                  : ""
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
          <span>{tasks.filter((t) => !t.completed).length} left</span>
        </div>

        {/* Task List */}
        <ul className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between px-4 py-2 rounded-xl shadow-sm transition ${
                darkMode ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              {editId === task.id ? (
                // Editing mode
                <div className="flex-1 flex items-center space-x-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className={`flex-1 px-2 py-1 rounded border ${
                      darkMode
                        ? "bg-gray-600 border-gray-500 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  />
                  <button
                    onClick={() => saveEdit(task.id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    ✔
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✖
                  </button>
                </div>
              ) : (
                // Normal mode
                <>
                  <span
                    onClick={() => toggleTask(task.id)}
                    className={`flex-1 cursor-pointer ${
                      task.completed
                        ? "line-through text-gray-400"
                        : darkMode
                        ? "text-gray-100"
                        : "text-gray-700"
                    }`}
                  >
                    {task.text}{" "}
                    <span
                      className={`text-xs ml-2 px-2 py-0.5 rounded-full ${
                        task.priority === "high"
                          ? "bg-red-500 text-white"
                          : task.priority === "medium"
                          ? "bg-yellow-400 text-black"
                          : "bg-green-400 text-black"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </span>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => startEditing(task)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ✏
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✖
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Clear Completed */}
        {tasks.some((t) => t.completed) && (
          <button
            onClick={clearCompleted}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
          >
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
}
