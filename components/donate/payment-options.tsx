"use client"

import { motion } from "framer-motion"
import { CreditCard, Smartphone, Bitcoin } from "lucide-react"

const paymentMethods = [
  {
    icon: CreditCard,
    name: "Credit Card",
    description: "Visa, Mastercard, American Express",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Smartphone,
    name: "PayPal",
    description: "Secure payment with PayPal",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: Bitcoin,
    name: "Cryptocurrency",
    description: "Bitcoin, Ethereum, and more",
    color: "from-orange-500 to-orange-600",
  },
]

export function PaymentOptions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-card p-8"
    >
      <h3 className="text-2xl font-bold text-center mb-6">Payment Methods</h3>
      <p className="text-center text-muted-foreground mb-8">
        Choose your preferred payment method. All transactions are secure and encrypted.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {paymentMethods.map((method, index) => (
          <motion.div
            key={method.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="text-center p-6 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:scale-105"
          >
            <div
              className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center`}
            >
              <method.icon className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold mb-2">{method.name}</h4>
            <p className="text-sm text-muted-foreground">{method.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          🔒 All payments are processed securely. We never store your payment information.
        </p>
      </div>
    </motion.div>
  )
}
