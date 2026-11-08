// src/app/layout.tsx
// Root layout — fonts (self-hosted via next/font/local), metadata, Lenis smooth scroll

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CommandPalette from '@/components/ui/CommandPalette';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

/* ── Self-hosted fonts (downloaded to /public/fonts/) ── */
/* Using next/font/local because sandbox has no outbound network at build time */

const playfair = localFont({
  src: [
    { path: '../../public/fonts/PlayfairDisplay-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/PlayfairDisplay-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = localFont({
  src: [
    { path: '../../public/fonts/Inter-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Inter-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/Inter-SemiBold.ttf', weight: '600', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = localFont({
  src: [
    { path: '../../public/fonts/JetBrainsMono-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/JetBrainsMono-Medium.ttf', weight: '500', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Laboratorium Peminatan TI UIKA — Gebyar IT 2026',
    template: '%s | TI.UIKA Labs',
  },
  description:
    'Website resmi laboratorium peminatan Program Studi Teknik Informatika Universitas Ibn Khaldun Bogor. SE/RPL, CSN, GIT, dan KERIS.',
  keywords: [
    'Teknik Informatika',
    'UIKA Bogor',
    'Laboratorium',
    'Software Engineering',
    'GIS',
    'AI',
    'Network',
    'Gebyar IT 2026',
  ],
  authors: [{ name: 'Prodi Teknik Informatika UIKA Bogor' }],
  creator: 'TI UIKA Bogor',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* lang="id" — Indonesian content, accessibility requirement */
    <html
      lang="id"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  if (saved === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased relative" style={{ backgroundColor: 'var(--bg-canvas)', color: 'var(--text-body)' }}>
        {/* Global subtle dot-matrix background with fading edge mask */}
        <div
          aria-hidden="true"
          className="bg-dot-matrix fixed inset-0 pointer-events-none z-0"
        />

        <ThemeProvider>
          <SmoothScrollProvider>
            {/* Skip to content — keyboard accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#9281f7] focus:text-white focus:rounded-md"
            >
              Langsung ke konten
            </a>

            <Navbar />
            <CommandPalette />

            <main id="main-content" role="main">
              {children}
            </main>

            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
