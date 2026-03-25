import { useEffect, useRef } from "react";
import Globe from "globe.gl";
import * as topojson from "topojson-client";
import * as turf from "@turf/turf";

function GlobeView() {
  const globeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!globeRef.current) return;

    const globe = Globe()(globeRef.current);

    // Earth texture
    globe.globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg");
    globe.backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png");
    globe.showAtmosphere(true);
    globe.atmosphereColor("rgba(255, 255, 255, 0.6)");
    globe.atmosphereAltitude(0.1);
    
    fetch("https://unpkg.com/world-atlas/countries-110m.json")
      .then(res => res.json())
      .then(worldData => {
        const countries = topojson.feature(
          worldData,
          worldData.objects.countries
        );
        
        const landMass = turf.combine(countries);
        
        const points = [];
        const numPoints = 5000;
        
        for (let i = 0; i < numPoints; i++) {
          const randomPoint = turf.randomPoint(1, { bbox: [-180, -90, 180, 90] });
          const point = randomPoint.features[0];
          
          if (turf.booleanPointInPolygon(point, landMass.features[0])) {
            const [lng, lat] = point.geometry.coordinates;
            points.push({ lat, lng });
          } else {
            i--;
          }
        }
        
        globe
          .pointsData(points)
          .pointColor(() => "rgba(0, 180, 230, 0.8)")
          .pointAltitude(0.01)
          .pointRadius(0.1)
          .pointsMerge(true);
      });

  }, []);

  return (
    <div
      ref={globeRef}
      style={{ 
        width: "100%", 
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    />
  );
}

export default GlobeView;
