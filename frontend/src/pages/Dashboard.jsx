import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import UserToolbar from "../components/UserToolbar";
import UserTable from "../components/UserTable";
import { fetchUsers } from "../services/userService";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const filteredUsers = useMemo(() => {
    if (!filterValue) return users;

    const lowerFilter = filterValue.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerFilter) ||
        user.email.toLowerCase().includes(lowerFilter)
    );
  }, [users, filterValue]);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
      setSelectedUserIds([]);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = filteredUsers.map((user) => user.id);
      setSelectedUserIds(allIds);
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleActionCompleted = () => {
    loadUsers();
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="p-3">
          <h1 className="text-primary fw-bold mb-0">THE APP</h1>
        </div>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="border rounded p-4 bg-white shadow-sm">
        <h2 className="mb-4">User Dashboard</h2>

        <UserToolbar
          selectedUserIds={selectedUserIds}
          onActionCompleted={handleActionCompleted}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
        />

        <UserTable
          users={filteredUsers}
          selectedUserIds={selectedUserIds}
          onSelectAll={handleSelectAll}
          onToggleSelect={handleToggleSelect}
        />
      </div>
    </div>
  );
};

export default Dashboard;
