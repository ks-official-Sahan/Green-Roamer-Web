"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NewsletterModal } from "./newsletter-modal";
import { Mail, Sparkles } from "lucide-react";

interface TriggerState {
  hasShownThisSession: boolean;
  scrollPercentage: number;
  timeOnPage: number;
  hasTriggeredExitIntent: boolean;
}

export function NewsletterTrigger() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [triggerState, setTriggerState] = useState<TriggerState>({
    hasShownThisSession: false,
    scrollPercentage: 0,
    timeOnPage: 0,
    hasTriggeredExitIntent: false,
  });
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Check if user has already subscribed
  useEffect(() => {
    if (typeof window !== "undefined") {
      const subscribed =
        localStorage.getItem("newsletter-subscribed") === "true";
      setIsSubscribed(subscribed);
      setHydrated(true);
    }
  }, []);

  // Check if modal should be shown automatically
  const shouldAutoTrigger = useCallback(() => {
    if (isSubscribed) return false;
    if (triggerState.hasShownThisSession) return false;

    return (
      triggerState.scrollPercentage >= 50 || // 50% scroll threshold
      triggerState.timeOnPage >= 20000 || // 20 seconds delay
      triggerState.hasTriggeredExitIntent // Exit intent
    );
  }, [triggerState, isSubscribed]);

  // Track scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage =
        docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setTriggerState((prev) => ({ ...prev, scrollPercentage }));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track time on page
  useEffect(() => {
    const startTime = Date.now();

    const updateTimeOnPage = () => {
      const timeOnPage = Date.now() - startTime;
      setTriggerState((prev) => ({ ...prev, timeOnPage }));
    };

    const interval = setInterval(updateTimeOnPage, 1000);
    return () => clearInterval(interval);
  }, []);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger on desktop and when mouse leaves from the top
      if (e.clientY <= 0 && window.innerWidth > 768) {
        setTriggerState((prev) => ({
          ...prev,
          hasTriggeredExitIntent: true,
        }));
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  // Auto-trigger modal based on conditions
  useEffect(() => {
    if (shouldAutoTrigger() && !isModalOpen) {
      setIsModalOpen(true);
      setTriggerState((prev) => ({ ...prev, hasShownThisSession: true }));
    }
  }, [shouldAutoTrigger, isModalOpen]);

  // Show floating button after some time if not subscribed
  useEffect(() => {
    if (isSubscribed) return;

    const timer = setTimeout(() => {
      setShowFloatingButton(true);
    }, 30000); // Show floating button after 30 seconds

    return () => clearTimeout(timer);
  }, [isSubscribed]);

  // Handle manual trigger
  const handleManualTrigger = () => {
    setIsModalOpen(true);
    setTriggerState((prev) => ({ ...prev, hasShownThisSession: true }));
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Handle successful subscription
  const handleSubscriptionSuccess = () => {
    setShowFloatingButton(false);
  };

  // Don't render anything if user is already subscribed
  if (!hydrated || isSubscribed) return null;

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {showFloatingButton && !isModalOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <motion.div
              animate={{
                y: [-2, 2, -2],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Button
                onClick={handleManualTrigger}
                size="lg"
                className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                aria-label="Subscribe to newsletter"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="relative"
                >
                  <Mail className="w-6 h-6 text-white" />
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                  </motion.div>
                </motion.div>
              </Button>
            </motion.div>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap backdrop-blur-sm"
            >
              Get travel updates! 🌍
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-black/80" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Newsletter Modal */}
      <NewsletterModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleSubscriptionSuccess}
      />

      {/* Debug Info (Development Only) */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 left-4 bg-black/80 text-white text-xs p-2 rounded font-mono z-50">
          <div>Scroll: {triggerState.scrollPercentage.toFixed(1)}%</div>
          <div>Time: {Math.floor(triggerState.timeOnPage / 1000)}s</div>
          <div>
            Exit Intent: {triggerState.hasTriggeredExitIntent ? "Yes" : "No"}
          </div>
          <div>Shown: {triggerState.hasShownThisSession ? "Yes" : "No"}</div>
          <div>Subscribed: {isSubscribed ? "Yes" : "No"}</div>
        </div>
      )}
    </>
  );
}
