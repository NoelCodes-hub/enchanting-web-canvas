import { defineTool } from "@lovable.dev/mcp-js";

export const TOPICS: Record<
  string,
  { title: string; summary: string; accommodations: string[]; tips: string[] }
> = {
  visual: {
    title: "Visual Impairment Accommodations",
    summary:
      "Visual impairments range from low vision to total blindness. With the right assistive technology and workplace adjustments, visually impaired employees thrive in nearly every role.",
    accommodations: [
      "Screen reader software (NVDA, JAWS, VoiceOver)",
      "Screen magnification tools (ZoomText, built-in OS magnifiers)",
      "High-contrast displays and adjustable font sizes",
      "Braille displays and embossers",
      "Accessible document formats (tagged PDFs, semantic HTML)",
    ],
    tips: [
      "Ensure all digital content meets WCAG 2.1 AA standards",
      "Provide orientation and mobility training for the office",
      "Use descriptive alt text on every image and chart",
      "Keep walkways clear and consistently arranged",
    ],
  },
  hearing: {
    title: "Hearing Accessibility Solutions",
    summary:
      "Deaf and hard-of-hearing employees benefit most from clear communication channels and visual equivalents of audio information.",
    accommodations: [
      "Qualified sign language interpreters",
      "Real-time captioning (CART) for meetings and events",
      "Video relay services and captioned phones",
      "Visual fire alarms and notification systems",
      "Noise-reducing workstations and FM/loop systems",
    ],
    tips: [
      "Always face the person when speaking",
      "Caption every internal and external video",
      "Share agendas and notes in writing before meetings",
      "Use chat tools alongside voice calls",
    ],
  },
  mobility: {
    title: "Mobility Support Strategies",
    summary:
      "Mobility disabilities cover a wide range of conditions affecting movement. Physical and procedural adjustments unlock full participation.",
    accommodations: [
      "Step-free access, ramps, and automatic doors",
      "Height-adjustable desks and ergonomic seating",
      "Accessible restrooms within reasonable distance",
      "Reserved accessible parking close to entrances",
      "Remote and hybrid work options",
    ],
    tips: [
      "Audit your office annually against accessibility standards",
      "Keep aisles at least 36 inches wide",
      "Offer flexible scheduling for medical appointments",
      "Provide voice-control or alternative input devices",
    ],
  },
  cognitive: {
    title: "Cognitive Disability Support",
    summary:
      "Cognitive disabilities affect memory, attention, problem-solving, or processing speed. Structure and clarity make a major difference.",
    accommodations: [
      "Written instructions and visual checklists",
      "Task-management apps and reminder tools",
      "Quiet workspaces with minimal interruptions",
      "Extended deadlines or modified workloads where reasonable",
      "Job coaching and mentoring support",
    ],
    tips: [
      "Break large projects into clear, sequential steps",
      "Confirm understanding by asking the employee to summarize",
      "Use plain language and avoid idioms",
      "Schedule regular, predictable check-ins",
    ],
  },
  neurodiversity: {
    title: "Neurodiversity in the Workplace",
    summary:
      "Neurodivergent employees — including autistic, ADHD, and dyslexic people — bring unique strengths when environments respect different ways of thinking.",
    accommodations: [
      "Sensory-friendly lighting and noise-cancelling headphones",
      "Flexible communication (written vs. verbal)",
      "Predictable routines with advance notice of changes",
      "Quiet rooms for sensory regulation",
      "Clear, literal task descriptions and expectations",
    ],
    tips: [
      "Avoid surprise meetings — share agendas ahead of time",
      "Allow stimming, movement, and fidget tools",
      "Focus on outcomes, not on social conformity",
      "Offer multiple ways to contribute (writing, recording, presenting)",
    ],
  },
  universal: {
    title: "Universal Design Principles",
    summary:
      "Universal Design creates environments and products usable by everyone, regardless of ability — reducing the need for individual accommodations.",
    accommodations: [
      "Step-free entrances used by all employees",
      "Captions on every video benefit everyone in noisy environments",
      "Adjustable furniture suits every body type",
      "Plain-language documents help all readers",
      "Multiple input methods (keyboard, mouse, voice, touch)",
    ],
    tips: [
      "Design for the edges and the middle benefits",
      "Involve disabled employees in the design process",
      "Test products with diverse users early and often",
      "Treat accessibility as a quality standard, not a checklist",
    ],
  },
};

export default defineTool({
  name: "list_knowledge_topics",
  title: "List knowledge topics",
  description:
    "List the disability and inclusion topics in the PLUSME knowledge base (visual, hearing, mobility, cognitive, neurodiversity, universal design).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const topics = Object.entries(TOPICS).map(([id, t]) => ({ id, title: t.title, summary: t.summary }));
    return {
      content: [{ type: "text", text: JSON.stringify(topics, null, 2) }],
      structuredContent: { topics },
    };
  },
});
