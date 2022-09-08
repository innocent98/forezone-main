import { useEffect, useState } from "react";
import { axiosInstance } from "../config";

export default function Bootcamp() {
  //fetch all users
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axiosInstance.get("/user/get/boot-camp");
      setUsers(res.data);
    };
    fetchUsers();
  }, [setUsers]);
  return (
    <div>
      {users.map((u) => (
        <div key={u._id}>
          <span>{u.email}</span>
        </div>
      ))}
    </div>
  );
}
