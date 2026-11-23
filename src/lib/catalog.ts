import acImg from "@/assets/ac-service.jpg";
import bathroomImg from "@/assets/bathroom-cleaning.jpg";
import homeHelpImg from "@/assets/home-help.jpg";
import electricianImg from "@/assets/electrician.jpg";
import plumberImg from "@/assets/plumber.jpg";
import carpenterImg from "@/assets/carpenter.jpg";
import paintingImg from "@/assets/painting.jpg";
import sofaImg from "@/assets/sofa-cleaning.jpg";
import kitchenImg from "@/assets/kitchen-cleaning.jpg";
import pestImg from "@/assets/pest-control.jpg";
import heroImg from "@/assets/hero-technician.jpg";
import waterproofImg from "@/assets/waterproofing.jpg";

/**
 * Business facts. Values marked SAMPLE stand in for the [placeholders] in the
 * original content and should be replaced with the real numbers.
 */
export const BRAND = {
  name: "ServiceLane",
  tagline: "Reliable home services, on demand.",
  region: "West Bengal",
  warrantyDays: 30, // SAMPLE
  coverageAmount: "₹10,000", // SAMPLE
  dispatchMinutes: 45, // SAMPLE
  cancellationWindow: "2 hours", // SAMPLE
  supportEmail: "support@servicelane.in", // SAMPLE
  supportPhone: "+91 98300 12345", // SAMPLE
  supportPhoneHref: "tel:+919830012345",
  whatsappHref: "https://wa.me/919830012345",
} as const;

export const IMAGES = {
  hero: heroImg,
  ac: acImg,
  bathroom: bathroomImg,
  homeHelp: homeHelpImg,
  electrician: electricianImg,
  plumber: plumberImg,
  carpenter: carpenterImg,
  painting: paintingImg,
  sofa: sofaImg,
  kitchen: kitchenImg,
  pest: pestImg,
  waterproof: waterproofImg,
};

export type IconKey =
  | "wind"
  | "sparkles"
  | "home"
  | "zap"
  | "droplet"
  | "ruler"
  | "roller"
  | "upload"
  | "shield"
  | "userCheck"
  | "rupee"
  | "clock";

export type Service = {
  id: string;
  title: string;
  desc: string;
  price: number; // ₹, 0 = free
  priceLead?: "Starts at" | "Visit from";
  duration: string;
  image: string;
};

export type ServiceGroup = { title: string; services: Service[] };

export type Category = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: IconKey;
  image: string;
  copy: string;
  tags: string[];
  cta: string;
  groups: ServiceGroup[];
};

const s = (
  id: string,
  title: string,
  desc: string,
  price: number,
  duration: string,
  image: string,
  priceLead: Service["priceLead"] = "Starts at",
): Service => ({ id, title, desc, price, duration, image, priceLead });

export const CATEGORIES: Category[] = [
  {
    slug: "ac-appliance-repair",
    title: "AC & Appliance Repair",
    shortTitle: "AC & Appliance Repair",
    icon: "wind",
    image: acImg,
    copy: "Brand-agnostic doorstep diagnostics, preventive servicing, and genuine spare-part repairs.",
    tags: ["AC Service & Gas Refill", "Washing Machine", "Refrigerator", "RO Purifier", "Microwave", "Chimney & Geyser"],
    cta: "Explore Repairs",
    groups: [
      {
        title: "Air conditioner",
        services: [
          s("ac-foam-jet", "AC Foam-Jet Service", "Deep coil cleaning, filter wash, and cooling performance check for Split & Window ACs.", 599, "60 mins", acImg),
          s("ac-gas-refill", "AC Gas Refill & Leak Fix", "Leak detection, brazing and complete refrigerant top-up.", 2499, "90 mins", acImg),
        ],
      },
      {
        title: "Home appliances",
        services: [
          s("washing-machine", "Washing Machine Check-up", "Diagnosis for drum, drainage, and spin issues. Fee adjusted in final bill.", 249, "45 mins", acImg, "Visit from"),
          s("refrigerator", "Refrigerator Repair", "Cooling, compressor, and gas issues for single and double door units.", 299, "60 mins", acImg, "Visit from"),
          s("ro-purifier", "RO Purifier Service", "Filter change, membrane check, and TDS testing.", 399, "45 mins", acImg),
          s("microwave", "Microwave Check-up", "Heating, turntable, and panel faults diagnosed at home.", 199, "30 mins", acImg, "Visit from"),
          s("chimney-geyser", "Chimney Deep Clean / Geyser Service", "Degreasing for chimneys, descaling and safety check for geysers.", 899, "75 mins", kitchenImg),
        ],
      },
    ],
  },
  {
    slug: "cleaning-pest-control",
    title: "Cleaning & Pest Control",
    shortTitle: "Cleaning & Pest Control",
    icon: "sparkles",
    image: bathroomImg,
    copy: "Mechanized deep cleaning for every room and certified pest treatments built for lasting hygiene.",
    tags: ["Full Home Deep Clean", "Bathroom & Kitchen", "Sofa & Carpet", "Cockroach, Termite & Bed Bug Control"],
    cta: "Explore Cleaning",
    groups: [
      {
        title: "Bathroom & kitchen",
        services: [
          s("bathroom-deep-clean", "Intense Bathroom Deep Cleaning", "Hard-water stains, tile scrubbing, glass descaling", 699, "75 mins", bathroomImg),
          s("kitchen-deep-clean", "Complete Kitchen Deep Cleaning", "Cabinets, countertops, tiles, sink, degreasing", 1499, "3 hrs", kitchenImg),
          s("full-home-deep-clean", "Full Home Deep Clean", "Every room, top to bottom, with mechanized scrubbing", 3999, "6–8 hrs", homeHelpImg),
        ],
      },
      {
        title: "Sofa & carpet",
        services: [
          s("sofa-shampoo", "Fabric Sofa Shampooing", "Dry vacuuming, foam shampooing, mechanized drying", 599, "45 mins", sofaImg),
          s("carpet-shampoo", "Carpet Shampooing", "Deep shampoo and mechanized drying", 449, "45 mins", sofaImg),
        ],
      },
      {
        title: "Pest control",
        services: [
          s("cockroach-ant", "Cockroach & Ant Control", "2-visit spray and gel treatment, two weeks apart", 899, "45 mins", pestImg),
          s("termite-bedbug", "Termite & Bed Bugs Control", "Preventive or curative treatment", 1999, "2 hrs", pestImg),
        ],
      },
    ],
  },
  {
    slug: "instant-home-help",
    title: "On-Demand Home Help",
    shortTitle: "Instant Home Help",
    icon: "home",
    image: homeHelpImg,
    copy: `Trained household helpers at your doorstep in under ${BRAND.dispatchMinutes} minutes for daily chores.`,
    tags: ["Sweeping & Mopping", "Dishwashing", "Laundry & Folding", "Multi-Visit Value Packs"],
    cta: "Book Instant Help",
    groups: [
      {
        title: "Single visits",
        services: [
          s("instant-help-60", "Instant Home Help (60 Mins)", "On-demand sweeping, mopping, and dishwashing by a verified helper.", 149, "60 mins", homeHelpImg),
          s("sweep-mop-2h", "Sweeping & Mopping (2 hrs)", "Full-home floors, dusting of reachable surfaces", 279, "2 hrs", homeHelpImg),
          s("dishwashing", "Dishwashing", "Utensils washed, dried, and put away", 129, "45 mins", kitchenImg),
          s("laundry-folding", "Laundry & Folding", "Machine load, drying line-up, and neat folding", 199, "60 mins", homeHelpImg),
        ],
      },
      {
        title: "Value packs",
        services: [
          s("help-pack-5", "5-Visit Value Pack", "Five 60-minute visits, use within 30 days", 649, "5 × 60 mins", homeHelpImg),
          s("help-pack-10", "10-Visit Value Pack", "Ten 60-minute visits, use within 45 days", 1199, "10 × 60 mins", homeHelpImg),
        ],
      },
    ],
  },
  {
    slug: "electrician",
    title: "Electrical Services",
    shortTitle: "Electrician",
    icon: "zap",
    image: electricianImg,
    copy: "Certified electricians for everyday fixes, fixture upgrades, power backup, and EV chargers.",
    tags: ["Switches & Sockets", "Fans & Lights", "Wiring & MCB", "Inverter Setup", "CCTV & EV Plugs"],
    cta: "Book Electrician",
    groups: [
      {
        title: "Everyday fixes",
        services: [
          s("electrician-visit", "Electrician Diagnostic & Fix", "Switchboards, ceiling fans, MCB trips, or light fixture installation.", 99, "30 mins", electricianImg, "Visit from"),
          s("switch-socket", "Switch & Socket Replacement", "Per point, including testing", 79, "20 mins", electricianImg),
          s("fan-install", "Ceiling Fan Installation", "Mounting, wiring, and regulator check", 199, "45 mins", electricianImg),
          s("light-fixture", "Light Fixture Installation", "Tube lights, panels, chandeliers (up to 5 kg)", 149, "30 mins", electricianImg),
          s("mcb-wiring", "Wiring & MCB Repair", "Fault finding, MCB or fuse replacement", 199, "45 mins", electricianImg),
        ],
      },
      {
        title: "Upgrades",
        services: [
          s("inverter-setup", "Inverter Setup", "Inverter and battery installation with wiring", 499, "90 mins", electricianImg),
          s("cctv-install", "CCTV Camera Installation", "Per camera, mounting and cabling", 599, "60 mins", electricianImg),
          s("ev-plug", "EV Charging Plug Point", "Dedicated 15A point with MCB", 899, "2 hrs", electricianImg),
        ],
      },
    ],
  },
  {
    slug: "plumber",
    title: "Plumbing Services",
    shortTitle: "Plumber",
    icon: "droplet",
    image: plumberImg,
    copy: "Fast resolution for leaks, blockages, bathroom fittings, water tanks, and appliance lines.",
    tags: ["Tap & Shower Repair", "Toilet & Flush Systems", "Drain Unclogging", "Water Tanks & Motors"],
    cta: "Book Plumber",
    groups: [
      {
        title: "Repairs",
        services: [
          s("tap-drainage", "Tap & Drainage Repair", "Fix leaking taps, clogged wash basins, or running flush tanks fast.", 129, "30 mins", plumberImg),
          s("flush-repair", "Toilet & Flush Repair", "Flush tank, cistern, and seat fittings", 199, "45 mins", plumberImg),
          s("drain-unclog", "Drain Unclogging", "Kitchen, bathroom, or floor drain blockage", 249, "45 mins", plumberImg),
        ],
      },
      {
        title: "Tanks & motors",
        services: [
          s("tank-cleaning", "Water Tank Cleaning", "Overhead or underground tank, up to 1000 L", 699, "90 mins", plumberImg),
          s("motor-install", "Water Motor Installation", "Pump fitting, wiring, and test run", 499, "75 mins", plumberImg),
        ],
      },
    ],
  },
  {
    slug: "carpenter",
    title: "Carpentry & Furniture",
    shortTitle: "Carpenter & Furniture",
    icon: "ruler",
    image: carpenterImg,
    copy: "Precision woodwork, door hardware repairs, wall mounting, and flat-pack furniture assembly.",
    tags: ["Door & Lock Repair", "Cupboards & Drawers", "IKEA/Modular Assembly", "Blinds & Childproofing"],
    cta: "Book Carpenter",
    groups: [
      {
        title: "Repairs & fittings",
        services: [
          s("furniture-door", "Furniture Assembly & Door Repair", "Modular bed/wardrobe assembly, lock replacement, and wall-shelf mounting.", 249, "60 mins", carpenterImg),
          s("lock-replace", "Door Lock Replacement", "Main door or bedroom lock, customer-supplied or ours", 199, "30 mins", carpenterImg),
          s("cupboard-drawer", "Cupboard & Drawer Repair", "Hinges, channels, handles, and alignment", 179, "45 mins", carpenterImg),
        ],
      },
      {
        title: "Assembly & mounting",
        services: [
          s("modular-assembly", "IKEA / Modular Assembly", "Beds, wardrobes, and study units", 799, "2–3 hrs", carpenterImg),
          s("blinds-childproof", "Blinds & Childproofing", "Blinds, curtain rods, corner guards, and cabinet locks", 249, "45 mins", carpenterImg),
        ],
      },
    ],
  },
  {
    slug: "painting-wall-upgrades",
    title: "Painting & Wall Upgrades",
    shortTitle: "Painting & Wall Upgrades",
    icon: "roller",
    image: paintingImg,
    copy: "End-to-end interior/exterior painting, damp-proofing, and decorative wall panels with supervision.",
    tags: ["Full Home & Room Painting", "Waterproofing", "Tile Grouting", "Accent Wall Panels"],
    cta: "Book Free Survey",
    groups: [
      {
        title: "Start with a survey",
        services: [
          s("paint-survey", "Free Painting Site Survey", "On-site estimate with colour and material guidance", 0, "45 mins", paintingImg),
          s("accent-wall", "Single Accent Wall", "One wall, premium emulsion, includes putty touch-up", 2999, "1 day", paintingImg),
          s("tile-grouting", "Bathroom Tile Grouting", "Re-grouting and sealing of floor and wall joints", 999, "3 hrs", bathroomImg),
          s("damp-inspection", "Damp & Leak Inspection", "Moisture-meter check and waterproofing plan", 0, "45 mins", waterproofImg),
        ],
      },
    ],
  },
];

export const ALL_SERVICES: Service[] = CATEGORIES.flatMap((c) => c.groups.flatMap((g) => g.services));
export const SERVICE_BY_ID: Record<string, Service> = Object.fromEntries(ALL_SERVICES.map((sv) => [sv.id, sv]));

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function categoryOfService(id: string) {
  return CATEGORIES.find((c) => c.groups.some((g) => g.services.some((sv) => sv.id === id)));
}

export const MOST_BOOKED_IDS = [
  "ac-foam-jet",
  "bathroom-deep-clean",
  "instant-help-60",
  "sofa-shampoo",
  "electrician-visit",
  "tap-drainage",
  "furniture-door",
];

export const HERO_CHIPS = [
  { label: "AC Servicing", slug: "ac-appliance-repair" },
  { label: "Bathroom Deep Clean", slug: "cleaning-pest-control" },
  { label: "Electrician", slug: "electrician" },
  { label: "Plumber", slug: "plumber" },
  { label: "Instant Home Help", slug: "instant-home-help" },
];

export const HERO_TRUST = [
  { icon: "userCheck" as IconKey, title: "Verified Professionals", text: "Identity-checked and skill-tested technicians" },
  { icon: "rupee" as IconKey, title: "Upfront Pricing", text: "Standardized rate cards before work begins" },
  {
    icon: "shield" as IconKey,
    title: "Protected Service",
    text: `${BRAND.warrantyDays}-day warranty & ${BRAND.coverageAmount} damage cover`,
  },
];

export const STEPS = [
  { n: "1", title: "Pick Your Service & Slot", text: "Choose a fixed-price package, then select a date and time window that fits your day." },
  {
    n: "2",
    title: "Pay Securely & Get Your OTP",
    text: "Pay in advance by UPI, card or NetBanking. Your Start Work OTP and Project Manager details appear instantly.",
  },
  {
    n: "3",
    title: "Job Done, Backed by Warranty",
    text: `Share the OTP when work begins on site, and stay covered with our ${BRAND.warrantyDays}-day post-service guarantee.`,
  },
];

export const PILLARS = [
  {
    icon: "userCheck" as IconKey,
    title: "Background-Verified Pros",
    text: "Every technician passes identity verification and hands-on trade testing before taking a single booking.",
  },
  {
    icon: "rupee" as IconKey,
    title: "Standardized Rate Cards",
    text: "No haggling at your doorstep. Labor charges and replacement parts follow published, transparent pricing.",
  },
  {
    icon: "shield" as IconKey,
    title: "Post-Service Warranty & Protection",
    text: `Eligible repairs carry up to ${BRAND.warrantyDays} days of service warranty, plus up to ${BRAND.coverageAmount} protection against accidental service damage.`,
  },
  {
    icon: "clock" as IconKey,
    title: "On-Time Guarantee & Live Support",
    text: "Real-time booking updates, hassle-free rescheduling, and responsive support whenever you need help.",
  },
];

export const FAQS = [
  {
    q: "How does pricing work for appliance and home repairs?",
    a: "Standardized jobs (like AC servicing, deep cleaning, or tap replacement) show a fixed upfront price. For diagnostics and complex repairs, you pay a small inspection fee that is adjusted into your final bill once you approve the digital quote.",
  },
  {
    q: "Are spare parts included in the service price?",
    a: "Service charges cover inspection and labor. If replacement parts are required, our technician shares fixed rate-card pricing in the quote for your approval before installing anything.",
  },
  {
    q: "What if the same issue returns after the service?",
    a: `All eligible services include a ${BRAND.warrantyDays}-day post-service warranty. Raise a revisit request from your booking history and we will resolve the issue at no extra labor cost.`,
  },
  {
    q: "Are your technicians background-checked?",
    a: `Yes. Every professional on ${BRAND.name} completes government ID verification, reference checks, and practical skill assessments before onboarding.`,
  },
  {
    q: "Can I reschedule or cancel my booking?",
    a: `Yes. You can reschedule or cancel directly from your account up to ${BRAND.cancellationWindow} before the scheduled slot with zero penalty.`,
  },
  {
    q: "Do you offer salon, spa, or product sales?",
    a: `No. ${BRAND.name} is built exclusively for home maintenance, repairs, cleaning, pest control, daily chores, and wall upgrades — so every process and technician focuses 100% on your home.`,
  },
];

export const AREAS = ["Kolkata", "Salt Lake", "New Town", "Howrah", "Siliguri", "Durgapur", "Asansol"];
export const SLOTS = ["9 – 11 AM", "11 AM – 1 PM", "2 – 4 PM", "4 – 6 PM"];

export const PROJECT_TYPES = [
  "Large Building Cleaning",
  "Full Renovation",
  "Waterproofing",
  "Full Home Painting",
  "Appliance Repair Visit",
  "Other",
];

export const BIG_JOBS = [
  { icon: "home" as IconKey, title: "Large Building Cleaning", text: "Deep cleaning for large homes, apartment blocks and commercial spaces.", image: bathroomImg },
  { icon: "ruler" as IconKey, title: "Full Renovation", text: "Carpentry, wall work and finishing managed end to end by one supervisor.", image: carpenterImg },
  { icon: "droplet" as IconKey, title: "Waterproofing", text: "Damp-proofing for rooms, ceilings, bathrooms and terraces.", image: waterproofImg },
  { icon: "roller" as IconKey, title: "Painting & Wall Upgrades", text: "Full-home painting and accent walls, with a free site survey first.", image: paintingImg },
];

export function formatPrice(n: number) {
  return n === 0 ? "Free" : `₹${n.toLocaleString("en-IN")}`;
}
