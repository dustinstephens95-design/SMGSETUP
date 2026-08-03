import { panels, type PanelData } from "@/lib/panels";

export type InstrumentCard = {
  name: string;
  badge: string;
  description: string;
  route: string;
};

export type ServicePromise = {
  title: string;
  description: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type SpecialtySolution = {
  title: string;
  summary: string;
  panelRecommendations: string[];
};

export type StartupStep = {
  title: string;
  description: string;
};

export type ValidationService = ServicePromise;

export type ResourceGuide = {
  title: string;
  description: string;
  href: string;
  fileName: string;
};

export const featuredPanels: PanelData[] = panels.slice(0, 3);

export const instrumentCards: InstrumentCard[] = [
  {
    name: "Thermo Fisher QuantStudio 5",
    badge: "Primary",
    description: "A widely deployed platform for flexible multiplex PCR workflows and broad laboratory throughput.",
    route: "/compatible-instruments#quantstudio-5",
  },
  {
    name: "Thermo Fisher QuantStudio 12 Flex",
    badge: "Primary",
    description: "High-capacity compatibility for laboratories standardizing on fast multiplex assay implementation.",
    route: "/compatible-instruments#quantstudio-12-flex",
  },
  {
    name: "QuantStudio Dx",
    badge: "Supported",
    description: "Clinical laboratory workflows that require reliable real-time PCR performance and traceability.",
    route: "/compatible-instruments#quantstudio-dx",
  },
  {
    name: "ABI 7500 Fast",
    badge: "Supported",
    description: "A familiar PCR platform for labs looking to align with established molecular workflows.",
    route: "/compatible-instruments#abi-7500-fast",
  },
  {
    name: "ABI 7500 Fast Dx",
    badge: "Supported",
    description: "Clinical PCR operations that prioritize dependable assay execution and routine throughput.",
    route: "/compatible-instruments#abi-7500-fast-dx",
  },
  {
    name: "Bio-Rad CFX96",
    badge: "Supported",
    description: "A high-utility platform for laboratories seeking practical, cost-conscious PCR compatibility.",
    route: "/compatible-instruments#bio-rad-cfx96",
  },
  {
    name: "Agilent AriaMx",
    badge: "Supported",
    description: "A flexible system for clinical laboratories that need reliable real-time PCR support.",
    route: "/compatible-instruments#agilent-ariamx",
  },
  {
    name: "Rotor-Gene Q",
    badge: "Supported",
    description: "A compact platform for focused molecular workflows and real-time PCR assay deployment.",
    route: "/compatible-instruments#rotor-gene-q",
  },
  {
    name: "Other compatible real-time PCR systems",
    badge: "Flexible",
    description: "SMG can assess additional platforms during implementation planning and compatibility review.",
    route: "/compatible-instruments#other-compatible-systems",
  },
];

export const validationServices: ValidationService[] = [
  { title: "Limit of Detection Studies", description: "Determine analytical sensitivity with support for practical validation planning." },
  { title: "Accuracy Studies", description: "Confirm clinical performance against expected targets and comparator workflows." },
  { title: "Precision Studies", description: "Assess repeatability and reproducibility across operators, runs, and instruments." },
  { title: "Stability Studies", description: "Validate reagent, specimen, and run stability within your operating environment." },
  { title: "Cross-Reactivity", description: "Reduce false positives by reviewing organism and target interaction risk." },
  { title: "Interference Studies", description: "Evaluate matrix and specimen interference before routine launch." },
  { title: "Method Correlation", description: "Compare performance with your current molecular or culture workflow." },
  { title: "Instrument Verification", description: "Confirm instrument readiness and setup before go-live." },
  { title: "SOP Development", description: "Build practical SOP language for bench-ready implementation." },
  { title: "Staff Training", description: "Train operators on assay setup, workflow discipline, and troubleshooting." },
  { title: "Inspection Readiness", description: "Prepare documentation and processes for CLIA/CAP-ready environments." },
  { title: "Validation Reports", description: "Deliver clear documentation to support sign-off and internal review." },
  { title: "On-Site Support", description: "Work alongside laboratory teams during launch and early operation." },
];

export const startupSteps: StartupStep[] = [
  { title: "Laboratory Design", description: "Define physical zones, specimen flow, and contamination controls before procurement." },
  { title: "Instrument Selection", description: "Match platform choice to expected throughput, staffing, and assay scope." },
  { title: "Workflow Development", description: "Design a practical molecular workflow that can scale with volume growth." },
  { title: "Panel Implementation", description: "Align panel selection, consumables, and staffing for predictable launch readiness." },
  { title: "Validation", description: "Plan the studies and documentation required before routine patient testing." },
  { title: "LIS Integration", description: "Support data flow, result mapping, and interface alignment." },
  { title: "Training", description: "Prepare laboratory staff for day-one execution and troubleshooting." },
  { title: "Go-Live Support", description: "Provide support during launch so the laboratory can transition smoothly." },
  { title: "Inspection Preparation", description: "Organize documents and operational discipline for future inspection readiness." },
  { title: "Ongoing Technical Support", description: "Keep a responsive support structure in place after launch." },
];

export const faqItems: FAQItem[] = [
  { question: "Can panels be customized?", answer: "SMG can discuss custom multiplex PCR panel strategy based on laboratory goals, platform compatibility, and clinical need." },
  { question: "Which instruments are supported?", answer: "SMG supports a practical set of real-time PCR systems including QuantStudio, ABI, Bio-Rad, Agilent, Rotor-Gene, and other compatible platforms." },
  { question: "Do you provide validation?", answer: "Yes. Validation support is available for studies, planning, reports, and implementation guidance." },
  { question: "Do you provide SOPs?", answer: "SMG can assist with SOP development and workflow documentation for launch readiness." },
  { question: "Can you assist with implementation?", answer: "Yes. Implementation support covers planning, instrument review, workflow setup, and go-live preparation." },
  { question: "How quickly can a laboratory go live?", answer: "Timing depends on the panel, instrument status, and validation scope, but SMG can help accelerate planning and execution." },
  { question: "What specimen types are supported?", answer: "Specimen support is panel-specific, and SMG can confirm specimen fit during the request-pricing process." },
  { question: "How do I request pricing?", answer: "Use any Request Pricing button on the site and SMG will follow up with pricing and next steps." },
];

export const specialtySolutions: SpecialtySolution[] = [
  {
    title: "Urgent Care",
    summary: "Fast-turnaround workflows for point-of-care decision making and quick clinical routing.",
    panelRecommendations: ["Respiratory Panel", "Limited Respiratory Panel", "STI Panel"],
  },
  {
    title: "Hospital Laboratories",
    summary: "Broader menus and implementation support for centralized clinical testing operations.",
    panelRecommendations: ["Respiratory Panel", "UTI Panel", "Wound Panel", "ABR Panel"],
  },
  {
    title: "Reference Laboratories",
    summary: "Scalable molecular testing options for labs serving multiple client settings.",
    panelRecommendations: ["Respiratory Panel", "Women’s Health Panel", "ABR Panel", "Pharyngitis Panel"],
  },
  {
    title: "Physician Office Laboratories",
    summary: "Simplified workflows and practical support for smaller-volume molecular programs.",
    panelRecommendations: ["Limited Respiratory Panel", "STI Panel", "Wound Panel"],
  },
  {
    title: "OB/GYN",
    summary: "Women’s health and infectious disease workflows aligned with outpatient practice needs.",
    panelRecommendations: ["Women’s Health Panel", "STI Panel"],
  },
  {
    title: "Dermatology",
    summary: "Targeted infectious disease support for skin, wound, and stewardship-related workflows.",
    panelRecommendations: ["Wound Panel", "ABR Panel"],
  },
  {
    title: "Long-Term Care",
    summary: "Assay options that support consistent triage and antimicrobial stewardship in extended care settings.",
    panelRecommendations: ["Respiratory Panel", "UTI Panel", "ABR Panel"],
  },
  {
    title: "Public Health",
    summary: "High-confidence molecular workflows for surveillance, testing, and public health response.",
    panelRecommendations: ["Respiratory Panel", "STI Panel", "ABR Panel"],
  },
  {
    title: "Independent Molecular Laboratories",
    summary: "Flexible panel selection and consulting support for labs building differentiated service lines.",
    panelRecommendations: ["Respiratory Panel", "UTI Panel", "Women’s Health Panel", "ABR Panel"],
  },
];

export const resourceGuides: ResourceGuide[] = [
  { title: "Validation Checklist", description: "A concise checklist to organize the major validation steps before go-live.", href: "/resources/placeholder-guide.pdf", fileName: "Validation Checklist.pdf" },
  { title: "Laboratory Startup Guide", description: "Planning guidance for molecular laboratory launch and early operations.", href: "/resources/placeholder-guide.pdf", fileName: "Laboratory Startup Guide.pdf" },
  { title: "Multiplex PCR Guide", description: "Practical notes for multiplex PCR setup, workflow discipline, and implementation.", href: "/resources/placeholder-guide.pdf", fileName: "Multiplex PCR Guide.pdf" },
  { title: "Choosing the Right PCR Panel", description: "A framework for selecting panels that match your lab and patient population.", href: "/resources/placeholder-guide.pdf", fileName: "Choosing the Right PCR Panel.pdf" },
  { title: "CLIA Readiness Checklist", description: "A launch-ready checklist for CLIA-oriented laboratory preparation.", href: "/resources/placeholder-guide.pdf", fileName: "CLIA Readiness Checklist.pdf" },
  { title: "Inspection Preparation Guide", description: "Steps to help your team prepare records, workflows, and documentation for inspection.", href: "/resources/placeholder-guide.pdf", fileName: "Inspection Preparation Guide.pdf" },
];
