"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Camera, MapPin, Users } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    icon: <Globe className="h-8 w-8" />,
    value: 12,
    suffix: "+",
    label: "Countries Documented",
    description: "From remote islands to bustling cities",
  },
  {
    icon: <Camera className="h-8 w-8" />,
    value: 100,
    suffix: "+",
    label: "Adventures Captured",
    description: "Each story unique and inspiring",
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    value: 50000,
    suffix: "+",
    label: "Kilometers Traveled",
    description: "Miles of memories and discoveries",
  },
  {
    icon: <Users className="h-8 w-8" />,
    value: 25000,
    suffix: "+",
    label: "Community Members",
    description: "Fellow travelers and nature lovers",
  },
];

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span className="text-4xl md:text-5xl font-bold text-gradient">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, threshold: 0.3 });

  return (
    <div ref={ref} className="container-width">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
          Our Journey in Numbers
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Every statistic represents countless moments of wonder and discovery
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="stagger-item glass-card p-6 text-center group hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 60, rotationX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotationX: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.17, 0.67, 0.83, 0.67],
            }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            {/* Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 text-primary group-hover:bg-primary/20 transition-colors duration-300"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              {stat.icon}
            </motion.div>

            {/* Counter */}
            <div className="mb-2">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                inView={inView}
              />
            </div>

            {/* Label */}
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              {stat.label}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {stat.description}
            </p>

            {/* Hover Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
              initial={false}
            />
          </motion.div>
        ))}
      </div>

      {/* Background Decoration */}
      <motion.div
        className="absolute inset-0 -z-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(34,197,94,0.05), transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(16,185,129,0.05), transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(34,197,94,0.05), transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  );
}
