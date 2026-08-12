import { useAuthStore } from "../store/authStore"

export default function ChatPage(){
  const {logout} = useAuthStore()
  return <div className="flex flex-col gap-4">
    Hello chat page
    <button onClick={logout} className="btn btn-accent">logout</button>
  </div>
}