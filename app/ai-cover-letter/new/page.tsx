"use client"

import { useRouter } from 'next/navigation';
import Coverletterform from '@/app/ai-cover-letter/_components/form'
import { Button } from '@/components/ui/button'

export default function CoverLetterPage() {
  const router = useRouter();

  const backClick = () => {
    router.push('/ai-cover-letter');
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center py-16 px-4">
      
      {/* Back button */}
      <div className="self-start mb-6">
        <Button variant="link" onClick={backClick} className="text-white hover:text-slate-300">
          ⬅️ Back to cover letters
        </Button>
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Create Cover Letters</h1>
        <p className="text-slate-300 text-lg">
          Generate a tailored cover letter for your job application effortlessly
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-slate-800 shadow-lg rounded-2xl p-8 w-full max-w-3xl">
        <Coverletterform />
      </div>

      {/* Footer / optional extra info */}
      <div className="text-slate-400 text-sm mt-6 max-w-3xl text-center">
        Your AI-generated cover letters are private and secure. Use them to land your dream job!
      </div>
    </div>
  );
}
