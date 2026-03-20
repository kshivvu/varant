import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
      <SignUp />
    </main>
  );
}