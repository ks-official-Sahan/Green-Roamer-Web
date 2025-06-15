"use client";

import type React from "react";

import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Play,
  Eye,
  Calendar,
  ArrowRight,
  Mail,
  MapPin,
  Users,
  Youtube,
  Instagram,
  Facebook,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
//import { Navbar } from "@/components/navbar";
import { ErrorBoundary } from "@/components/error-boundary";
import { EmptyState } from "@/components/empty-state";
import { ScrollCue } from "@/components/scroll-cue";
import { NewsletterSkeleton } from "@/components/newsletter-skeleton";
import { OptimizedImage } from "@/components/optimized-image";
import { greenRoamerData } from "@/data/green-roamer-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Lazy load heavy components
const AnimatedCanvas = lazy(() =>
  import("@/components/animated-canvas").then((module) => ({
    default: module.AnimatedCanvas,
  }))
);

// Register GSAP plugins
gsap.registerPlugin(TextPlugin, ScrollTrigger);

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    };

    initLenis();
  }, []);

  // Hero animations
  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline({ delay: 0.5 });

    // Logo floating animation
    if (logoRef.current) {
      gsap.set(logoRef.current, { y: 20, opacity: 0 });
      tl.to(logoRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      });

      // Continuous floating
      gsap.to(logoRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 1,
      });
    }

    // Split text animation for title
    if (titleRef.current) {
      const text = titleRef.current.textContent || "";
      const chars = text.split("");
      titleRef.current.innerHTML = chars
        .map(
          (char) =>
            `<span class="inline-block">${
              char === " " ? "&nbsp;" : char
            }</span>`
        )
        .join("");

      const spans = titleRef.current.querySelectorAll("span");
      gsap.set(spans, { y: 100, opacity: 0 });
      tl.to(
        spans,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: "power3.out",
        },
        "-=0.5"
      );
    }

    // Subtitle staggered fade-in
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { y: 30, opacity: 0 });
      tl.to(
        subtitleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }

    setIsLoaded(true);
  }, [isLoaded]);

  // Get video data with error handling
  const getVideoData = () => {
    try {
      if (!greenRoamerData?.videos?.length) {
        return { featuredVideo: null, secondaryVideos: [] };
      }

      const sortedVideos = [...greenRoamerData.videos].sort(
        (a, b) => Number.parseInt(b.viewCount) - Number.parseInt(a.viewCount)
      );

      return {
        featuredVideo: sortedVideos[0] || null,
        secondaryVideos: sortedVideos.slice(1, 3) || [],
      };
    } catch (error) {
      console.error("Error processing video data:", error);
      return { featuredVideo: null, secondaryVideos: [] };
    }
  };

  const { featuredVideo, secondaryVideos } = getVideoData();

  const stats = [
    {
      icon: Eye,
      label: "Total Views",
      value: greenRoamerData.channelInfo.stats.viewCount,
    },
    {
      icon: Users,
      label: "Subscribers",
      value: greenRoamerData.channelInfo.stats.subscriberCount,
    },
    {
      icon: Play,
      label: "Videos",
      value: greenRoamerData.channelInfo.stats.videoCount,
    },
    { icon: MapPin, label: "Destinations", value: "50+" },
  ];

  const formatCount = (count: string) => {
    const num = Number.parseInt(count);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return count;
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Recent";
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <ErrorBoundary>
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          aria-labelledby="hero-title"
        >
          {/* Animated Background */}
          <Suspense
            fallback={
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
            }
          >
            <AnimatedCanvas className="opacity-70 dark:opacity-40" />
          </Suspense>

          {/* Content */}
          {/* <div className="container-width">
            <div className="grid lg:grid-cols-2 gap-12 items-center"> */}
          <div className="relative z-10 max-w-5xl mx-auto p-6 md:px-10 text-center space-y-10">
            <Badge
              variant="secondary"
              className="animate-pulse-glow text-base -mt-10"
            >
              🌿 Green Roamer
            </Badge>

            {/* Logo */}
            <motion.div
              ref={logoRef}
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary to-accent p-1">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <Avatar className="w-full h-full">
                    <AvatarImage
                      src={greenRoamerData.channelInfo.profileImage}
                      alt={greenRoamerData.channelInfo.title}
                    />
                    <AvatarFallback className="text-3xl font-bold text-gradient">
                      GR
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <h1
              id="hero-title"
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold h-auto text-gradient leading-tight"
            >
              Unveiling Natural Beauty
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Journey through Sri Lanka and Europe's most breathtaking
              landscapes. Discover hidden gems, pristine nature, and rich
              cultural heritage.
            </p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <Button
                size="lg"
                className="text-lg px-8 py-4 animate-pulse-glow"
                asChild
              >
                <Link href="/videos">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Adventures
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4"
                asChild
              >
                <Link href="/explore">
                  Explore Destinations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

            {/* Stats Section */}
            {/* <StatsSection stats={stats} formatCount={formatCount} /> */}
          </div>

          {/* <AnimatedMainVideo
                featuredVideo={featuredVideo}
                isContentReady={isLoaded}
              />
            </div>
          </div> */}

          {/* Scroll Cue */}
          <ScrollCue />

          <hr />
        </section>
      </ErrorBoundary>

      {/* Stats Section */}
      <section data-scroll-target>
        <StatsSection stats={stats} formatCount={formatCount} />
      </section>

      {/* Featured Content Section */}
      <ErrorBoundary
        fallback={
          <EmptyState
            icon={<Play className="h-12 w-12" />}
            title="Featured content unavailable"
          />
        }
      >
        <section
          className="py-20 px-6 md:px-10"
          aria-labelledby="featured-title"
          // data-scroll-target
        >
          <div className="max-w-5xl mx-auto space-y-10">
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2
                id="featured-title"
                className="text-3xl md:text-5xl font-bold text-gradient"
              >
                Featured Adventures
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience our most captivating journeys that have inspired
                thousands of viewers
              </p>
            </motion.div>

            {/* Featured Video */}
            {featuredVideo ? (
              <FeaturedVideoCard
                video={featuredVideo}
                formatCount={formatCount}
                formatDate={formatDate}
              />
            ) : (
              <EmptyState
                title="No featured video available"
                description="Check back soon for our latest adventures"
                icon={<Play className="h-12 w-12" />}
                action={{ label: "Browse All Videos", href: "/videos" }}
              />
            )}

            {/* Secondary Videos */}
            {secondaryVideos.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8">
                {secondaryVideos.map((video, index) => (
                  <SecondaryVideoCard
                    key={video.videoId}
                    video={video}
                    index={index}
                    formatCount={formatCount}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </ErrorBoundary>

      {/* Newsletter CTA Section */}
      <ErrorBoundary
        fallback={
          <div className="py-20 text-center text-muted-foreground">
            Newsletter signup temporarily unavailable
          </div>
        }
      >
        <NewsletterSection />
      </ErrorBoundary>

      {/* Footer */}
      <ErrorBoundary
        fallback={
          <div className="py-20 text-center text-muted-foreground">
            Footer temporarily unavailable
          </div>
        }
      >
        <Footer />
      </ErrorBoundary>
    </div>
  );
}

export const StatsSection = ({
  stats,
  formatCount,
}: {
  stats: any[];
  formatCount: (count: string) => string;
}) => {
  return (
    <ErrorBoundary
      fallback={
        <EmptyState
          icon={<Play className="h-12 w-12" />}
          title="Channel stats unavailable"
        />
      }
    >
      <section className="section-padding bg-surface/50">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
              >
                <Card className="text-center glass-effect hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-6">
                    <stat.icon className="h-8 w-8 mx-auto mb-3 text-accent" />
                    <div className="text-2xl font-bold text-gradient mb-1">
                      {formatCount(stat.value)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

// Featured Video Card Component
function FeaturedVideoCard({ video, formatCount, formatDate }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Card className="overflow-hidden glass-effect group hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500">
        <div className="grid lg:grid-cols-2 gap-0">
          <div className="relative aspect-video lg:aspect-square overflow-hidden">
            <OptimizedImage
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full group-hover:scale-110 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="icon"
                className="w-16 h-16 rounded-full bg-background/20 backdrop-blur-sm border-2 border-white/30 hover:bg-background/30"
                asChild
              >
                <Link
                  href={video.url}
                  target="_blank"
                  aria-label={`Watch ${video.title}`}
                >
                  <Play className="h-8 w-8 text-white ml-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
          <CardContent className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <Badge className="w-fit text-sm px-3 py-1">Featured</Badge>
              <h3 className="text-2xl lg:text-3xl font-bold leading-tight line-clamp-3">
                {video.title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{formatCount(video.viewCount)} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(video.uploadDate)}</span>
                </div>
              </div>
            </div>
            <Button className="w-fit" asChild>
              <Link href={video.url} target="_blank">
                Watch Now
                <Play className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}

// Secondary Video Card Component
function SecondaryVideoCard({ video, index, formatCount, formatDate }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Card className="overflow-hidden glass-effect group hover:scale-105 hover:shadow-xl transition-all duration-300">
        <div className="aspect-video relative overflow-hidden">
          <OptimizedImage
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="icon" className="rounded-full" asChild>
              <Link
                href={video.url}
                target="_blank"
                aria-label={`Watch ${video.title}`}
              >
                <Play className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
        <CardContent className="p-6 space-y-4">
          <h4 className="text-lg font-semibold line-clamp-2 leading-tight">
            {video.title}
          </h4>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{formatCount(video.viewCount)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(video.uploadDate)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Newsletter Section Component
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsSubmitting(false);
    setEmail("");
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 md:px-10 bg-gradient-to-r from-primary/5 to-accent/5"
      aria-labelledby="newsletter-title"
    >
      <div className="max-w-5xl mx-auto text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h2
            id="newsletter-title"
            className="text-3xl md:text-5xl font-bold text-gradient"
          >
            Join Our Adventure
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get exclusive updates, behind-the-scenes content, and early access
            to our latest adventures.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <Suspense fallback={<NewsletterSkeleton />}>
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4 p-8 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold">Welcome aboard!</h3>
                <p className="text-muted-foreground">
                  Thank you for subscribing. Get ready for amazing adventures!
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4"
                >
                  Subscribe Another Email
                </Button>
              </motion.div>
            ) : (
              <Card className="glass-effect">
                <CardContent className="p-8 space-y-6">
                  <div className="text-center space-y-2">
                    <Youtube className="h-8 w-8 mx-auto text-red-500" />
                    <h3 className="text-xl font-semibold">
                      Never Miss an Adventure
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Join 8,000+ subscribers for exclusive content
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="text-center"
                      disabled={isSubmitting}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting || !email}
                    >
                      {isSubmitting ? "Subscribing..." : "Subscribe Now"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      No spam, unsubscribe anytime. We respect your privacy.
                    </p>
                  </form>
                </CardContent>
              </Card>
            )}
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
export const Footer = () => {
  return (
    <footer className="py-12 px-3 md:px-6  sm:px-8 border-t border-border/50 bg-surface/50">
      <div className="container-width">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gradient">
              Green Roamer
            </h3>
            <p className="text-muted-foreground">
              Unveiling the Natural Beauty of Europe and Sri Lanka through
              Hiking and traveling.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="/videos"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Videos
              </Link>
              <Link
                href="/destinations"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Destinations
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <div className="space-y-2">
              <Link
                href="/contact"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/support"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Support
              </Link>
              <Link
                href="/donate"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Donate
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Follow Us</h4>
            <div className="flex gap-4">
              <Link
                href="https://www.youtube.com/@GreenRoamer"
                target="_blank"
                className="text-muted-foreground hover:text-red-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61557006305300"
                target="_blank"
                className="text-muted-foreground hover:text-blue-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.tiktok.com/@greenroamer"
                target="_blank"
                className="text-muted-foreground hover:text-pink-500 transition-colors"
                aria-label="TikTok"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center text-muted-foreground">
          <p>&copy; 2024 Green Roamer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export const AnimatedMainVideo = ({ featuredVideo, isContentReady }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{
        opacity: isContentReady ? 1 : 0,
        x: isContentReady ? 0 : 30,
      }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      className="relative"
    >
      <div className="aspect-video rounded-2xl overflow-hidden glass-effect animate-float">
        <OptimizedImage
          src={
            featuredVideo.thumbnail || "/placeholder.svg?height=400&width=600"
          }
          alt="Green Roamer Adventure"
          className="w-full h-full"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-xl font-semibold mb-2">Latest Adventure</h3>
          <p className="text-sm text-muted-foreground">
            Discover the hidden waterfalls of Sri Lanka's hill country
          </p>
        </div>
      </div>
    </motion.div>
  );
};
