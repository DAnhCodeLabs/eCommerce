import { Divider } from "antd";
import { SocialAuthButtons } from "./SocialAuthButtons";

// AuthHeader.jsx
export const AuthHeader = ({ state }) => {
  const getTitle = () => {
    switch (state) {
      case "login":
        return "Welcome back";
      case "register":
        return "Sign up to get started";
      case "forgot":
        return "Let's reset your password";
      case "reset":
        return "You're almost there";
      case "verify":
        return "Let's verify it's you";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col items-start justify-center gap-4 w-full">
      <h1 className="text-2xl font-bold text-secondary">{getTitle()}</h1>
      {(state === "login" || state === "register") && (
        <>
          <SocialAuthButtons authType={state} />
          <Divider plain>OR</Divider>
        </>
      )}
    </div>
  );
};
