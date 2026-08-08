"use client";

import { useEffect, useRef, useState } from "react";
import { HeroVisual } from "@/components/visuals/HeroVisual";

/**
 * Restrained WebGL centerpiece for the hero — a slowly rotating wireframe
 * icosahedron with lit vertex "nodes," echoing the node/line motif used in
 * the flat SVG visuals elsewhere on the site, rendered in 3D. Deliberately
 * quiet: a slow constant rotation plus a few degrees of mouse-driven tilt,
 * nothing that competes with the type.
 *
 * The static <HeroVisual /> SVG renders underneath at all times as both
 * the no-JS fallback and the poster shown before WebGL mounts, so this is
 * additive progressive enhancement rather than a hard dependency.
 */
export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let cleanup = () => {};

    let cancelled = false;
    import("three").then((THREE) => {
      if (cancelled) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      } catch {
        return; // WebGL unavailable — SVG fallback stays visible
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0, 6.2);

      // Outer group carries the eased mouse tilt; the inner group owns the
      // autonomous spin. Separating them keeps the tilt from fighting the
      // continuous Y rotation instead of composing with it.
      const tiltGroup = new THREE.Group();
      const group = new THREE.Group();
      tiltGroup.add(group);
      scene.add(tiltGroup);

      const accent = new THREE.Color("#c9d6c9");
      const accentDim = new THREE.Color("#5c7a6c");

      // Outer wireframe form
      const icoGeo = new THREE.IcosahedronGeometry(2, 1);
      const wireGeo = new THREE.WireframeGeometry(icoGeo);
      const wireMat = new THREE.LineBasicMaterial({ color: accentDim, transparent: true, opacity: 0.55 });
      group.add(new THREE.LineSegments(wireGeo, wireMat));

      // Inner concentric ring, matching the flat visuals' circle motif
      const ringGeo = new THREE.TorusGeometry(1.15, 0.006, 8, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: accentDim, transparent: true, opacity: 0.4 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.4;
      group.add(ring);

      // Lit vertex "nodes"
      const nodeGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const nodeMat = new THREE.MeshBasicMaterial({ color: accent });
      const positions = icoGeo.attributes.position;
      const seen = new Set<string>();
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);
        const key = `${x.toFixed(2)},${y.toFixed(2)},${z.toFixed(2)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(x, y, z);
        group.add(node);
      }

      const resize = () => {
        const { clientWidth, clientHeight } = container;
        renderer.setSize(clientWidth, clientHeight, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
      };
      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);

      let targetTiltX = 0;
      let targetTiltY = 0;
      const onPointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        targetTiltY = nx * 0.35;
        targetTiltX = ny * -0.25;
      };
      if (!reduced) window.addEventListener("pointermove", onPointerMove);

      let frameId: number;
      let visible = true;
      const onVisibility = () => {
        visible = document.visibilityState === "visible";
      };
      document.addEventListener("visibilitychange", onVisibility);

      group.rotation.x = 0.32;
      group.rotation.y = -0.5;

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        if (!visible) return;

        if (!reduced) {
          group.rotation.y += 0.0022;
          tiltGroup.rotation.x += (targetTiltX - tiltGroup.rotation.x) * 0.05;
          tiltGroup.rotation.y += (targetTiltY - tiltGroup.rotation.y) * 0.05;
        }
        renderer.render(scene, camera);
      };
      animate();
      setReady(true);

      cleanup = () => {
        cancelled = true;
        cancelAnimationFrame(frameId);
        resizeObserver.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("pointermove", onPointerMove);
        wireGeo.dispose();
        wireMat.dispose();
        ringGeo.dispose();
        ringMat.dispose();
        nodeGeo.dispose();
        nodeMat.dispose();
        icoGeo.dispose();
        renderer.dispose();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}>
        <HeroVisual />
      </div>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      />
    </div>
  );
}
