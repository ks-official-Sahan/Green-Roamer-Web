"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Heart, CheckCircle, Loader2 } from "lucide-react"

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  message: string
}

export function DonationModal({ isOpen, onClose, amount, message }: DonationModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const { toast } = useToast()

  const handleDonate = async () => {
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      setIsComplete(true)

      toast({
        title: "Thank You! 🎉",
        description: `Your donation of $${amount} has been processed successfully.`,
      })
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClose = () => {
    setIsComplete(false)
    setIsProcessing(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md glass-effect">
        <DialogHeader>
          <DialogTitle className="text-center">{isComplete ? "Thank You!" : "Confirm Donation"}</DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-green-500" />
              </motion.div>

              <h3 className="text-2xl font-bold mb-4">Donation Successful!</h3>
              <p className="text-muted-foreground mb-6">
                Thank you for supporting Green Roamer with your ${amount} donation. Your contribution helps us continue
                our adventures!
              </p>

              <Button onClick={handleClose} className="w-full">
                Close
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Donate ${amount}</h3>
                <p className="text-muted-foreground">Your support means the world to us!</p>
              </div>

              {message && (
                <div className="p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
                  <h4 className="font-medium mb-2">Your Message:</h4>
                  <p className="text-sm text-muted-foreground">{message}</p>
                </div>
              )}

              <div className="space-y-3">
                <Button onClick={handleDonate} disabled={isProcessing} className="w-full h-12 text-base font-medium">
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 mr-2" />
                      Confirm Donation
                    </>
                  )}
                </Button>

                <Button variant="outline" onClick={handleClose} disabled={isProcessing} className="w-full">
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
