// AuthFooter.jsx
export const AuthFooter = ({ state, setState }) => {
  if (state !== "login" && state !== "register") return null;

  return (
    <div className="mt-4">
      <p className="text-sm font-light text-secondary">
        {state === "login"
          ? "Don't have an account?"
          : "Already have an account?"}
        <a
          href="#"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1"
          onClick={(e) => {
            e.preventDefault();
            setState(state === "login" ? "register" : "login");
          }}
        >
          {state === "login" ? " Sign up" : " Sign in"}
        </a>
      </p>
    </div>
  );
};
