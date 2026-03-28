// globe_view.tsx
import { useEffect, useRef } from "react";
import { BarGlob3d } from "glob3d";
import { airportsData } from "./airport_data";

function GlobeView() {
  const globeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!globeRef.current) return;

    const timer = setTimeout(() => {
      if (!globeRef.current) return;

      try {
        const globe = new BarGlob3d(globeRef.current, airportsData, {
          globeColor: "#050510",
          globeOpacity: 1,
          globeRadius: 150,
          hexRes: 3,
          hexPadding: 0.2,
          barColor: "#00ffff",
          barOpacity: 0.8,
          barActiveColor: "#ffffff",
          barActiveOpacity: 1,
          highestBar: 0.15,
          tooltipActiveBackgroundColor: "#0437F2",
          tooltipActiveTextColor: "#ffffff",
          tooltipValueSuffix: " passengers/yr",
          tooltipsLimit: 10
        });

        return () => {
          if (globe && typeof globe.dispose === 'function') {
            globe.dispose();
          }
          if (globeRef.current) {
            while (globeRef.current.firstChild) {
              globeRef.current.removeChild(globeRef.current.firstChild);
            }
          }
        };
      } catch (error) {
        console.error("Error creating globe:", error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={globeRef}
      style={{ 
        width: "100%", 
        height: "100vh", 
        position: "relative",
        display: "block",
        backgroundColor: "#000000"
      }}
    />
  );
}

export default GlobeView;
