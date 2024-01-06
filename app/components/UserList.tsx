"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <aside className="fixed left-0 lg:left-20 w-full lg:w-80 inset-y-0 pb-20 lg:pb-0 block overflow-y-auto border-r border-gray-200">
      <div className="px-5">
        <div className="flex-col">
          <div className="text-2xl font-bold text-neutral-800 py-4">people</div>
        </div>

        {users.map((user) => (
          <UserBox key={user.id} user={user} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
