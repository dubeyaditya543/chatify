import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isImageUploading: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error("Something went wrong with check auth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Something went wrong with signup method", error);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({isLoggingIn: true})
    try{
      const res = await axiosInstance.post("/auth/login", data)
      set({authUser: res.data})
      toast.success("Logged in successfully")
    }catch (error){
      toast.error(error.response.data.message)
      console.error("Something went wrong with login method", error)
    }finally{
      set({isLoggingIn: false})
    }
  },
  logout: async () => {
    try{
      await axiosInstance.post("/auth/logout")
      set({authUser: null})
      toast.success("Logged out successfully")
    }catch(error){
      toast.error(error.response.data.message)
      console.error("Something went wrong with logout method", error)
    }
  },
  updateProfile: async (data) => {
    set({isImageUploading: true})
    try{
      const res = await axiosInstance.put("/auth/update-profile", data)
      set({authUser: res.data})
      toast.success("Profile updated successfully")
    }catch(error){
      toast.error(error.response.data.message)
      console.error("Something went wrong while updating profile image in auth store", error)
    }finally{
      set({isImageUploading: false})
    }
  }
}));
