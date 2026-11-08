// src/app/lab/se/page.tsx
// Software Engineering / RPL — InnSoft / RISE Center
// Accent: Iris Violet #9281f7

import type { Metadata } from 'next';
import LabPageClient from '@/components/lab/LabPageClient';
import { getLabById } from '@/data/labsData';

export const metadata: Metadata = {
  title: 'SE / RPL — Software Engineering',
  description:
    'Laboratorium Software Engineering (InnSoft / RISE Center) — pengembangan web, mobile, dan kecerdasan buatan di Program Studi Teknik Informatika UIKA Bogor.',
};

export default function SELabPage() {
  const lab = getLabById('se')!;
  return <LabPageClient lab={lab} />;
}
