import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chatPartners: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: localStorage.getItem("soundStatus") === true,

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
  getAllMessages: async () => {}
}))