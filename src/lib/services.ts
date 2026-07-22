import { Activity, Beaker, Binary, ClipboardCheck, FileCheck2, FlaskConical, GraduationCap, Handshake, Microscope, ScrollText, ShieldCheck, SlidersHorizontal, Stethoscope, TestTube2, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ServiceItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: ServiceItem[] = [
  {
    title: "Molecular Laboratory Consulting",
    description: "Strategic support for assay menus, workflow decisions, and operational growth.",
    icon: Microscope,
  },
  {
    title: "Laboratory Build-Outs",
    description: "Guidance on molecular lab setup, workflow zones, and implementation planning.",
    icon: Workflow,
  },
  {
    title: "Assay Validation",
    description: "Validation plans and documentation support aligned with regulatory expectations.",
    icon: ClipboardCheck,
  },
  {
    title: "Laboratory Workflow Design",
    description: "Optimized PCR workflows that reduce bottlenecks and increase throughput.",
    icon: SlidersHorizontal,
  },
  {
    title: "SOP Development",
    description: "Clear SOP and process documentation tailored to your laboratory operations.",
    icon: ScrollText,
  },
  {
    title: "Quality Documentation",
    description: "Structured quality systems support for traceability and audit confidence.",
    icon: FileCheck2,
  },
  {
    title: "Inspection Readiness",
    description: "Preparation support for CAP, CLIA, COLA, and accreditation workflows.",
    icon: ShieldCheck,
  },
  {
    title: "CLIA, COLA, CAP Support",
    description: "Practical guidance for compliance programs and inspection planning.",
    icon: TestTube2,
  },
  {
    title: "Training",
    description: "Hands-on staff training for assay implementation and molecular best practices.",
    icon: GraduationCap,
  },
  {
    title: "PCR Workflow Optimization",
    description: "Improve turnaround time while preserving accuracy and quality metrics.",
    icon: Activity,
  },
  {
    title: "Technical Support",
    description: "Responsive troubleshooting for instruments, assays, and daily lab operations.",
    icon: Stethoscope,
  },
  {
    title: "LIS Integration Support",
    description: "Technical guidance for data flow, result mapping, and system alignment.",
    icon: Binary,
  },
  {
    title: "Laboratory Consumables",
    description: "Reliable sourcing for molecular consumables with quality-focused selection.",
    icon: Beaker,
  },
  {
    title: "Validation Material Packages",
    description: "Comprehensive validation resources to accelerate go-live confidence.",
    icon: FlaskConical,
  },
  {
    title: "Implementation Partnership",
    description: "End-to-end launch support from assay onboarding through routine operations.",
    icon: Handshake,
  },
];
