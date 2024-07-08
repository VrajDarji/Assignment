import { create } from "zustand";
import { User, Blog } from "@/utils/types";
interface userProps {
  email: string;
  setEmail: (email: string) => void;
}

interface ModalData {
  user?: User;
  blog?: Blog;
}

interface ModalProps {
  data?: ModalData;
  open: string;
  setOpen: (type: string, data?: ModalData) => void;
}

export const useEmail = create<userProps>((set) => ({
  email: "",
  setEmail: (email: string) => {
    console.log(email);
    set({ email });
  },
}));

export const useModal = create<ModalProps>((set) => ({
  open: "",
  setOpen: (type: string, data?: ModalData) => set({ open: type, data }),
}));
