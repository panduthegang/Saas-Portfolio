import React, { memo, useMemo } from 'react';
import FaultyTerminal from './FaultyTerminal';
import { DeviceCapabilities } from '../utils/deviceDetection';

interface OptimizedTerminalProps {
  capabilities: DeviceCapabilities;
  className?: string;
}

const OptimizedTerminal = memo(({ capabilities, className }: OptimizedTerminalProps) => {
  const terminalSettings = useMemo(() => {
    const { isLowEnd, isMobile, hasGoodGPU, reducedMotion } = capabilities;
    
    // Don't render terminal on very low-end devices
    if (isLowEnd && !hasGoodGPU) {
      return null;
    }
    
    return {
      scale: isMobile ? 0.8 : isLowEnd ? 1.2 : 1.5,
      gridMul: isMobile ? [1, 1] : [2, 1] as [number, number],
      digitSize: isMobile ? 0.8 : 1.2,
      timeScale: isLowEnd ? 0.5 : 1,
      pause: reducedMotion,
      scanlineIntensity: isLowEnd ? 0.2 : 0.5,
      glitchAmount: isLowEnd ? 0.5 : 1,
      flickerAmount: isLowEnd ? 0.3 : 1,
      noiseAmp: isLowEnd ? 0.5 : 1,
      chromaticAberration: 0, // Disable on all devices for performance
      dither: 0, // Disable dithering for performance
      curvature: isLowEnd ? 0 : 0.1,
      mouseReact: !isMobile && !isLowEnd,
      mouseStrength: 0.3,
      pageLoadAnimation: !isLowEnd,
      brightness: isLowEnd ? 0.7 : 1,
      dpr: Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2)
    };
  }, [capabilities]);

  // Return null for very low-end devices
  if (!terminalSettings) {
    return (
      <div className={`${className} bg-gradient-to-br from-gray-900 to-black opacity-30`}>
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
      </div>
    );
  }

  return (
    <div className={className}>
      <FaultyTerminal {...terminalSettings} />
    </div>
  );
});

OptimizedTerminal.displayName = 'OptimizedTerminal';

export default OptimizedTerminal;