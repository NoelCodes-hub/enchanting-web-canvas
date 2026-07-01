import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    const XAI_API_KEY = Deno.env.get("XAI_API_KEY");

    if (!OPENAI_API_KEY && !XAI_API_KEY) {
      throw new Error("OPENAI_API_KEY or XAI_API_KEY is not configured");
    }

    const useOpenAI = Boolean(OPENAI_API_KEY);
    const apiUrl = useOpenAI
      ? "https://api.openai.com/v1/chat/completions"
      : "https://api.x.ai/v1/chat/completions";
    const apiKey = useOpenAI ? OPENAI_API_KEY : XAI_API_KEY;
    const model = useOpenAI ? "gpt-4o-mini" : "grok-beta";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: `You are PLUSME, an AI workplace inclusion assistant. You help recommend suitable tasks and accommodations for people with disabilities in various job roles. You have expertise in:
- Visual impairment accommodations (screen readers, magnification, workplace adaptations)
- Hearing accessibility (sign language, captioning, visual alerts)
- Mobility support (wheelchair access, ergonomic workstations, flexible arrangements)
- Cognitive disability support (task simplification, memory aids, structured routines)
- Neurodiversity (autism-friendly environments, ADHD accommodations, sensory considerations)

Be empathetic, practical, and specific in your recommendations. Keep responses concise but helpful.`,
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
