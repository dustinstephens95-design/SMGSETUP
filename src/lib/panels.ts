export type PanelTheme = "teal" | "blue" | "purple";

export type PanelData = {
  slug: string;
  name: string;
  shortName: string;
  theme: PanelTheme;
  targetCount: number;
  pricePerReaction: string;
  productCode: string;
  technology: string;
  sampleType: string;
  clinicalOverview: string;
  clinicalApplications: string[];
  keyFeatures: string[];
  compatiblePlatforms: string[];
  targets: Record<string, string[]>;
  image: string;
  cardImage?: string;
  imagePosition?: string;
  brochureFileName: string;
  brochurePdf?: string | null;
  description: string;
};

export const panelThemeStyles: Record<
  PanelTheme,
  { badge: string; surface: string; button: string; ring: string }
> = {
  teal: {
    badge: "bg-teal-700 text-white",
    surface: "from-teal-100 to-cyan-50",
    button: "bg-teal-700 hover:bg-teal-800 text-white",
    ring: "ring-teal-200",
  },
  blue: {
    badge: "bg-blue-700 text-white",
    surface: "from-blue-100 to-indigo-50",
    button: "bg-blue-700 hover:bg-blue-800 text-white",
    ring: "ring-blue-200",
  },
  purple: {
    badge: "bg-purple-700 text-white",
    surface: "from-purple-100 to-violet-50",
    button: "bg-purple-700 hover:bg-purple-800 text-white",
    ring: "ring-purple-200",
  },
};

export const panels: PanelData[] = [
  {
    slug: "respiratory",
    name: "Respiratory Panel",
    shortName: "Respiratory",
    theme: "blue",
    targetCount: 29,
    pricePerReaction: "$17.79",
    productCode: "SMG-RSP-2901",
    technology: "Multiplex real-time PCR",
    sampleType: "Contact SMG for specimen and workflow details.",
    clinicalOverview:
      "The SMG Respiratory Panel is a 29-target multiplex real-time PCR assay designed for broad respiratory coverage of viral and bacterial pathogens to support rapid, accurate diagnosis.",
    clinicalApplications: [
      "Hospital laboratories",
      "Reference laboratories",
      "Urgent care",
      "Physician office laboratories",
      "Independent molecular laboratories",
    ],
    keyFeatures: [
      "29 respiratory targets in a single assay",
      "Broad viral and bacterial respiratory coverage",
      "Multiplex real-time PCR with rapid turnaround",
      "Validation materials and implementation support",
    ],
    compatiblePlatforms: [
      "Thermo Fisher QuantStudio 5",
      "Thermo Fisher QuantStudio 12 Flex",
      "Other compatible real-time PCR systems",
    ],
    targets: {
      Viruses: [
        "SARS-CoV-2",
        "Influenza A",
        "Influenza A H1",
        "Influenza A H1-2009",
        "Influenza A H3",
        "Influenza B",
        "RSV A",
        "RSV B",
        "Human Rhinovirus/Enterovirus",
        "Human Metapneumovirus",
        "Parainfluenza Virus 1",
        "Parainfluenza Virus 2",
        "Parainfluenza Virus 3",
        "Parainfluenza Virus 4",
        "Adenovirus",
        "Coronavirus 229E",
        "Coronavirus HKU1",
        "Coronavirus NL63",
        "Coronavirus OC43",
      ],
      Bacteria: [
        "Bordetella pertussis",
        "Bordetella parapertussis",
        "Mycoplasma pneumoniae",
        "Chlamydophila pneumoniae",
        "Haemophilus influenzae",
        "Streptococcus pneumoniae",
        "Moraxella catarrhalis",
        "Legionella pneumophila",
        "Staphylococcus aureus",
      ],
      "Internal Control": ["RNase P (RPP30)"],
    },
    image: "/panels/respiratory.png",
    cardImage: "/Updated Panel Cards/RPP Card.png",
    imagePosition: "center center",
    brochureFileName: "RPP_Brochure_NP.png",
    brochurePdf: null,
    description:
      "Comprehensive 29-target respiratory assay with broad viral and bacterial coverage for high-confidence clinical decisions.",
  },
  {
    slug: "limited-respiratory",
    name: "Limited Respiratory Panel",
    shortName: "Limited Respiratory",
    theme: "teal",
    targetCount: 7,
    pricePerReaction: "$5.83",
    productCode: "SMG-LRP-0701",
    technology: "Multiplex real-time PCR",
    sampleType: "Contact SMG for specimen and workflow details.",
    clinicalOverview:
      "The SMG Limited Respiratory Panel is a focused 7-target multiplex real-time PCR assay for rapid differential respiratory diagnosis and timely treatment decisions.",
    clinicalApplications: [
      "Urgent care and walk-in clinics",
      "Physician office laboratories",
      "Hospital laboratories",
      "Reference laboratories",
      "Outpatient and ambulatory settings",
    ],
    keyFeatures: [
      "7 high-priority respiratory targets",
      "Fast, sensitive multiplex PCR workflow",
      "Streamlined setup for smaller labs",
      "Validation documentation and support",
    ],
    compatiblePlatforms: [
      "Thermo Fisher QuantStudio 5",
      "Thermo Fisher QuantStudio 12 Flex",
      "Other compatible real-time PCR systems",
    ],
    targets: {
      "Complete Target List": [
        "SARS-CoV-2",
        "Influenza A",
        "Influenza B",
        "RSV A/B",
        "Human Rhinovirus/Enterovirus",
        "Human Metapneumovirus",
        "Parainfluenza Virus 1",
      ],
    },
    image: "/panels/limited-respiratory.png",
    cardImage: "/Updated Panel Cards/Limited RPP Card.png",
    imagePosition: "center 35%",
    brochureFileName: "LimitedRPP_Brochure_NP.png",
    brochurePdf: null,
    description:
      "Focused respiratory panel delivering rapid answers for high-volume outpatient and urgent settings.",
  },
  {
    slug: "uti",
    name: "UTI Panel",
    shortName: "UTI",
    theme: "blue",
    targetCount: 24,
    pricePerReaction: "$14.24",
    productCode: "SMG-UTI-2401",
    technology: "Multiplex real-time PCR",
    sampleType: "Contact SMG for specimen and workflow details.",
    clinicalOverview:
      "The SMG UTI Panel is a 24-target multiplex real-time PCR assay designed to detect bacterial and yeast uropathogens and antimicrobial resistance-associated organisms.",
    clinicalApplications: [
      "Hospital laboratories",
      "Physician office laboratories",
      "Urgent care and walk-in clinics",
      "Long-term care facilities",
      "Reference laboratories",
      "Outpatient and ambulatory settings",
    ],
    keyFeatures: [
      "Broad UTI pathogen and yeast coverage",
      "Simple protocol with minimal hands-on time",
      "Turnaround in approximately 2-3 hours",
      "Comprehensive target coverage for UTI workflows",
    ],
    compatiblePlatforms: [
      "Thermo Fisher QuantStudio 5",
      "Thermo Fisher QuantStudio 12 Flex",
      "Other compatible real-time PCR systems",
    ],
    targets: {
      "Bacteria & Yeast": [
        "Acinetobacter baumannii",
        "Candida albicans",
        "Candida glabrata",
        "Candida parapsilosis",
        "Candida tropicalis",
        "Enterobacter cloacae",
        "Enterococcus faecalis",
        "Enterococcus faecium",
        "Escherichia coli",
        "Klebsiella (Enterobacter) aerogenes",
        "Klebsiella oxytoca",
        "Klebsiella pneumoniae/oxytoca",
        "Morganella morganii",
        "Proteus mirabilis",
        "Proteus vulgaris",
        "Providencia stuartii",
        "Pseudomonas aeruginosa",
        "Serratia marcescens",
        "Staphylococcus aureus",
        "Staphylococcus saprophyticus",
        "Streptococcus agalactiae",
        "Streptococcus dysgalactiae (Group C)",
        "Streptococcus pyogenes",
        "Ureaplasma urealyticum",
      ],
      "Internal Control": ["RNase P (RPP30)"],
    },
    image: "/panels/uti.png",
    cardImage: "/Updated Panel Cards/UTI Card.png",
    imagePosition: "center top",
    brochureFileName: "UTI_Brochure_NP.png",
    brochurePdf: null,
    description:
      "24-target UTI molecular panel supporting rapid diagnosis and treatment planning across care settings.",
  },
  {
    slug: "womens-health",
    name: "Women's Health Panel",
    shortName: "Women's Health",
    theme: "purple",
    targetCount: 17,
    pricePerReaction: "$12.13",
    productCode: "SMG-WHP-1701",
    technology: "Multiplex real-time PCR",
    sampleType: "Contact SMG for specimen and workflow details.",
    clinicalOverview:
      "The SMG Women's Health Panel is a 17-target multiplex real-time PCR assay for detecting and differentiating leading causes of bacterial vaginosis, yeast infections, and urogenital pathogens.",
    clinicalApplications: [
      "Hospital laboratories",
      "Physician office laboratories",
      "Urgent care and walk-in clinics",
      "Long-term care facilities",
      "Reference laboratories",
      "Outpatient and ambulatory settings",
    ],
    keyFeatures: [
      "Multiplex detection for key urogenital targets",
      "Fast turnaround in approximately 2-3 hours",
      "Broad urogenital pathogen coverage",
      "Designed for streamlined laboratory workflows",
    ],
    compatiblePlatforms: [
      "Thermo Fisher QuantStudio 5",
      "Thermo Fisher QuantStudio 12 Flex",
      "Other compatible real-time PCR systems",
    ],
    targets: {
      "Targets Include": [
        "Atopobium vaginae",
        "BVAB-2",
        "Candida albicans",
        "Candida glabrata",
        "Candida parapsilosis",
        "Candida tropicalis",
        "Enterococcus faecalis",
        "Escherichia coli",
        "Gardnerella vaginalis",
        "Lactobacillus iners",
        "Megasphaera Type 1",
        "Megasphaera Type 2",
        "Mycoplasma hominis",
        "RNase P (RPP30)",
        "Staphylococcus aureus",
        "Streptococcus agalactiae",
        "Ureaplasma urealyticum",
      ],
    },
    image: "/panels/womens-health.png",
    cardImage: "/Updated Panel Cards/Womens Health Card.png",
    imagePosition: "center top",
    brochureFileName: "WH_Brochure_NP.png",
    brochurePdf: null,
    description:
      "Comprehensive women’s health testing panel for accurate, rapid molecular detection of key urogenital targets.",
  },
  {
    slug: "sti",
    name: "STI Panel",
    shortName: "STI",
    theme: "purple",
    targetCount: 12,
    pricePerReaction: "$8.86",
    productCode: "SMG-STI-1201",
    technology: "Multiplex real-time PCR",
    sampleType: "Contact SMG for specimen and workflow details.",
    clinicalOverview:
      "The SMG STI Panel is a 12-target multiplex real-time PCR assay designed for qualitative detection of common sexually transmitted infections.",
    clinicalApplications: [
      "Physician office laboratories",
      "Urgent care and walk-in clinics",
      "Hospital laboratories",
      "Reference laboratories",
      "Public health laboratories",
      "Reproductive health clinics",
    ],
    keyFeatures: [
      "12 high-priority STI targets",
      "Focused target coverage for STI workflows",
      "Broad bacterial and protozoan coverage",
      "Validation materials and support available",
    ],
    compatiblePlatforms: [
      "Thermo Fisher QuantStudio 5",
      "Thermo Fisher QuantStudio 12 Flex",
      "Other compatible real-time PCR systems",
    ],
    targets: {
      "Complete Target List": [
        "Chlamydia trachomatis",
        "Neisseria gonorrhoeae",
        "Trichomonas vaginalis",
        "Mycoplasma genitalium",
        "Ureaplasma urealyticum",
        "Ureaplasma parvum",
        "Treponema pallidum",
        "Herpes Simplex Virus 1 (HSV-1)",
        "Herpes Simplex Virus 2 (HSV-2)",
        "Haemophilus ducreyi",
        "Mycoplasma hominis",
        "Gardnerella vaginalis",
      ],
    },
    image: "/panels/sti.png",
    cardImage: "/Updated Panel Cards/STI Card.png",
    imagePosition: "center 30%",
    brochureFileName: "STI_Brochure_NP.png",
    brochurePdf: null,
    description:
      "A focused 12-target STI panel built for fast, dependable molecular screening and treatment support.",
  },
  {
    slug: "wound",
    name: "Wound Panel",
    shortName: "Wound",
    theme: "teal",
    targetCount: 17,
    pricePerReaction: "$11.21",
    productCode: "SMG-WND-2401",
    technology: "Multiplex real-time PCR",
    sampleType: "Contact SMG for specimen and workflow details.",
    clinicalOverview:
      "The SMG Wound Panel is a 17-target multiplex real-time PCR assay designed to detect bacterial pathogens commonly associated with wound infections.",
    clinicalApplications: [
      "Hospital laboratories",
      "Physician office laboratories",
      "Urgent care and walk-in clinics",
      "Long-term care facilities",
      "Reference laboratories",
      "Outpatient and ambulatory settings",
    ],
    keyFeatures: [
      "Multiplex PCR workflow for wound pathogen detection",
      "Simple workflow with low hands-on time",
      "Fast turnaround in approximately 2-3 hours",
      "Designed for routine laboratory implementation",
    ],
    compatiblePlatforms: [
      "Thermo Fisher QuantStudio 5",
      "Thermo Fisher QuantStudio 12 Flex",
      "Other compatible real-time PCR systems",
    ],
    targets: {
      Bacteria: [
        "Acinetobacter baumannii",
        "Bacteroides fragilis",
        "Citrobacter freundii",
        "Enterobacter cloacae",
        "Enterococcus faecalis",
        "Enterococcus faecium",
        "Escherichia coli",
        "Klebsiella (Enterobacter) aerogenes",
        "Klebsiella oxytoca",
        "Klebsiella pneumoniae/oxytoca",
        "Morganella morganii",
        "Proteus mirabilis",
        "Proteus vulgaris",
        "Pseudomonas aeruginosa",
        "RNase P (RPP30)",
        "Staphylococcus aureus",
        "Streptococcus agalactiae",
        "Streptococcus pyogenes",
      ],
    },
    image: "/panels/wound.png",
    cardImage: "/Updated Panel Cards/Wound Card.png",
    imagePosition: "center top",
    brochureFileName: "Wound_Brochure_NP.png",
    brochurePdf: null,
    description:
      "Broad bacterial wound-infection coverage to improve diagnostic confidence and accelerate treatment decisions.",
  },
  {
    slug: "pharyngitis",
    name: "Pharyngitis Panel",
    shortName: "Pharyngitis",
    theme: "purple",
    targetCount: 21,
    pricePerReaction: "$12.83",
    productCode: "SMG-PHR-2101",
    technology: "Multiplex real-time PCR",
    sampleType: "Contact SMG for specimen and workflow details.",
    clinicalOverview:
      "The SMG Pharyngitis Panel is a 21-target multiplex real-time PCR assay for rapid detection of viral and bacterial pathogens associated with pharyngitis and respiratory tract infections.",
    clinicalApplications: [
      "Hospital laboratories",
      "Physician office laboratories",
      "Urgent care and walk-in clinics",
      "Long-term care facilities",
      "Reference laboratories",
      "Outpatient and ambulatory settings",
    ],
    keyFeatures: [
      "Broad bacterial and viral pathogen coverage",
      "Fast turnaround in approximately 2-3 hours",
      "Simple protocol with minimal hands-on time",
      "Designed for pharyngitis diagnostic workflows",
    ],
    compatiblePlatforms: [
      "Thermo Fisher QuantStudio 5",
      "Thermo Fisher QuantStudio 12 Flex",
      "Other compatible real-time PCR systems",
    ],
    targets: {
      Bacteria: [
        "Bordetella pertussis",
        "Chlamydia pneumoniae",
        "Group A Streptococcus (GAS)",
        "Haemophilus influenzae",
        "Haemophilus influenzae type B",
        "Moraxella catarrhalis",
        "Mycoplasma pneumoniae",
        "Neisseria meningitidis",
        "Staphylococcus aureus",
        "Streptococcus agalactiae",
        "Streptococcus pneumoniae",
        "Streptococcus pyogenes",
      ],
      Viruses: [
        "Adenovirus",
        "Coronavirus 229E",
        "Coronavirus HKU1",
        "Coronavirus NL63",
        "Coronavirus OC43",
        "Human Metapneumovirus (hMPV)",
        "Human Rhinovirus/Enterovirus",
        "Influenza A",
        "Influenza B",
      ],
      "Internal Control": ["RNase P (RPP30)"],
    },
    image: "/panels/pharyngitis.png",
    cardImage: "/Updated Panel Cards/Pharyngitis Card.png",
    imagePosition: "center top",
    brochureFileName: "PHN_Brochure_NP.png",
    brochurePdf: null,
    description:
      "21-target pharyngitis panel delivering broad viral and bacterial detection with strong clinical utility.",
  },
];

export function getPanelBySlug(slug: string) {
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();
  return panels.find((panel) => panel.slug.toLowerCase() === normalizedSlug);
}
