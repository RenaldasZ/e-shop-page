import { useEffect, useState } from "react";
import agent from "../../api/agent";

export default function Register() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    agent.Users.getUsers()
      .then((response) => setUsers(response))
      .catch((error) => console.log(error));
  }, []);

  console.log(users);

  return <div>This is Register Page</div>;
}
