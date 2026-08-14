import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/chatStore";
import { ChatHeader } from "./ChatHeader";
import { NoChatHistoryPlaceholder } from "./NoChatHistoryPlaceholder";
import { MessageInput } from "./MessageInput";
import { MessagesLoadingSkeleton } from "./MessagesLoadingSkeleton";

export function ChatContainer() {
  const { isMessagesLoading, messages, selectedUser, getMessagesByUserId } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null)

  useEffect(() => {
    if(selectedUser?._id) getMessagesByUserId(selectedUser?._id);
  }, [getMessagesByUserId, selectedUser]);

  useEffect(() => {
    if(messageEndRef.current){
      messageEndRef.current.scrollIntoView({behavior: "smooth"})
    }
  }, [messages])

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length === 0 && !isMessagesLoading ? (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`chat ${message.senderId.toString() === authUser._id.toString() ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble relative ${message.senderId.toString() === authUser._id.toString() ? "chat-bubble-primary" : "chat-bubble-secondary"}`}
                >
                  {message.image && (
                    <img
                      src={`${message.image}`}
                      alt={"shared"}
                      className="rounded-lg h-48 object-cover"
                    />
                  )}
                  {message.text && <p className="mt-2">{message.text}</p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(message.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
        )}
      </div>

      <MessageInput />
    </>
  );
}
