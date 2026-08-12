import {LoaderIcon} from "lucide-react"

export function PageLoader(){
  return <div className="flex items-center justify-center h-screen">
    <LoaderIcon size={50}  animate="spin" />
  </div>
}