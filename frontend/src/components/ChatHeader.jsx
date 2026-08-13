import { X } from "lucide-react";
import { useChatStore } from "../store/chatStore";
import { useEffect } from "react";

export function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        setSelectedUser(null);
      }
    };
    window.addEventListener("keydown", handleEscKey);

    return window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center bg-slate-800/50 broder-b border-slate-700/50 max-h-21 px-6 flex-1">
      <div className="flex items-center space-x-3">
        <div className={`avatar avatar-online`}>
          <div className="w-12 rounded-full">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
            />
          </div>
        </div>

        <div>
          <h3 className="text-slate-200 fon-medium">{selectedUser.fullName}</h3>
          <p className="text-xs text-slate-400">Online</p>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        className="hover:cursor-pointer hover:text-slate-300 transition-colors"
      >
        <X size={24} />
      </button>
    </div>
  );
}
