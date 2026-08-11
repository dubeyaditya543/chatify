import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: null,
  isLoggedIn: false,
  isLoading: false,

  login: () => {},
  signup: () => {},
  logout: () => {}
}))