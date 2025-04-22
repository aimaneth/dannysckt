import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Check Your Email | Danny's CKT",
  description: 'Check your email for a sign in link',
};

export default function VerifyRequestPage() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Check your email
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            A sign in link has been sent to your email address.
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Click the link in the email to sign in.
          </p>
        </div>
      </div>
    </div>
  );
} 