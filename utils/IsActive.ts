/* eslint-disable react-hooks/rules-of-hooks */
import useActiveList from "@/app/hooks/useActiveList";
const isActive = (email: string) => {
  const { members } = useActiveList();

  return members.indexOf(email) !== -1;
};

export default isActive;
