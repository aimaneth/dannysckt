'use client';

import { UploadDropzone } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';

interface UploadThingProps {
  onClientUploadComplete?: () => void;
  onUploadError?: (error: Error) => void;
}

export function UploadThing({ onClientUploadComplete, onUploadError }: UploadThingProps) {
  return (
    <UploadDropzone<OurFileRouter, "imageUploader">
      endpoint="imageUploader"
      onClientUploadComplete={onClientUploadComplete}
      onUploadError={onUploadError}
    />
  );
} 