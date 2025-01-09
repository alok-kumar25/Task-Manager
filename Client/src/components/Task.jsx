import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function Task() {
  const [showForm, setShowForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [status, setStatus] = useState('pending');
  const [tasks, setTasks] = useState([]); 
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    axios
      .get('http://localhost:5000/api/task', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (Array.isArray(response.data.tasks)) {
          setTasks(response.data.tasks);
        } else {
          toast.error('Failed to fetch tasks');
        }
      })
      .catch((error) => {
        toast.error('Failed to fetch tasks');
      });
  }, []);

  const handleTaskAdd = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle || !taskDescription || !dueDate) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const token = localStorage.getItem('authToken');
    const taskData = {
      title: taskTitle,
      description: taskDescription,
      dueDate: dueDate,
      priority: priority,
      status: status,
    };

    if (editingTaskId) {
      // Updating an existing task
      axios
        .put(`http://localhost:5000/api/task/${editingTaskId}`, taskData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          toast.success('Task updated successfully!');
          // Update the task in the state using the updated task data from the backend
          setTasks(tasks.map((task) =>
            task._id === editingTaskId ? response.data.task : task
          ));
          setShowForm(false);
          resetForm();
        })
        .catch((error) => {
          toast.error('Failed to update task');
        });
    } else {
      // Adding a new task
      axios
        .post('http://localhost:5000/api/task/add', taskData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          toast.success('Task added successfully!');
          // Add the newly created task to the state using the returned task from the backend
          setTasks([...tasks, response.data.task]);
          setShowForm(false);
          resetForm();
        })
        .catch((error) => {
          toast.error('Failed to add task');
        });
    }
  };

  const handleDelete = (taskId) => {
    const token = localStorage.getItem('authToken');
    axios
      .delete(`http://localhost:5000/api/task/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success('Task deleted successfully!');
        setTasks(tasks.filter((task) => task._id !== taskId));
      })
      .catch((error) => {
        toast.error('Failed to delete task');
      });
  };

  const handleUpdate = (task) => {
    setEditingTaskId(task._id);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setStatus(task.status);
    setShowForm(true);
  };

  const resetForm = () => {
    setTaskTitle('');
    setTaskDescription('');
    setDueDate('');
    setPriority('low');
    setStatus('pending');
    setEditingTaskId(null);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center">
      <div className="bg-white w-full h-[12vh] flex justify-center">
        <div
          onClick={handleTaskAdd}
          className="bg-gray-400 h-full w-full flex items-center justify-center border-gray-700 border-[5px] font-semibold text-4xl cursor-pointer"
        >
          Add Task
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="p-8 bg-white rounded-lg shadow-xl overflow-auto max-h-[70vh] w-96 max-w-md">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
              {editingTaskId ? 'Update Task' : 'Add New Task'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  &times; Close
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Task Title</label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Task Description</label>
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task description"
                  rows="4"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {editingTaskId ? 'Update Task' : 'Save Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
            <p className="text-gray-600 mt-2">{task.description}</p>
            <p className="text-gray-500 mt-2">Due: {task.dueDate}</p>
            <p className="text-gray-500 mt-2">Priority: {task.priority}</p>
            <p className="text-gray-500 mt-2">Status: {task.status}</p>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleUpdate(task)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}
