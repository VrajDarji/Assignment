import { getProfile } from "@/app/api";

const currentUser = async () => {
  const rsp = await getProfile();
  if (!rsp) {
    return null;
  }
  return rsp;
};

export default currentUser;
