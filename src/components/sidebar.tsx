import { FC } from "react";

import { User, Workspace } from "@/types/app";

type SidebarProps = {
  userWorkspacesData: Workspace[];
  currentWorkspaceData: Workspace;
  userData: User;
};

const Sidebar: FC<SidebarProps> = ({
  userWorkspacesData,
  currentWorkspaceData,
  userData,
}) => {
  return <aside>Sidebar</aside>;
};

export default Sidebar;
