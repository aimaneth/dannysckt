'use client';

import { UploadDropzone } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';

interface UploadButtonProps {
  onUploadComplete: (url: string) => void;
  onUploadError?: (error: Error) => void;
}

export function UploadButton({ onUploadComplete, onUploadError }: UploadButtonProps) {
  return (
    <UploadDropzone<OurFileRouter, "imageUploader">
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        if (res?.[0]) {
          onUploadComplete(res[0].url);
        }
      }}
      onUploadError={onUploadError}
    />
  );
} 