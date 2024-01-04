import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton = ({ icon: Icon, onClick }: AuthSocialButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-full
        inline-flex
        justify-center
        rounded-md px-4 py-2 text-gray-500 bg-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0
        "
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
