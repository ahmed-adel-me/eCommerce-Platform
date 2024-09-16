import CreateUser from "../features/users/CreateUser";
import UserTable from "../features/users/UserTable";

function Users() {
  return (
    <div className="space-y-10">
      <CreateUser />
      <UserTable />
    </div>
  );
}

export default Users;
