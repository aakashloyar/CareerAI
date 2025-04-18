'use client'

import { useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EmailOtpDialog() {
  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleSendOtp = async () => {
    try {
      const res = await axios.post('/api/auth/otp/send', { email })
      if (res.status === 200) {
        setStep('otp') // move to OTP input dialog
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post('/api/auth/otp/verify', { email, otp })
      if (res.status === 200) {
        alert('OTP Verified ✅')
        setDialogOpen(false) // close dialog on success
        setStep('email') // reset for next time
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Verify Your Email</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {step === 'email' ? 'Verify Your Email' : 'Enter OTP'}
            </DialogTitle>
            <DialogDescription>
              {step === 'email' ? 'We’ll send a code to your email.' : 'Enter the OTP sent to your email.'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {step === 'email' ? (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="col-span-3"
                />
              </div>
            ) : (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="otp" className="text-right">
                  OTP
                </Label>
                <Input
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="col-span-3"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            {step === 'email' ? (
              <Button onClick={handleSendOtp}>Send OTP</Button>
            ) : (
              <Button onClick={handleVerifyOtp}>Verify OTP</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
