import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listKnowledgeTopicsTool from "./tools/list-knowledge-topics";
import getAccommodationGuideTool from "./tools/get-accommodation-guide";
import getMyProfileTool from "./tools/get-my-profile";
import updateMyProfileTool from "./tools/update-my-profile";

// The OAuth issuer MUST be the direct Supabase host, built from the project ref
// (inlined at build time — keeps this module import-safe). Never use SUPABASE_URL.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "plusme",
  title: "Plusme",
  version: "0.1.0",
  instructions:
    "PLUSME is a workplace inclusion platform. Use list_knowledge_topics to browse disability inclusion topics, get_accommodation_guide for detailed workplace accommodations per topic, and get_my_profile / update_my_profile to read or update the signed-in user's profile.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listKnowledgeTopicsTool, getAccommodationGuideTool, getMyProfileTool, updateMyProfileTool],
});
