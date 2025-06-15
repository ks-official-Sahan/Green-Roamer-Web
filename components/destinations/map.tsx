"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, Map } from "lucide-react";
import {
  getCountryCoordinates,
  getCountriesFromVideos,
} from "@/lib/destinations-utils";
import { greenRoamerData } from "@/data/green-roamer-data";

// Set your Mapbox token here
mapboxgl.accessToken =
  "pk.eyJ1IjoiZXZpc2lvbml0IiwiYSI6ImNtYnVmbmE0cTBlYnEycHB3bzJ0MG9hYnAifQ.7e3b8fkS68YK0vo134Trew";

export function DestinationsMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  // Get countries from videos
  const countries = getCountriesFromVideos(greenRoamerData.videos);

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [0, 20], // Center on world view
        zoom: 1.5,
        attributionControl: false,
        interactive: true,
      });

      map.current.on("load", () => {
        setMapLoaded(true);

        // Add markers for each country
        countries.forEach((country) => {
          const coordinates = getCountryCoordinates(country);
          if (!coordinates || !map.current) return;

          // Create marker element
          const markerEl = document.createElement("div");
          markerEl.className = "country-marker";
          markerEl.innerHTML = `
            <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center 
                        shadow-lg shadow-primary/20 cursor-pointer hover:scale-110 transition-transform">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-30"></span>
            </div>
          `;

          // Add click event
          markerEl.addEventListener("click", () => {
            setActiveCountry(country);

            // Scroll to country section
            const section = document.getElementById(
              `country-${country.toLowerCase().replace(/\s+/g, "-")}`
            );
            if (section) {
              section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          });

          // Add marker to map
          new mapboxgl.Marker(markerEl)
            .setLngLat(coordinates)
            .addTo(map.current);
        });
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");

      return () => {
        if (map.current) {
          map.current.remove();
        }
      };
    } catch (error) {
      console.error("Error initializing Mapbox:", error);
      return;
    }
  }, [countries]);

  // Fly to country when activeCountry changes
  useEffect(() => {
    if (!map.current || !mapLoaded || !activeCountry) return;

    const coordinates = getCountryCoordinates(activeCountry);
    if (!coordinates) return;

    map.current.flyTo({
      center: coordinates,
      zoom: 5,
      duration: 2000,
      essential: true,
    });
  }, [activeCountry, mapLoaded]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="overflow-hidden border border-border/50 bg-card/30 backdrop-blur-sm">
        <CardContent className="p-0 relative">
          <div
            ref={mapContainer}
            className={`w-full transition-all duration-500 ${
              expanded ? "h-[70vh]" : "h-[400px]"
            }`}
          />

          {/* Expand/Collapse Button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>

          {/* Fallback Message */}
          {!mapLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/50 backdrop-blur-sm">
              <Map className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Loading interactive map...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
