import { useEffect, useState } from "react";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

useEffect(() => {
  const fetchTasks = async () => {
    const res = await fetch(`http://localhost:5000/api/tasks/my?email=${user.email}`);
    const data = await res.json();
    setTasks(data);
  };

  
    fetchTasks();
  }, [user.email]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        alert("Task deleted successfully!");
        
      } else {
        alert(data.message || "Failed to delete task.");
      }
    } catch (err) {
      alert("Error deleting task.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
      <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full text-sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Workers</th>
              <th>Pay / Worker</th>
              <th>Total</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.task_title}</td>
                <td>{task.required_workers}</td>
                <td>{task.payable_amount}</td>
                <td>{task.total_payable}</td>
                <td>{task.completion_date}</td>
                <td>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTasks;
