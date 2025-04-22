'use client';

import { generateUploadButton, generateUploadDropzone } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

interface UploadThingProviderProps {
  children: React.ReactNode;
}

export function UploadThingProvider({ children }: UploadThingProviderProps) {
  return <>{children}</>;
} 