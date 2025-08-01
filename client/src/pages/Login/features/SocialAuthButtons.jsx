// SocialAuthButtons.jsx
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export const SocialAuthButtons = ({ authType }) => {
  return (
    <div className="flex items-center justify-between gap-6 w-full">
      <button className="border border-secondary rounded-lg py-2 px-8 text-center cursor-pointer hover:bg-secondary hover:text-white transition-colors duration-300 flex items-center justify-center gap-4 flex-1">
        <FcGoogle className="text-2xl" />
        Sign {authType === "login" ? "in" : "up"} with Google
      </button>
      <button className="border border-secondary rounded-lg py-2 px-8 text-center cursor-pointer hover:bg-secondary hover:text-white transition-colors duration-300 flex items-center justify-center gap-4 flex-1">
        <FaFacebook className="text-2xl" />
        Sign {authType === "login" ? "in" : "up"} with Facebook
      </button>
    </div>
  );
};
