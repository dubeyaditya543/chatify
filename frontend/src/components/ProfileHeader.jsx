import { useRef, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/chatStore";
import {
  LoaderIcon,
  LogOutIcon,
  Volume2Icon,
  VolumeOffIcon,
} from "lucide-react";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

export function ProifleHeader() {
  const { authUser, logout, updateProfile, isImageUploading } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  function handleImageUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Img = reader.result;
      setSelectedImg(base64Img);
      updateProfile({ profilePic: base64Img });
    };
  }

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="avatar avatar-online">
            {isImageUploading ? (
              <LoaderIcon
                className="size-14 rounded-full overflow-hidden relative group"
                size={10}
                animate="spin"
              />
            ) : (
              <button
                className="size-14 rounded-full overflow-hidden relative group"
                onClick={() => fileInputRef?.current?.click()}
              >
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="user_img"
                  className="size-full object-cover hover:cursor-pointer"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-hover:cursor-pointer flex items-center justify-center transition-opacity">
                  <span className="text-white text-xs">Change</span>
                </div>
              </button>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </div>

          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-45 truncate">
              {authUser.fullName}
            </h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>

        {/* Sound and logout */}
        <div className="flex gap-4 items-center">
          <button
            className="text-slate-400 hover:cursor-pointer hover:text-slate-200 transition-colors"
            onClick={logout}
          >
            <LogOutIcon />
          </button>
          <button
            className="text-slate-400 hover:cursor-pointer hover:text-slate-200 transition-colors"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound
                .play()
                .catch((error) => console.error("Audio play failed", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? <Volume2Icon /> : <VolumeOffIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}
