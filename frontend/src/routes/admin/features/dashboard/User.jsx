import useUser from "../../../../hooks/useUser";

function User() {
  const { data } = useUser();
  return (
    <div>
      <h1 className="text-xl">
        Hello, <span className="font-bold text-xl">{data.name}</span>
      </h1>
    </div>
  );
}

export default User;
