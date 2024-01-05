import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface DesktopItemProps {
  label: string;
  icon: IconType;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

const DesktopItem = ({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}: DesktopItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link href={href} 
      className={clsx(`flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100 group`,active && "bg-gray-100 text-black")}
      >
        <Icon className="w-6 h-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
