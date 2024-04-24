import { create } from "zustand";

export const userStore = create((set, get) => ({
  user: null,
  setUser: (data) => set((state) => ({ user: data })),
  logout: () => set((state) => ({ user: null })),
}));
