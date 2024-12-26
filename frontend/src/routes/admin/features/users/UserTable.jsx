import { ClipLoader } from "react-spinners";
import Table from "../../UI/Table";
import useAdmins from "./useAdmins";

function UserTable() {
  const { users, isLoading, isSuccess } = useAdmins();
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5">Admin Users</h2>
      <Table columns={"grid-cols-3"}>
        <Table.Header>
          <h4 className="uppercase text-gray-600 font-bold">Name</h4>
          <h4 className="uppercase text-gray-600 font-bold">email</h4>
          <h4 className="uppercase text-gray-600 font-bold"></h4>
        </Table.Header>
        <Table.Body>
          {isLoading && (
            <div className="flex justify-center">
              <ClipLoader />
            </div>
          )}
          {isSuccess &&
            (users.length > 0 ? (
              users.map((user) => (
                <Table.Row key={user._id}>
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-lg">{user.email}</p>
                </Table.Row>
              ))
            ) : (
              <p>There are no admins</p>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default UserTable;
