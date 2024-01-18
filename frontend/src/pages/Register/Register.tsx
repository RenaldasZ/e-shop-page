import { useEffect, useState } from "react";
import agent from "../../api/agent";
import { User } from "../../models/userModel";

export default function Register() {
  const [users, setUsers] = useState<null | User>(null);

  useEffect(() => {
    agent.Users.getUsers()
      .then((response) => setUsers(response))
      .catch((error) => console.log(error));
  }, []);

  console.log(users);

  return <div>This is Register Page</div>;
}
