import SidebarOwner from "../../components/SidebarOwner";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarOwner />
        {/* header */}
        

      {/* Content */}
      <main className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-2">Dashboard Owner</h1>
          <p className="text-gray-600">
            Welcome To Dashboard
          </p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
