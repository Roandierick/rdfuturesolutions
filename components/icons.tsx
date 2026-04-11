import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ className, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5", className)}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </BaseIcon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </BaseIcon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </BaseIcon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m5 12 4 4L19 6" />
    </BaseIcon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m6 9 6 6 6-6" />
    </BaseIcon>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 4 5.8 4 9s-1.5 6.4-4 9c-2.5-2.6-4-5.8-4-9s1.5-6.4 4-9Z" />
    </BaseIcon>
  );
}

export function MobileIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 17h2" />
    </BaseIcon>
  );
}

export function SoftwareIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M7 20h10" />
      <path d="M8 8h8" />
      <path d="M8 12h4" />
    </BaseIcon>
  );
}

export function LocationIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 21s6-5.6 6-11a6 6 0 1 0-12 0c0 5.4 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </BaseIcon>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </BaseIcon>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m9 11 3 3 3-3" />
      <path d="M5 11 3 9l3-3 3 3" />
      <path d="m19 11 2-2-3-3-3 3" />
      <path d="M6 6h4l2 2 2-2h4" />
      <path d="m7 12-2 2 3 3 2-2" />
      <path d="m17 12 2 2-3 3-2-2" />
    </BaseIcon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </BaseIcon>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3 19.3 19.3 0 0 1-6-6A19.7 19.7 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.4 2.8a2 2 0 0 1-.6 1.8l-2 2a16 16 0 0 0 6 6l2-2a2 2 0 0 1 1.8-.6l2.8.4A2 2 0 0 1 22 16.9Z" />
    </BaseIcon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </BaseIcon>
  );
}

export function AnalyticsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 20V9" />
      <path d="M12 20V4" />
      <path d="M19 20v-7" />
    </BaseIcon>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3 5 6v5c0 5 3 8.3 7 10 4-1.7 7-5 7-10V6l-7-3Z" />
      <path d="m9.5 12 1.7 1.7 3.3-3.7" />
    </BaseIcon>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
      <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
      <path d="m5 16 .8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8L5 16Z" />
    </BaseIcon>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 10v6" />
      <path d="M8 8h.01" />
      <path d="M12 16v-3a2 2 0 0 1 4 0v3" />
      <path d="M12 10v6" />
    </BaseIcon>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </BaseIcon>
  );
}
