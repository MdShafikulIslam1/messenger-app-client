
import getAllUser from "../action/getAllUser";
import Sidebar from "../components/Sidebar";
import UserList from "../components/UserList";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  const users = await getAllUser();
  return (
    <Sidebar>
      <UserList users={users} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};
export default UserLayout;
