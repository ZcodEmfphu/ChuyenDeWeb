import React, { useState, useEffect } from "react";
import { User } from "../../type";
import UsersTable from "@/components/ui/userTable";


const Users: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [users, setUsers] = useState<User[]>([]); // Sử dụng kiểu dữ liệu User[]

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/my/user/getAllUser`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();

      const usersData: User[] = data.map((item: any) => ({
        _id: item._id,
        email: item.email,
        name: item.name,
        role: item.role,
        city: item.city,
      }));
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="main-container">
      <UsersTable users={users} />
    </main>
  );
};

export default Users;