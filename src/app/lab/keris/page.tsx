// src/app/lab/keris/page.tsx
// Knowledge Engineering and Reliable Intelligent Systems
// Accent: Amber #ffca16

import type { Metadata } from 'next';
import LabPageClient from '@/components/lab/LabPageClient';
import { getLabById } from '@/data/labsData';

export const metadata: Metadata = {
  title: 'KERIS — Knowledge Engineering & Intelligent Systems',
  description:
    'Laboratorium KERIS — AI, Machine Learning, Data Mining, dan sistem cerdas di Program Studi Teknik Informatika UIKA Bogor.',
};

export default function KERISLabPage() {
  const lab = getLabById('keris')!;
  return <LabPageClient lab={lab} />;
}
