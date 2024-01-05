"use client";

import useConversation from "../hooks/useConversation";
import useRoutes from "../hooks/useRoutes";
import MobileFooterItem from "./MobileFooterItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  if (isOpen) {
    return null;
  }
  return (
    <div
      className="lg:hidden fixed bottom-0  z-40 w-full
    bg-white border-t-[1px]  flex items-center justify-between"
    >
      {routes.map((item) => (
        <MobileFooterItem
          key={item.href}
          active={item.active}
          href={item?.href}
          onClick={item.onClick}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
