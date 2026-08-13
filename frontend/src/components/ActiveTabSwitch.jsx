import { useChatStore } from "../store/chatStore";

export function ActiveTabSwtich() {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <div role="tablist" className="tabs tabs-boxed p-2 w-full">
      <button role="tab" onClick={() => setActiveTab("chats")} className={`${activeTab === "chats" ? "tab-active bg-cyan-500 rounded-lg" : ""} tab`}>
        Chats
      </button>
      <button
        role="tab"
        className={`${activeTab === "contacts" ? "tab-active bg-cyan-500 rounded-lg" : ""} tab`}
        onClick={() => setActiveTab("contacts")}
      >
        Contacts
      </button>
    </div>
  );
}
