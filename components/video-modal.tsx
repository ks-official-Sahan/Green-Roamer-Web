"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  ThumbsUp,
  Eye,
  MessageSquare,
  Copy,
  Calendar,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatViewCount, formatDuration } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { getCountryFromLocation } from "@/lib/destinations-utils";
import type { VideoData } from "@/data/green-roamer-data";

interface VideoModalProps {
  video: VideoData;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const initialFocusRef = useRef<HTMLButtonElement>(null);
  const country = video.locationHints
    ? getCountryFromLocation(video.locationHints)
    : null;

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Focus trap
  useEffect(() => {
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    if (focusableElements?.length) {
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Focus the close button by default
      initialFocusRef.current?.focus();

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener("keydown", handleTabKey);
      return () => document.removeEventListener("keydown", handleTabKey);
    }
  }, [isLoading]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(video.url);
    toast({
      title: "Link copied",
      description: "Video link copied to clipboard",
    });
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="glass-effect rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
        >
          <div className="flex justify-between items-center p-4 border-b border-white/10 dark:border-white/5">
            <h2
              id="video-modal-title"
              className="text-lg font-semibold truncate pr-4"
            >
              {video.title}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="shrink-0 hover:bg-white/10 focus-visible"
              ref={initialFocusRef}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <div className="aspect-video w-full bg-black relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Skeleton className="w-full h-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                </div>
              </div>
            )}
            <iframe
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              onLoad={handleIframeLoad}
              style={{ opacity: isLoading ? 0 : 1 }}
            ></iframe>
          </div>

          <div className="p-6 overflow-y-auto max-h-[30vh]">
            <div className="flex flex-wrap gap-2 mb-4">
              {video.tags?.slice(0, 5).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {country && (
                <Badge
                  variant="outline"
                  className="text-xs flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3" />
                  {country}
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>{formatViewCount(video.viewCount)} views</span>
              </div>
              {video.likeCount && (
                <div className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{formatViewCount(video.likeCount)} likes</span>
                </div>
              )}
              {video.commentCount && (
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>{formatViewCount(video.commentCount)} comments</span>
                </div>
              )}
              {video.uploadDate && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                </div>
              )}
              {video.durationSeconds && (
                <div className="flex items-center">
                  <span>{formatDuration(video.durationSeconds)}</span>
                </div>
              )}
            </div>

            <p className="text-sm line-clamp-3 mb-6">
              {video.description?.slice(0, 300)}...
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="default" size="sm" className="gap-2">
                <a href={video.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Watch on YouTube
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleCopyLink}
              >
                <Copy className="h-4 w-4" />
                Copy Link
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
