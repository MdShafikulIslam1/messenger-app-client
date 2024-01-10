import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const getSession = async () => {
  return await getServerSession(authOptions);
};

export default getSession;
