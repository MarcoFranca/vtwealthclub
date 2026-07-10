import {
  ShieldCheck,
  HeartPulse,
  Car,
  Home,
  Plane,
  Smartphone,
  Briefcase,
  GraduationCap,
  Users,
  FileCheck,
  Truck,
  Landmark,
  PiggyBank,
  Building2,
  Stethoscope,
  Wallet,
  CalendarClock,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  HeartPulse,
  Car,
  Home,
  Plane,
  Smartphone,
  Briefcase,
  GraduationCap,
  Users,
  FileCheck,
  Truck,
  Landmark,
  PiggyBank,
  Building2,
  Stethoscope,
  Wallet,
  CalendarClock,
  LifeBuoy,
};

export function resolveIcon(name?: string): LucideIcon {
  if (name && iconMap[name]) return iconMap[name];
  return ShieldCheck;
}
