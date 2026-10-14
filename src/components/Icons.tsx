import type { SVGProps } from "react";

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.45 9.43m8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.7l6.1-1.6a11.3 11.3 0 0 0 5.37 1.37h.01c6.26 0 11.36-5.1 11.37-11.37a11.3 11.3 0 0 0-3.34-8.06" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.26-.96 2.32-2.04 3.04l3.3 2.56c1.92-1.77 3.03-4.38 3.03-7.48 0-.72-.06-1.41-.18-2.07H12z" />
      <path fill="#34A853" d="M5.84 14.3 5.1 14.87l-2.64 2.05A10 10 0 0 0 12 22.5c2.7 0 4.96-.9 6.62-2.43l-3.3-2.56c-.9.6-2.06.97-3.32.97-2.6 0-4.81-1.76-5.6-4.12z" />
      <path fill="#4A90E2" d="M2.46 7.08A9.9 9.9 0 0 0 1.5 12c0 1.6.38 3.12 1.06 4.47l3.38-2.62A5.9 5.9 0 0 1 5.63 12c0-.65.11-1.28.31-1.87z" />
      <path fill="#FBBC05" d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.86-2.86A9.6 9.6 0 0 0 12 1.5 10 10 0 0 0 2.46 7.08l3.38 2.62c.79-2.36 3-4.12 5.6-4.12z" />
    </svg>
  );
}

/** Navalha aberta — usada como separador nas faixas */
export function RazorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 16" fill="none" aria-hidden {...props}>
      <path d="M2 9.5 26 4.5c2.2-.45 3.6.3 3.6 1.6v1.6c0 1-.8 1.8-1.8 1.8H2z" fill="currentColor" opacity=".9" />
      <path d="M29.6 7.2h14.2c1.2 0 2.2 1 2.2 2.2s-1 2.2-2.2 2.2H30.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="31" cy="7.4" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function ScissorsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden {...props}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
    </svg>
  );
}
