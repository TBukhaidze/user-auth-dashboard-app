import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaLock, FaLockOpen, FaTrash } from "react-icons/fa";
import { blockUsers, unblockUsers, deleteUsers } from "../services/userService";
import { toast } from "react-toastify";

const UserToolbar = ({
  selectedUserIds,
  onActionCompleted,
  filterValue,
  onFilterChange,
}) => {
  const [loading, setLoading] = useState(false);

  const handleAction = async (action) => {
    if (selectedUserIds.length === 0) {
      toast.warning("Please select at least one user");
      return;
    }

    setLoading(true);

    try {
      if (action === "block") {
        await blockUsers(selectedUserIds);
        toast.success("Users blocked successfully");
      } else if (action === "unblock") {
        await unblockUsers(selectedUserIds);
        toast.success("Users unblocked successfully");
      } else if (action === "delete") {
        await deleteUsers(selectedUserIds);
        toast.success("Users deleted successfully");
      }

      onActionCompleted();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || selectedUserIds.length === 0;

  return (
    <div className="mb-3 d-flex flex-wrap align-items-center gap-2 justify-content-between">
      <div className="d-flex gap-2">
        <Button
          variant="outline-primary"
          onClick={() => handleAction("block")}
          disabled={disabled}
          className="d-flex align-items-center"
        >
          <FaLock className="me-1" /> Block
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => handleAction("unblock")}
          disabled={disabled}
          className="d-flex align-items-center"
        >
          <FaLockOpen className="me-1" /> Unblock
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => handleAction("delete")}
          disabled={disabled}
        >
          <FaTrash />
        </Button>
      </div>

      <div className="w-25" style={{ minWidth: "210px" }}>
        <InputGroup>
          <Form.Control
            type="search"
            placeholder="Filter by name or email..."
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
            aria-label="Search users"
          />
        </InputGroup>
      </div>
    </div>
  );
};

export default UserToolbar;
