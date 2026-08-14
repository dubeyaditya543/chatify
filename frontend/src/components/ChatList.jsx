import { useEffect } from "react";
import { useChatStore } from "../store/chatStore";
import { UsersLoadingSkeleton } from "./UsersLoadingSkeleton";
import { NoChatsFound } from "./NoChatsFound";
import { useAuthStore } from "../store/authStore";

export function ChatList() {
  const { getAllChatPartners, chatPartners, isUserLoading, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllChatPartners();
  }, [getAllChatPartners]);

  if (isUserLoading) return <UsersLoadingSkeleton />;
  if (chatPartners.length === 0) return <NoChatsFound />;
  return (
    <>
      {chatPartners.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div
              className={`avatar ${onlineUsers.includes(chat._id) ? "avatar-online" : "avatar-offline"}`}
            >
              <div className="size-12 rounded-full">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">
              {chat.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}
