import { redirect } from "next/navigation";

import { getUserData } from "@/actions/get-user-data";
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from "@/actions/workspaces";

import Sidebar from "@/components/sidebar";
import InfoSection from "@/components/info-section";

import { Workspace as UserWorkspace } from "@/types/app";

const Workspace = async ({ params: { id } }: { params: { id: string } }) => {
  const userData = await getUserData();

  if (!userData) return redirect("/auth");

  const [userWorkspaceData] = await getUserWorkspaceData(userData.workspaces!);

  const [currentWorkspaceData] = await getCurrentWorkspaceData(id);

  return (
    <>
      <div className="hidden md:block">
        <Sidebar
          currentWorkspaceData={currentWorkspaceData}
          userData={userData}
          userWorkspacesData={userWorkspaceData as UserWorkspace[]}
        />
        <InfoSection
          currentWorkspaceData={currentWorkspaceData}
          userData={userData}
        />
      </div>
      <div className="md:hidden block min-h-screen">Mobile</div>
    </>
  );
};

export default Workspace;
