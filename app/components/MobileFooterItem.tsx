import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface MobileFooterItemItemProps {
  icon: IconType;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

const MobileFooterItem = ({
  href,
  icon: Icon,
  active,
  onClick,
}: MobileFooterItemItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        `flex gap-x-3 w-full justify-center rounded-md p-4 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100 group`,
        active && "bg-gray-100 text-black"
      )}
    >
      <Icon className="w-6 h-6" />
    </Link>
  );
};

export default MobileFooterItem;
