import { supabaseServerClient } from "@/supabase/supabaseServer";

export const updateUserWorkspace = async (
  userId: string,
  workspaceId: string
) => {
  const supabase = await supabaseServerClient();

  // Update the user record
  const {} = await supabase.rpc("add_workspace", {});
};
