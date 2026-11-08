// src/app/lab/git/page.tsx
// Geospatial Information Technology
// Accent: Pulse Green #3ad389

import type { Metadata } from 'next';
import LabPageClient from '@/components/lab/LabPageClient';
import { getLabById } from '@/data/labsData';

export const metadata: Metadata = {
  title: 'GIT — Geospatial Information Technology',
  description:
    'Laboratorium Geospatial Information Technology — GIS, remote sensing, drone, dan GeoAI di Program Studi Teknik Informatika UIKA Bogor.',
};

export default function GITLabPage() {
  const lab = getLabById('git')!;
  return <LabPageClient lab={lab} />;
}
