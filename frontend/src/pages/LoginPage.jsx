import { useState } from "react";
import { MessageCircle, LockIcon, MailIcon, LoaderIcon } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router";

export default function LoginPage() {
  const { isLoggingIn, login } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const correctedFormData = {
      email: formData.email.trim(),
      password: formData.password.trim(),
    };
    login(correctedFormData);
  }

  return (
    <div className="max-w-300 rounded-lg flex items-center justify-center p-4 bg-slate-800">
      <div className="relative w-full max-w-6xl md:h-200 h-162.5 flex items-center justify-center">
        <div className="w-full md:flex-row flex-col flex">
          {/* SIGNUP - LEFT COLUMN */}
          <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <MessageCircle className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                <h2 className="text-2xl font-bold text-slate-200 mb-2">
                  Welcome back
                </h2>
                <p className="text-slate-400">Log back in</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                    <input
                      id="email"
                      required
                      type="email"
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="johndoe@gmail.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value.toString(),
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                    <input
                      id="password"
                      type="password"
                      required
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.target.value.toString(),
                        })
                      }
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-500 text-white rounded-lg py-2.5 font-medium
  hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-500 hover:cursor-pointer"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <LoaderIcon className="w-full h-4 animate-spin text-center" />
                  ) : (
                    "Log in"
                  )}
                </button>

                <div className="mt-6 text-center">
                  <Link
                    to="/singup"
                    className="px-4 py-2 inline-block bg-cyan-500/10 rounded-lg text-cyan-400
  hover:text-cyan-500 text-sm transition-colors"
                  >
                    Don't have an account? Singup
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* SIGNUP - RIGHT COLUMN */}
          <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-linear-to-bl from-slate-800/20 to-transparent">
            <div>
              <img
                src="/login.png"
                alt="People using mobile devices"
                className="w-full h-auto object-contain"
              />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-medium text-cyan-400">
                  Start Your Journey Today
                </h3>

                <div className="mt-4 flex justify-center gap-4">
                  <span className="auth-badge">Free</span>
                  <span className="auth-badge">Easy Setup</span>
                  <span className="auth-badge">Private</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
