import { FaAngleDown } from "react-icons/fa";

const UserTable = ({ users, selectedUserIds, onSelectAll, onToggleSelect }) => {
  return (
    <div className="table-responsive">
      <div style={{ minWidth: "768px" }}>
        <div className="row g-0 border-bottom fw-bold py-2 flex-nowrap">
          <div className="col-1 d-flex align-items-center">
            <input
              type="checkbox"
              onChange={onSelectAll}
              checked={
                users.length > 0 && selectedUserIds.length === users.length
              }
            />
          </div>
          <div className="col-3 d-flex align-items-center">Name</div>
          <div className="col-4 d-flex align-items-center">
            Email <FaAngleDown className="ms-1" />
          </div>
          <div className="col-2 d-flex align-items-center">Last Login</div>
          <div className="col-2 d-flex align-items-center">Status</div>
        </div>

        <div className="overflow-hidden">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="row g-0 border-bottom py-2 flex-nowrap"
              >
                <div className="col-1 d-flex align-items-center">
                  <input
                    type="checkbox"
                    checked={selectedUserIds.includes(user.id)}
                    onChange={() => onToggleSelect(user.id)}
                  />
                </div>
                <div className="col-3 d-flex align-items-center">
                  {user.name}
                </div>
                <div className="col-4 d-flex align-items-center">
                  {user.email}
                </div>
                <div className="col-2 d-flex align-items-center">
                  {new Date(user.last_login).toLocaleString()}
                </div>
                <div className="col-2 d-flex align-items-center">
                  {user.status}
                </div>
              </div>
            ))
          ) : (
            <div className="row g-0">
              <div className="col-12 text-center text-muted py-4">
                No users found
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTable;
