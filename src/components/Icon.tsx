import type { SVGProps } from "react";

const P: Record<string, React.ReactNode> = {
  phone: <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" fill="currentColor" stroke="none" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="m3.5 6 8.5 7 8.5-7" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.6-3.6" /></>,
  menu: <path d="M4 6.5h16M4 12h16M4 17.5h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevron: <path d="m9 6 6 6-6 6" />,
  down: <path d="m6 9 6 6 6-6" />,
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="1.5" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1.2-4 4.3-6 8-6s6.8 2 8 6" /></>,
  list: <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />,
  scale: <><path d="M12 3v18M7 21h10M5 7h14M12 5 5 7M12 5l7 2" /><path d="M5 7 2 14a3.2 3.2 0 0 0 6 0zM19 7l-3 7a3.2 3.2 0 0 0 6 0z" /></>,
  home: <path d="M3 11.5 12 4l9 7.5M5.5 10v10h13V10M10 20v-5h4v5" />,
  family: <><circle cx="8" cy="7" r="2.6" /><circle cx="16.5" cy="8.5" r="2.2" /><path d="M3.5 20c.6-3.6 2.4-5.6 4.5-5.6s3.9 2 4.5 5.6M13 20c.4-2.8 1.8-4.3 3.5-4.3s3.1 1.5 3.5 4.3" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="1.5" /><path d="M9 7V5h6v2M3 12.5h18" /></>,
  doc: <><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M10 13h6M10 17h6" /></>,
  gavel: <><path d="m14 4 6 6M11 7l6 6M12.5 5.5l-5 5 4 4 5-5M9.5 12.5 3 19l2 2 6.5-6.5" /></>,
  facebook: <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v1.9H8V12h2.6v9.5H14V12h2.7l.4-3.5z" fill="currentColor" stroke="none" />,
  youtube: <><rect x="2.5" y="5.5" width="19" height="13" rx="3.5" fill="currentColor" stroke="none" /><path d="m10 9 5 3-5 3z" fill="#fff" stroke="none" /></>,
  zalo: <path d="M12 3C6.5 3 2.5 6.6 2.5 11c0 2.4 1.2 4.6 3.2 6.1L5 21l4-2.1c.9.2 2 .3 3 .3 5.5 0 9.5-3.6 9.5-8.1S17.5 3 12 3z" />,
  link: <><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" /><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" /></>,
  eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  shield: <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z" />,
};

export type IconName = keyof typeof P;

export function Icon({ name, size = 20, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {P[name]}
    </svg>
  );
}
