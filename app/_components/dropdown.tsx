'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function UserMenu() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleCoverLetterClick = () => {
    router.push("/ai-cover-letter")
  }
  const handleQuizClick = () => {
    router.push("/quiz")
  }
  if (status === "loading") return null // prevent mismatch

  return (
    <div>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="underline">
              {session.user?.name}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleCoverLetterClick}>
              Cover Letter
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleQuizClick}>
              Quiz
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="text-white font-bold">
          <button onClick={() => signIn()}>
            SignIn
          </button>
        </div>
      )}
    </div>
  )
}
