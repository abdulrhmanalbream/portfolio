import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ── Bezier helpers ──────────────────────────────────────────────────
function cubicBezier(t, p0, p1, p2, p3) {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

function estimateBezierLength(x1, y1, cx1, cy1, cx2, cy2, x2, y2, steps = 30) {
  let len = 0, px = x1, py = y1;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const nx = cubicBezier(t, x1, cx1, cx2, x2);
    const ny = cubicBezier(t, y1, cy1, cy2, y2);
    len += Math.sqrt((nx - px) ** 2 + (ny - py) ** 2);
    px = nx; py = ny;
  }
  return len;
}

function getPointOnBezier(t, x1, y1, cx1, cy1, cx2, cy2, x2, y2) {
  return {
    x: cubicBezier(t, x1, cx1, cx2, x2),
    y: cubicBezier(t, y1, cy1, cy2, y2),
  };
}

// ── Scenario definitions ────────────────────────────────────────────
// Each scenario has its own layer titles, node labels, and output probabilities.
// Structure per scenario: 3-4-3-3 nodes (13 total)
const SCENARIOS = [
  // ─── Scenario 1: Digital Transformation & Software Engineering ────
  {
    caseName: "DIGITAL TRANSFORMATION",
    layers: [
      {
        id: 1, title: "REQUIREMENTS", color: "#00e5ff",
        nodes: [
          { id: "i1", label: "Stakeholders" },
          { id: "i2", label: "Legacy System" },
          { id: "i3", label: "Business Goals" },
        ],
      },
      {
        id: 2, title: "ANALYSIS", color: "#00e676",
        nodes: [
          { id: "p1", label: "System Audit" },
          { id: "p2", label: "Gap Analysis" },
          { id: "p3", label: "Risk Mapping" },
          { id: "p4", label: "Compliance" },
        ],
      },
      {
        id: 3, title: "DESIGN", color: "#ffea00",
        nodes: [
          { id: "a1", label: "Architecture" },
          { id: "a2", label: "Data Model" },
          { id: "a3", label: "Security Plan" },
        ],
      },
      {
        id: 4, title: "PLAN", color: "#ff6d00",
        nodes: [
          { id: "o1", label: "Agile Sprint", probability: 62 },
          { id: "o2", label: "Waterfall", probability: 24 },
          { id: "o3", label: "Hybrid", probability: 14 },
        ],
      },
    ],
  },

  // ─── Scenario 2: AI / ML Pipeline ────────────────────────────────
  {
    caseName: "AI MODEL PIPELINE",
    layers: [
      {
        id: 1, title: "DATA", color: "#00e5ff",
        nodes: [
          { id: "i1", label: "Raw Dataset" },
          { id: "i2", label: "Labels" },
          { id: "i3", label: "Constraints" },
        ],
      },
      {
        id: 2, title: "PROCESS", color: "#00e676",
        nodes: [
          { id: "p1", label: "Cleaning" },
          { id: "p2", label: "Feature Eng." },
          { id: "p3", label: "Model Select" },
          { id: "p4", label: "Training" },
        ],
      },
      {
        id: 3, title: "EVALUATE", color: "#ffea00",
        nodes: [
          { id: "a1", label: "Accuracy" },
          { id: "a2", label: "Overfitting" },
          { id: "a3", label: "Bias Audit" },
        ],
      },
      {
        id: 4, title: "MODEL", color: "#ff6d00",
        nodes: [
          { id: "o1", label: "Deep Learning", probability: 71 },
          { id: "o2", label: "Random Forest", probability: 19 },
          { id: "o3", label: "SVM", probability: 10 },
        ],
      },
    ],
  },

  // ─── Scenario 3: Web / App Development ───────────────────────────
  {
    caseName: "WEB APP DEVELOPMENT",
    layers: [
      {
        id: 1, title: "GATHER", color: "#00e5ff",
        nodes: [
          { id: "i1", label: "User Stories" },
          { id: "i2", label: "Wireframes" },
          { id: "i3", label: "Tech Reqs" },
        ],
      },
      {
        id: 2, title: "BUILD", color: "#00e676",
        nodes: [
          { id: "p1", label: "UI Design" },
          { id: "p2", label: "Backend API" },
          { id: "p3", label: "Database" },
          { id: "p4", label: "Auth System" },
        ],
      },
      {
        id: 3, title: "TEST", color: "#ffea00",
        nodes: [
          { id: "a1", label: "Performance" },
          { id: "a2", label: "UX Review" },
          { id: "a3", label: "Security" },
        ],
      },
      {
        id: 4, title: "DEPLOY", color: "#ff6d00",
        nodes: [
          { id: "o1", label: "Cloud Native", probability: 58 },
          { id: "o2", label: "Serverless", probability: 30 },
          { id: "o3", label: "On-Premise", probability: 12 },
        ],
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════
export default function NeuralNetwork() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const [scenarioIndex, setScenarioIndex] = useState(0);

  // Current scenario's layers
  const scenario = SCENARIOS[scenarioIndex];
  const layers = scenario.layers;

  // Animation state
  const [animState, setAnimState] = useState({ phase: 0, progress: 0 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Node positions ────────────────────────────────────────────────
  const nodePositions = useMemo(() => {
    const positions = {};
    if (isMobile) {
      const layerHeight = 100;
      const startY = 70;
      layers.forEach((layer, li) => {
        const y = startY + li * layerHeight;
        const cnt = layer.nodes.length;
        const startX = 40;
        const endX = 320;
        const rangeX = endX - startX;
        const sp = cnt > 1 ? rangeX / (cnt - 1) : 0;
        layer.nodes.forEach((node, ni) => {
          positions[node.id] = {
            x: cnt > 1 ? startX + ni * sp : 180, y,
            layer: layer.id, color: layer.color,
            label: node.label,
            probability: node.probability || null,
          };
        });
      });
    } else {
      const layerX = [100, 320, 540, 760];
      const svgH = 290;
      layers.forEach((layer, li) => {
        const cnt = layer.nodes.length;
        const sp = svgH / (cnt + 1);
        layer.nodes.forEach((node, ni) => {
          positions[node.id] = {
            x: layerX[li], y: sp * (ni + 1),
            layer: layer.id, color: layer.color,
            label: node.label,
            probability: node.probability || null,
          };
        });
      });
    }
    return positions;
  }, [layers, isMobile]);

  // ── Connections ───────────────────────────────────────────────────
  const connections = useMemo(() => {
    const conns = [];
    for (let li = 0; li < layers.length - 1; li++) {
      const fromLayer = layers[li];
      const toLayer = layers[li + 1];
      fromLayer.nodes.forEach((fn) => {
        toLayer.nodes.forEach((tn) => {
          const from = nodePositions[fn.id];
          const to = nodePositions[tn.id];
          if (!from || !to) return;
          let cx1, cy1, cx2, cy2;
          if (isMobile) {
            cx1 = from.x; cy1 = from.y + (to.y - from.y) * 0.4;
            cx2 = to.x; cy2 = from.y + (to.y - from.y) * 0.6;
          } else {
            cx1 = from.x + (to.x - from.x) * 0.4; cy1 = from.y;
            cx2 = from.x + (to.x - from.x) * 0.6; cy2 = to.y;
          }
          const pathD = `M ${from.x} ${from.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${to.x} ${to.y}`;
          const len = estimateBezierLength(from.x, from.y, cx1, cy1, cx2, cy2, to.x, to.y);
          conns.push({
            from, to, stage: li + 1,
            cx1, cy1, cx2, cy2, pathD, length: len,
            fromLayer: fromLayer.id, toLayer: toLayer.id,
          });
        });
      });
    }
    return conns;
  }, [layers, nodePositions, isMobile]);

  // ── Animation timeline ────────────────────────────────────────────
  const TRAVEL_MS = 1600;
  const BURST_MS = 500;
  const HOLD_MS = 2800; // longer hold so user can read probabilities
  const FADE_MS = 700;

  const phases = useMemo(() => [
    { type: "travel", stage: 1, duration: TRAVEL_MS },
    { type: "burst", layer: 2, duration: BURST_MS },
    { type: "travel", stage: 2, duration: TRAVEL_MS },
    { type: "burst", layer: 3, duration: BURST_MS },
    { type: "travel", stage: 3, duration: TRAVEL_MS },
    { type: "burst", layer: 4, duration: BURST_MS },
    { type: "hold", duration: HOLD_MS },
    { type: "fade", duration: FADE_MS },
  ], []);

  const totalCycleDuration = useMemo(
    () => phases.reduce((s, p) => s + p.duration, 0),
    [phases]
  );

  // Track which cycle we're on to switch scenario
  const prevCycleRef = useRef(0);

  useEffect(() => {
    startTimeRef.current = performance.now();
    prevCycleRef.current = 0;

    const tick = (now) => {
      const elapsed = now - startTimeRef.current;
      const currentCycle = Math.floor(elapsed / totalCycleDuration);
      const cycleTime = elapsed % totalCycleDuration;

      // Switch scenario when a new cycle begins
      if (currentCycle > prevCycleRef.current) {
        prevCycleRef.current = currentCycle;
        setScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
      }

      let accumulated = 0, currentPhase = 0, phaseProgress = 0;
      for (let i = 0; i < phases.length; i++) {
        if (cycleTime < accumulated + phases[i].duration) {
          currentPhase = i;
          phaseProgress = (cycleTime - accumulated) / phases[i].duration;
          break;
        }
        accumulated += phases[i].duration;
      }

      setAnimState({ phase: currentPhase, progress: Math.min(phaseProgress, 1) });
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [phases, totalCycleDuration]);

  // ── Derived animation state ───────────────────────────────────────
  const currentPhaseData = phases[animState.phase] || phases[0];

  const activeLayers = useMemo(() => {
    const set = new Set([1]);
    for (let i = 0; i <= animState.phase; i++) {
      const p = phases[i];
      if (p.type === "burst") set.add(p.layer);
      if (p.type === "travel") set.add(p.stage);
      if (p.type === "hold") { set.add(1); set.add(2); set.add(3); set.add(4); }
    }
    if (currentPhaseData.type === "fade") return new Set();
    return set;
  }, [animState.phase, phases, currentPhaseData]);

  const burstLayer = currentPhaseData.type === "burst" ? currentPhaseData.layer : null;
  const burstProgress = burstLayer ? animState.progress : 0;
  const travelingStage = currentPhaseData.type === "travel" ? currentPhaseData.stage : null;
  const travelProgress = travelingStage ? animState.progress : 0;
  const isHoldPhase = currentPhaseData.type === "hold";
  const holdProgress = isHoldPhase ? animState.progress : 0;

  const easeInOut = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  // Should we show probabilities? (during burst of layer 4 or hold phase)
  const showProbabilities = (burstLayer === 4) || isHoldPhase;

  // ── SVG ───────────────────────────────────────────────────────────
  const viewBox = isMobile ? "0 0 360 440" : "0 0 880 290";

  // Get the position of the center of a layer (for label placement on desktop)
  const getLayerCenterX = (layerId) => {
    const layerNodes = layers.find(l => l.id === layerId)?.nodes || [];
    if (layerNodes.length === 0) return 0;
    const firstPos = nodePositions[layerNodes[0].id];
    return firstPos ? firstPos.x : 0;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full border border-white/[0.06] bg-gradient-to-br from-black/80 via-[#050a05]/90 to-black/80 rounded-xl overflow-hidden flex flex-col"
      style={{
        minHeight: isMobile ? "540px" : "300px",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(0,229,255,0.04) 0%, transparent 60%), " +
            "radial-gradient(ellipse at 70% 80%, rgba(255,109,0,0.03) 0%, transparent 60%)",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header: pipeline status + scenario title */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-3 pb-1 md:px-6 md:pt-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
              style={{
                backgroundColor: travelingStage
                  ? layers[travelingStage - 1]?.color
                  : burstLayer
                    ? layers[burstLayer - 1]?.color
                    : "#00e5ff",
                animationDuration: "2s",
              }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{
                backgroundColor: travelingStage
                  ? layers[travelingStage - 1]?.color
                  : burstLayer
                    ? layers[burstLayer - 1]?.color
                    : "#00e5ff",
              }}
            />
          </span>
          <span className="font-mono text-[11px] md:text-sm tracking-[0.15em] text-white/40 uppercase">
            Neural Pipeline
          </span>
        </div>
        {/* Scenario case name */}
        <span
          className="font-mono text-[10px] md:text-xs tracking-[0.15em] uppercase"
          style={{
            color: "#ff6d00",
            opacity: currentPhaseData.type === "fade" ? 0 : 0.6,
            transition: "opacity 0.4s ease",
          }}
        >
          CASE: {scenario.caseName}
        </span>
      </div>

      {/* SVG Network */}
      <div className="flex-1 w-full relative select-none px-2 pb-1 md:px-4 md:pb-3">
        <svg viewBox={viewBox} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            {connections.map((c, idx) => (
              <linearGradient
                key={`grad-${idx}`}
                id={`conn-grad-${scenarioIndex}-${idx}`}
                x1={c.from.x} y1={c.from.y}
                x2={c.to.x} y2={c.to.y}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor={c.from.color} />
                <stop offset="100%" stopColor={c.to.color} />
              </linearGradient>
            ))}
          </defs>

          {/* Layer labels */}
          {layers.map((layer) => {
            const active = activeLayers.has(layer.id);
            const firstNode = layer.nodes[0];
            const pos = nodePositions[firstNode.id];
            if (!pos) return null;

            return (
              <text
                key={`lbl-${layer.id}-${scenarioIndex}`}
                x={isMobile ? 180 : pos.x}
                y={isMobile ? pos.y - 30 : 22}
                textAnchor="middle"
                fill={layer.color}
                fontSize={isMobile ? "10" : "13"}
                fontWeight="700"
                fontFamily="monospace"
                letterSpacing="0.12em"
                opacity={active ? 0.7 : 0.15}
                style={{ transition: "opacity 0.4s ease" }}
              >
                {layer.title}
              </text>
            );
          })}

          {/* Connection paths */}
          {connections.map((c, idx) => {
            const isActive = activeLayers.has(c.fromLayer) && activeLayers.has(c.toLayer);
            const isTraveling = travelingStage === c.stage;
            return (
              <path
                key={`conn-${idx}`}
                d={c.pathD}
                fill="none"
                stroke={`url(#conn-grad-${scenarioIndex}-${idx})`}
                strokeWidth={isTraveling ? 2 : isActive ? 1.2 : 0.4}
                opacity={isTraveling ? 0.7 : isActive ? 0.2 : 0.05}
                style={{ transition: "opacity 0.3s ease, stroke-width 0.3s ease" }}
              />
            );
          })}

          {/* Traveling pulse dots */}
          {travelingStage && connections
            .filter((c) => c.stage === travelingStage)
            .map((c, idx) => {
              const t = easeInOut(travelProgress);
              const pt = getPointOnBezier(
                t, c.from.x, c.from.y, c.cx1, c.cy1, c.cx2, c.cy2, c.to.x, c.to.y
              );
              const dotR = isMobile ? 2.5 : 3.5;
              const trailR = isMobile ? 6 : 9;
              return (
                <g key={`pulse-${idx}`}>
                  <circle cx={pt.x} cy={pt.y} r={trailR}
                    fill={c.from.color} opacity={0.2} style={{ filter: "blur(4px)" }} />
                  <circle cx={pt.x} cy={pt.y} r={dotR}
                    fill="white" opacity={0.95}
                    style={{ filter: `drop-shadow(0 0 6px ${c.from.color}) drop-shadow(0 0 12px ${c.from.color})` }} />
                  <circle cx={pt.x} cy={pt.y} r={dotR * 0.4}
                    fill="white" opacity={1} />
                </g>
              );
            })}

          {/* Nodes */}
          {Object.entries(nodePositions).map(([id, pos]) => {
            const active = activeLayers.has(pos.layer);
            const isBursting = burstLayer === pos.layer;
            const isOutputNode = pos.layer === 4;
            const nodeRadius = isMobile ? 9 : 13;

            // Burst effect
            const burstRingR = isBursting ? nodeRadius + 6 + burstProgress * 20 : nodeRadius + 6;
            const burstRingOpacity = isBursting ? Math.max(0, 0.8 - burstProgress * 0.9) : 0;

            // For output nodes: probability bar width
            const prob = pos.probability;
            const isWinner = isOutputNode && prob && prob >= 50;
            const showProb = isOutputNode && showProbabilities && prob;

            // Probability bar dimensions
            const barWidth = isMobile ? 40 : 55;
            const barHeight = isMobile ? 5 : 6;
            const barX = pos.x - barWidth / 2;
            const barY = pos.y + nodeRadius + (isMobile ? 19 : 23);

            return (
              <g key={`${id}-${scenarioIndex}`}>
                {/* Burst shockwave */}
                {isBursting && (
                  <circle cx={pos.x} cy={pos.y} r={burstRingR}
                    fill="none" stroke={pos.color}
                    strokeWidth={2 - burstProgress * 1.5}
                    opacity={burstRingOpacity}
                    style={{ filter: `drop-shadow(0 0 ${8 + burstProgress * 15}px ${pos.color})` }}
                  />
                )}

                {/* Outer glow ring */}
                {active && !isBursting && (
                  <circle cx={pos.x} cy={pos.y} r={nodeRadius + 5}
                    fill="none" stroke={pos.color} strokeWidth={0.7} opacity={0.2} />
                )}

                {/* Winner highlight for top probability */}
                {showProb && isWinner && (
                  <circle cx={pos.x} cy={pos.y} r={nodeRadius + 8}
                    fill="none" stroke={pos.color} strokeWidth={1.5}
                    opacity={0.4}
                    style={{ filter: `drop-shadow(0 0 12px ${pos.color})` }}
                  >
                    <animate attributeName="opacity" values="0.4;0.7;0.4" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* Main node circle */}
                <circle cx={pos.x} cy={pos.y} r={nodeRadius}
                  fill={active ? pos.color : "rgba(255,255,255,0.03)"}
                  fillOpacity={
                    isBursting ? 0.15 + burstProgress * 0.25
                      : showProb && isWinner ? 0.35
                        : active ? 0.15 : 0.03
                  }
                  stroke={pos.color}
                  strokeWidth={showProb && isWinner ? 2 : active ? 1.5 : 0.5}
                  opacity={active ? 1 : 0.2}
                  style={{
                    filter: active
                      ? `drop-shadow(0 0 ${isBursting ? 18 : showProb && isWinner ? 14 : 8}px ${pos.color})`
                      : "none",
                    transition: "opacity 0.3s ease, filter 0.3s ease",
                  }}
                />

                {/* Center dot */}
                {active && (
                  <circle cx={pos.x} cy={pos.y} r={isMobile ? 1.5 : 2.5}
                    fill="white"
                    opacity={isBursting ? 1 : showProb && isWinner ? 0.9 : 0.5}
                    style={{ filter: isBursting ? "drop-shadow(0 0 4px white)" : "none" }}
                  />
                )}

                {/* Burst flash */}
                {isBursting && burstProgress < 0.4 && (
                  <circle cx={pos.x} cy={pos.y} r={nodeRadius + 2}
                    fill={pos.color}
                    opacity={0.3 * (1 - burstProgress / 0.4)}
                    style={{ filter: "blur(3px)" }}
                  />
                )}

                {/* Node label */}
                <text
                  x={pos.x}
                  y={pos.y + nodeRadius + (isMobile ? 11 : 14)}
                  textAnchor="middle"
                  fill={pos.color}
                  fontSize={isMobile ? "10" : "12"}
                  fontWeight="600"
                  fontFamily="monospace"
                  letterSpacing="0.03em"
                  opacity={active ? 0.85 : 0.15}
                  style={{ transition: "opacity 0.3s ease" }}
                >
                  {pos.label}
                </text>

                {/* ── Probability bar (output layer only) ─────────── */}
                {showProb && (
                  <g opacity={burstLayer === 4 ? burstProgress : 1}
                    style={{ transition: "opacity 0.3s ease" }}>
                    {/* Bar background */}
                    <rect
                      x={barX} y={barY}
                      width={barWidth} height={barHeight}
                      rx={barHeight / 2}
                      fill="rgba(255,255,255,0.06)"
                      stroke={pos.color}
                      strokeWidth={0.3}
                      opacity={0.5}
                    />
                    {/* Filled portion */}
                    <rect
                      x={barX} y={barY}
                      width={barWidth * (prob / 100)}
                      height={barHeight}
                      rx={barHeight / 2}
                      fill={pos.color}
                      opacity={isWinner ? 0.7 : 0.35}
                      style={{
                        filter: isWinner ? `drop-shadow(0 0 4px ${pos.color})` : "none",
                      }}
                    />
                    {/* Percentage text */}
                    <text
                      x={pos.x}
                      y={barY + barHeight + (isMobile ? 9 : 11)}
                      textAnchor="middle"
                      fill={isWinner ? "white" : pos.color}
                      fontSize={isMobile ? "10" : "12"}
                      fontWeight={isWinner ? "800" : "600"}
                      fontFamily="monospace"
                      opacity={isWinner ? 1 : 0.6}
                      style={{
                        filter: isWinner ? `drop-shadow(0 0 6px ${pos.color})` : "none",
                      }}
                    >
                      {prob}%
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between px-4 pb-3 md:px-6 md:pb-4">
        <div className="flex items-center gap-2 md:gap-3">
          {layers.map((layer) => (
            <div
              key={`${layer.id}-${scenarioIndex}`}
              className="flex items-center gap-1"
              style={{
                opacity: activeLayers.has(layer.id) ? 1 : 0.25,
                transition: "opacity 0.3s ease",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: layer.color,
                  boxShadow: activeLayers.has(layer.id) ? `0 0 6px ${layer.color}` : "none",
                }}
              />
              <span
                className="font-mono text-[9px] md:text-[11px] tracking-wider hidden sm:inline"
                style={{ color: layer.color }}
              >
                {layer.title}
              </span>
            </div>
          ))}
        </div>
        {/* Scenario dots indicator */}
        <div className="flex items-center gap-1.5">
          {SCENARIOS.map((_, idx) => (
            <div
              key={idx}
              className="rounded-full"
              style={{
                width: idx === scenarioIndex ? 12 : 4,
                height: 4,
                backgroundColor: idx === scenarioIndex ? "#ff6d00" : "rgba(255,255,255,0.15)",
                borderRadius: 2,
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}