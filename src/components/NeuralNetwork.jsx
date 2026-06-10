import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function NeuralNetwork() {
  // More sophisticated state tracking: which layers are currently active and if data is moving
  const [networkState, setNetworkState] = useState({
    activeLayers: [1],      // Which layers are "lit up"
    movingDataStage: 1,     // Which stage (1->2, 2->3, 3->4) is data moving through
    isMoving: true,         // Is data currently in transit?
  });

  // Master cycle using chained setTimeout for PRECISE timing
  useEffect(() => {
    // Define all states in the cycle
    const cycleStates = [
      // 0-2s: Layer 1 active, data moving FROM 1 TO 2
      { duration: 2000, state: { activeLayers: [1], movingDataStage: 1, isMoving: true } },
      
      // 2-4s: Layer 1 stays ON, Layer 2 receives data and lights up
      { duration: 2000, state: { activeLayers: [1, 2], movingDataStage: 2, isMoving: true } },
      
      // 4-6s: Layer 1&2 stay ON, Layer 3 receives data and lights up
      { duration: 2000, state: { activeLayers: [1, 2, 3], movingDataStage: 3, isMoving: true } },
      
      // 6-8s: Layer 1&2&3 stay ON, Layer 4 receives data and lights up
      { duration: 2000, state: { activeLayers: [1, 2, 3, 4], movingDataStage: 0, isMoving: false } },
      
      // 8-11s: Everything stays ON - wait period (3 seconds)
      { duration: 3000, state: { activeLayers: [1, 2, 3, 4], movingDataStage: 0, isMoving: false } },
      
      // 11-12s: Turn everything off
      { duration: 1000, state: { activeLayers: [], movingDataStage: 0, isMoving: false } },
    ];

    let currentStateIndex = 0;
    let timeoutId = null;

    const scheduleNext = () => {
      const currentCycleState = cycleStates[currentStateIndex];
      
      // Update network state
      setNetworkState(currentCycleState.state);
      
      // Move to next state
      currentStateIndex = (currentStateIndex + 1) % cycleStates.length;
      
      // Schedule the next state with its EXACT duration
      timeoutId = setTimeout(scheduleNext, currentCycleState.duration);
    };

    // Start the cycle
    scheduleNext();

    // Proper cleanup - cancel any pending timeout
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Professional Digital Transformation Architecture
  const nodes = useMemo(() => {
    return [
      // Layer 1: Raw Data Inputs
      { id: 1, x: 80, y: 100, size: 12, label: "USER_BEHAVIOR", layer: 1 },
      { id: 2, x: 80, y: 190, size: 12, label: "MANUAL_RECORDS", layer: 1 },
      { id: 3, x: 80, y: 280, size: 12, label: "RAW_TRANSACTIONS", layer: 1 },
      
      // Layer 2: Processing & Automation
      { id: 4, x: 280, y: 70, size: 12, label: "DATA_DIGITIZATION", layer: 2 },
      { id: 5, x: 280, y: 190, size: 12, label: "RBAC_SECURITY", layer: 2 },
      { id: 6, x: 280, y: 310, size: 12, label: "WORKFLOW_AUTOMATION", layer: 2 },

      // Layer 3: Analytics & Insights
      { id: 7, x: 480, y: 130, size: 12, label: "PATTERN_RECOGNITION", layer: 3 },
      { id: 8, x: 480, y: 250, size: 12, label: "BEHAVIOR_ANALYTICS", layer: 3 },

      // Layer 4: Output & Transformation
      { id: 9, x: 680, y: 100, size: 12, label: "SMART_RECOMMENDATIONS", layer: 4 },
      { id: 10, x: 680, y: 280, size: 12, label: "DIGITAL_TRANSFORMATION", layer: 4 },
    ];
  }, []);

  const connections = useMemo(() => {
    const list = [];
    
    const layer1 = nodes.filter(n => n.x === 80);
    const layer2 = nodes.filter(n => n.x === 280);
    const layer3 = nodes.filter(n => n.x === 480);
    const layer4 = nodes.filter(n => n.x === 680);

    // Input to Processing
    layer1.forEach((n1, i) => {
      layer2.forEach((n2, j) => {
        list.push({ 
          from: n1, 
          to: n2, 
          id: `c1-${i}-${j}`, 
          active: true,
          stage: 1  // Stage 1: from layer 1 to layer 2
        });
      });
    });

    // Processing to Analytics
    layer2.forEach((n2, i) => {
      layer3.forEach((n3, j) => {
        list.push({ 
          from: n2, 
          to: n3, 
          id: `c2-${i}-${j}`, 
          active: true,
          stage: 2  // Stage 2: from layer 2 to layer 3
        });
      });
    });

    // Analytics to Output
    layer3.forEach((n3, i) => {
      layer4.forEach((n4, j) => {
        list.push({ 
          from: n3, 
          to: n4, 
          id: `c3-${i}-${j}`, 
          active: true,
          stage: 3  // Stage 3: from layer 3 to layer 4
        });
      });
    });

    return list;
  }, [nodes]);

  return (
    <div className="relative w-full min-h-[550px] border-2 border-matrix-green/30 bg-black/60 rounded-lg overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,255,15,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,255,15,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      
      {/* Network Schema Title */}
      <div className="absolute top-4 left-6 font-mono text-sm text-matrix-green/60 tracking-wider flex items-center gap-2 select-none z-10">
        <span className="w-2 h-2 rounded-full bg-matrix-green animate-pulse" />
        ENTERPRISE_ARCHITECTURE: DIGITAL_TRANSFORMATION_PIPELINE
      </div>

      <div className="w-full h-full relative select-none">
        <svg
          viewBox="0 0 800 380"
          className="w-full h-full"
          style={{ filter: "drop-shadow(0 0 10px rgba(15, 255, 15, 0.1))" }}
        >
          {/* Layer Separator Lines */}
          <line x1="150" y1="20" x2="150" y2="360" stroke="#0f0" strokeWidth="1" opacity="0.1" strokeDasharray="5,5" />
          <line x1="350" y1="20" x2="350" y2="360" stroke="#0f0" strokeWidth="1" opacity="0.1" strokeDasharray="5,5" />
          <line x1="550" y1="20" x2="550" y2="360" stroke="#0f0" strokeWidth="1" opacity="0.1" strokeDasharray="5,5" />

          {/* Layer Headers - Large & Readable */}
          <g>
            <rect x="40" y="-15" width="80" height="30" fill="#0f0" opacity="0.05" rx="4" />
            <text x="80" y="-2" textAnchor="middle" fill="#00ff00" fontSize="13" fontWeight="bold">
              LAYER 1
            </text>
            <text x="80" y="12" textAnchor="middle" fill="#00ff00" opacity="0.8" fontSize="10">
              INPUT
            </text>
          </g>

          <g>
            <rect x="240" y="-15" width="80" height="30" fill="#0f0" opacity="0.05" rx="4" />
            <text x="280" y="-2" textAnchor="middle" fill="#00ff00" fontSize="13" fontWeight="bold">
              LAYER 2
            </text>
            <text x="280" y="12" textAnchor="middle" fill="#00ff00" opacity="0.8" fontSize="10">
              PROCESS
            </text>
          </g>

          <g>
            <rect x="440" y="-15" width="80" height="30" fill="#0f0" opacity="0.05" rx="4" />
            <text x="480" y="-2" textAnchor="middle" fill="#00ff00" fontSize="13" fontWeight="bold">
              LAYER 3
            </text>
            <text x="480" y="12" textAnchor="middle" fill="#00ff00" opacity="0.8" fontSize="10">
              ANALYTICS
            </text>
          </g>

          <g>
            <rect x="640" y="-15" width="80" height="30" fill="#0f0" opacity="0.05" rx="4" />
            <text x="680" y="-2" textAnchor="middle" fill="#00ff00" fontSize="13" fontWeight="bold">
              LAYER 4
            </text>
            <text x="680" y="12" textAnchor="middle" fill="#00ff00" opacity="0.8" fontSize="10">
              OUTPUT
            </text>
          </g>

          {/* Render Connections - only active ones glow */}
          {connections.map((c) => {
            // Only show pulses on the current moving stage
            const shouldShowPulse = networkState.isMoving && 
                                     networkState.movingDataStage === c.stage;
            
            return (
              <motion.line
                key={c.id}
                x1={c.from.x}
                y1={c.from.y}
                x2={c.to.x}
                y2={c.to.y}
                strokeWidth="1.5"
                initial={{ opacity: 0.15 }}
                animate={{ opacity: shouldShowPulse ? [0.9, 1, 0.9] : 0.15 }}
                transition={{ 
                  duration: 2.5, 
                  repeat: shouldShowPulse ? Infinity : 0,
                  ease: "easeInOut" 
                }}
                stroke="#0f0"
                style={{ filter: shouldShowPulse ? "drop-shadow(0 0 8px rgba(15, 255, 15, 0.9))" : "drop-shadow(0 0 0px rgba(15, 255, 15, 0))" }}
              />
            );
          })}

          {/* Glowing pulse paths - only on active moving stage */}
          {connections.map((c, idx) => {
            const shouldMovePulse = networkState.isMoving && 
                                     networkState.movingDataStage === c.stage;
            
            return shouldMovePulse ? (
              <g key={`pulse-${idx}`}>
                <motion.circle
                  r="2.5"
                  fill="#0f0"
                  opacity="1"
                  initial={{ x: c.from.x, y: c.from.y }}
                  animate={{ 
                    x: c.to.x, 
                    y: c.to.y 
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: idx * 0.1,
                  }}
                  style={{ filter: "drop-shadow(0 0 6px rgba(15, 255, 15, 1))" }}
                />
              </g>
            ) : null;
          })}

          {/* Render Nodes */}
          {nodes.map((n) => {
            // Node is active if it's in the active layers list
            const isNodeActive = networkState.activeLayers.includes(n.layer);
            
            // Get the highest layer currently active (most recent data arrival)
            const highestActiveLayer = Math.max(...networkState.activeLayers, 0);
            
            // Calculate glow intensity: layer 4 = max, layer 1 = less, inactive = zero
            let glowIntensity = 0;
            if (isNodeActive) {
              if (n.layer === highestActiveLayer) {
                glowIntensity = 1;        // Maximum glow (1.0) for newest layer
              } else if (n.layer === highestActiveLayer - 1) {
                glowIntensity = 0.7;      // Medium glow (0.7) for previous layer
              } else if (n.layer === highestActiveLayer - 2) {
                glowIntensity = 0.4;      // Light glow (0.4) for 2 layers back
              } else {
                glowIntensity = 0.15;     // Minimal glow for oldest active layers
              }
            }
            
            return (
              <g key={n.id}>
                {/* Glow aura - appears on ALL active nodes, intensity varies by layer */}
                {isNodeActive && glowIntensity > 0 && (
                  <motion.circle
                    cx={n.x}
                    cy={n.y}
                    r={n.size + 4}
                    fill="none"
                    stroke="#0f0"
                    strokeWidth={glowIntensity * 1.5}
                    animate={{ 
                      r: [n.size + 4, n.size + 9, n.size + 4],
                      strokeOpacity: [glowIntensity * 0.6, glowIntensity * 0.95, glowIntensity * 0.6]
                    }}
                    transition={{ 
                      duration: 1.2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      filter: `drop-shadow(0 0 ${glowIntensity * 10}px rgba(15, 255, 15, ${glowIntensity * 0.9}))`
                    }}
                  />
                )}
                
                {/* Main node circle */}
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={n.size}
                  className={`${
                    isNodeActive
                      ? "fill-matrix-green stroke-matrix-green"
                      : "fill-neutral-900/10 stroke-matrix-green/5"
                  } stroke-1.5 cursor-pointer transition-all duration-300`}
                  whileHover={{ r: isNodeActive ? n.size + 2 : n.size }}
                  style={{ 
                    filter: isNodeActive
                      ? `drop-shadow(0 0 ${8 + glowIntensity * 8}px rgba(15, 255, 15, ${glowIntensity * 0.9}))`
                      : "drop-shadow(0 0 0px rgba(15, 255, 15, 0))",
                    opacity: isNodeActive ? 1 : 0.3
                  }}
                />

                {/* Node text identifiers - ABOVE nodes on single line */}
                {isNodeActive && (
                  <text
                    x={n.x}
                    y={n.y - n.size - 15}
                    textAnchor="middle"
                    fill="#00ff00"
                    fontSize="9"
                    fontWeight="bold"
                    opacity={glowIntensity}
                    className="transition-all duration-300"
                  >
                    {n.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      
      {/* HUD diagnostic footer */}
      <div className="absolute bottom-4 right-6 font-mono text-xs text-matrix-green/70 flex gap-6 select-none">
        <span>SYSTEM_STATE: DIGITAL_TRANSFORMATION_ACTIVE</span>
        <span>PROCESS_AUTOMATION: OPTIMIZED</span>
      </div>
    </div>
  );
} 