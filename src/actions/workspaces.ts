"use server";

import { supabaseServerClient } from "@/supabase/supabaseServer";

import { getUserData } from "./get-user-data";
import { addMemberToWorkspace } from "./add-member-to-workspace";
import { updateUserWorkspace } from "./update-user-workspace";

export const getUserWorkspaceData = async (workspaceIds: Array<string>) => {
  const supabase = await supabaseServerClient();

  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .in("id", workspaceIds);

  return [data, error];
};

export const getCurrentWorkspaceData = async (workspaceId: string) => {
  const supabase = await supabaseServerClient();

  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("id", workspaceId)
    .single();

  return [data, error];
};

export const workspaceInvite = async (inviteCode: string) => {
  const supabase = await supabaseServerClient();
  const userData = await getUserData();

  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("invite_code", inviteCode)
    .single();

  if (error) {
    console.log("Error fetching workspace invite", error);
    return;
  }

  const isUserMember = data?.member?.includes(userData?.id);

  if (isUserMember) {
    console.log("User is already a member of this workspace");
    return;
  }

  if (data?.super_admin === userData?.id) {
    console.log("User is the super admin of this workspace");
    return;
  }

  await addMemberToWorkspace(userData?.id!, data?.id);

  await updateUserWorkspace(userData?.id!, data?.id);
};
