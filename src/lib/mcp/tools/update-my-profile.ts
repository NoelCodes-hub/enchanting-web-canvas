import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "update_my_profile",
  title: "Update my profile",
  description: "Update the signed-in PLUSME user's display name and/or avatar URL.",
  inputSchema: {
    display_name: z.string().trim().min(1).optional().describe("New display name."),
    avatar_url: z.string().trim().url().optional().describe("New avatar image URL."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
  handler: async ({ display_name, avatar_url }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    if (display_name === undefined && avatar_url === undefined) {
      return {
        content: [{ type: "text", text: "Provide display_name and/or avatar_url to update." }],
        isError: true,
      };
    }
    const updates: Record<string, string> = {};
    if (display_name !== undefined) updates.display_name = display_name;
    if (avatar_url !== undefined) updates.avatar_url = avatar_url;

    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("user_id", ctx.getUserId())
      .select("display_name, avatar_url");
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: `Profile updated: ${JSON.stringify(data?.[0] ?? updates)}` }],
      structuredContent: { profile: data?.[0] ?? updates },
    };
  },
});
