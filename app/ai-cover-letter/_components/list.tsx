"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';

export default function CoverLetterCard({ id, company, title, createdOn, name }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`ai-cover-letter/${id}`);
  }

  return (
    <div className="w-full bg-slate-800 border border-slate-700 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-2">
        
        {/* Left section: Name and Title */}
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-white">{name}</span>
          <span className="text-sm text-slate-400">{title}</span>
        </div>

        {/* Middle section: Company */}
        <div className="text-sm text-slate-300">{company}</div>

        {/* Right section: Date and Button */}
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <span className="text-sm text-slate-400">{createdOn.toISOString().split("T")[0]}</span>
          <Button 
            variant="outline" 
            onClick={handleClick} 
            className="bg-white text-slate-900 hover:bg-slate-100"
          >
            Open
          </Button>
        </div>
      </div>
    </div>
  )
}

interface Props {
  id: string,
  company: string,
  title: string,
  createdOn: Date,
  name: string
}
