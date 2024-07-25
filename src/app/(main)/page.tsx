import { redirect } from "next/navigation";

import { getUserData } from "@/actions/get-user-data";

import { Button } from "@/components/ui/button";

export default async function Home() {
  const userData = await getUserData();

  if (!userData) return redirect("/auth");

  const userWorkspaceId = userData.workspaces?.[0];

  if (!userWorkspaceId) return redirect("/create-workspace");

  if (userWorkspaceId) return redirect(`/workspace/${userWorkspaceId}`);

  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
