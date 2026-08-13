import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chatPartners: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("soundStatus")) === true,

  toggleSound: () => {
    localStorage.setItem("soundStatus", !get().isSoundEnabled)
    set({isSoundEnabled: !get().isSoundEnabled})
  },
  setActiveTab: (tab) => {
    set({activeTab: tab})
  },
  setSelectedUser: (user) => {
    set({selectedUser: user})
  },
  getAllContacts: async () => {
    set({isUserLoading: true})
    try{
      const res = await axiosInstance.get("/messages/contacts")
      set({allContacts: res.data})
    }catch(error){
      set({allContacts: []})
      console.error("Something went wrong with get all contacts in chat store", error)
    }finally{
      set({isUserLoading: false})
    }
  },
  getAllChatPartners: async () => {
    set({isUserLoading: true})
    try{
     const res = await axiosInstance.get("/messages/chats")
     set({chatPartners: res.data}) 
    }catch(error){
      console.error("Something went wrong with get chat partners in chat store", error)
    }finally{
      set({isUserLoading: false})
    }
  },
  getMessagesByUserId: async (id) => {
    set({isMessagesLoading: true})
    try{
      const res = await axiosInstance.get(`/messages/${id}`)
      set({messages: res.data})
    }catch(error){
      toast.error(error?.response?.data?.message)
      console.error("Something went wrong with get message function in chat store", error)
    }finally{
      set({isMessagesLoading: false})
    }
  }
}))