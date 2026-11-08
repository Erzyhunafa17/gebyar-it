// src/app/lab/csn/page.tsx
// Computing System & Network — NCC
// Accent: Sky Blue #70b8ff

import type { Metadata } from 'next';
import LabPageClient from '@/components/lab/LabPageClient';
import { getLabById } from '@/data/labsData';

export const metadata: Metadata = {
  title: 'CSN — Computing System & Network',
  description:
    'Laboratorium Computing System & Network (NCC) — infrastruktur IT, cloud, keamanan jaringan, dan IoT di Program Studi Teknik Informatika UIKA Bogor.',
};

export default function CSNLabPage() {
  const lab = getLabById('csn')!;
  return <LabPageClient lab={lab} />;
}
