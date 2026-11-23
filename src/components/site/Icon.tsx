import {
  AirVent,
  Clock,
  Droplet,
  Home,
  IndianRupee,
  PaintRoller,
  Ruler,
  ShieldCheck,
  Sparkles,
  Upload,
  UserCheck,
  Zap,
  type LucideProps,
} from "lucide-react";

import type { IconKey } from "@/lib/catalog";

const MAP = {
  wind: AirVent,
  sparkles: Sparkles,
  home: Home,
  zap: Zap,
  droplet: Droplet,
  ruler: Ruler,
  roller: PaintRoller,
  upload: Upload,
  shield: ShieldCheck,
  userCheck: UserCheck,
  rupee: IndianRupee,
  clock: Clock,
} satisfies Record<IconKey, unknown>;

export function Icon({ name, ...props }: { name: IconKey } & LucideProps) {
  const C = MAP[name];
  return <C aria-hidden="true" {...props} />;
}
