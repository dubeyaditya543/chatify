import { ActiveTabSwtich } from "../components/ActiveTabSwitch";
import { BorderAnimatedContainer } from "../components/BorderAnimatedContainer";
import { ChatContainer } from "../components/ChatContainer";
import { ChatList } from "../components/ChatList";
import { ContactList } from "../components/ContactList";
import { NoConversationPlaceholder } from "../components/NoConversationPlaceholder";
import { ProifleHeader } from "../components/ProfileHeader";
import { useChatStore } from "../store/chatStore";

export default function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();
  return (
    <div className="relative w-full max-w-6xl h-200">
      <BorderAnimatedContainer>
        {/* Side Bar */}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProifleHeader />
          <ActiveTabSwtich />

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatList /> : <ContactList />}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}
