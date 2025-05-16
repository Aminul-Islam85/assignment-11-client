import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-base-200 overflow-x-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md p-4 space-y-4">
        <h2 className="text-xl font-bold text-primary mb-6">Dashboard</h2>
        <ul className="space-y-2">
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/">Back to Home</Link></li>

          {/* Worker Links */}
          {user?.role === "worker" && (
            <>
              <li><Link to="/dashboard/available-tasks">Available Tasks</Link></li>
              <li><Link to="/dashboard/my-submissions">My Submissions</Link></li>
              <li><Link to="/dashboard/withdraw">Withdraw</Link></li>
            </>
          )}

          {/* Buyer Links */}
          {user?.role === "buyer" && (
            <>
              <li><Link to="/dashboard/add-task">Add Task</Link></li>
              <li><Link to="/dashboard/my-tasks">My Tasks</Link></li>
              <li><Link to="/dashboard/purchase-coins">Purchase Coins</Link></li>

            </>
          )}

          {/* Admin Links */}
          {user?.role === "admin" && (
            <>
              <li><Link to="/dashboard/manage-users">Manage Users</Link></li>
              <li><Link to="/dashboard/manage-tasks">Manage Tasks</Link></li>
              <li><Link to="/dashboard/withdraw-requests">Withdraw Requests</Link></li>
            </>
          )}
        </ul>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full overflow-x-hidden">
        {/* Header */}
        <header className="bg-white shadow px-4 py-2 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Dashboard</h1>

          {user && (
            <div className="flex items-center gap-4">
              <div className="text-right text-sm">
                <div className="font-bold">{user.name}</div>
                <div className="text-xs capitalize text-gray-500">{user.role}</div>
                <div className="text-xs text-success">{user.coins} coins</div>
              </div>
              <img
                src={
                    user.profilePic ||
                    "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(user.name || "User") +
                        "&background=0D8ABC&color=fff"
                }
                alt="User"
                className="w-10 h-10 rounded-full object-cover border border-primary"
                />

            </div>
          )}
        </header>

        {/* Content */}
        <main className="p-4 flex-1">
          <Outlet /> {/* Nested routes render here */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
