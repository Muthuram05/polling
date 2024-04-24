import { create } from "zustand";

export const userStore = create((set, get) => ({
  user: null,
  currentPoll: null,
  setCurrentPoll: (id) => set((state) => ({ currentPoll: id })),
  setUser: (data) => set((state) => ({ user: data })),
  logout: () => set((state) => ({ user: null })),
}));
