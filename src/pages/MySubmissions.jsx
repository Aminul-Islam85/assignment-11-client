import { useEffect, useState } from "react";

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await fetch(`http://localhost:5000/api/tasks/submissions/worker/${user.email}`);
      const data = await res.json();
      setSubmissions(data);
    };

    fetchSubmissions();
  }, [user.email]);

  // Protect route for workers only
  if (user?.role !== "worker") {
    return <p className="text-center text-red-500 mt-10">Access Denied: Workers only.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Submissions</h2>
      <div className="overflow-x-auto">
        <table className="table w-full text-sm">
          <thead>
            <tr>
              <th>Task Title</th>
              <th>Proof</th>
              <th>Submitted At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr key={sub._id}>
                <td>{sub.task_title || "Untitled Task"}</td>
                <td>
                  <a href={sub.proof} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                    View Proof
                  </a>
                </td>
                <td>{new Date(sub.createdAt).toLocaleString()}</td>
                <td>
                  <span className={`badge ${
                    sub.status === "approved" ? "badge-success" :
                    sub.status === "rejected" ? "badge-error" :
                    "badge-warning"
                  }`}>
                    {sub.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySubmissions;
