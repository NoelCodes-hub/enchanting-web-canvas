import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { TOPICS } from "./list-knowledge-topics";

export default defineTool({
  name: "get_accommodation_guide",
  title: "Get accommodation guide",
  description:
    "Get the PLUSME accommodation guide for one disability topic: overview, recommended accommodations, and practical workplace tips. Call list_knowledge_topics first to see the valid topic ids.",
  inputSchema: {
    topic: z
      .string()
      .min(1)
      .describe("Topic id: visual, hearing, mobility, cognitive, neurodiversity, or universal."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ topic }) => {
    const guide = TOPICS[topic.trim().toLowerCase()];
    if (!guide) {
      throw new ToolError(
        `Unknown topic "${topic}". Valid topics: ${Object.keys(TOPICS).join(", ")}.`
      );
    }
    const result = { topic: topic.trim().toLowerCase(), ...guide };
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
