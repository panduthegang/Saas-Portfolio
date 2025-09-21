// Device detection utilities for performance optimization
export interface DeviceCapabilities {
  isLowEnd: boolean;
  isMobile: boolean;
  hasGoodGPU: boolean;
  reducedMotion: boolean;
}

export function detectDeviceCapabilities(): DeviceCapabilities {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  
  // Check for reduced motion preference
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Detect low-end devices based on various factors
  const isLowEnd = detectLowEndDevice();
  
  // GPU detection (basic heuristics)
  const hasGoodGPU = detectGPUCapability();
  
  return {
    isLowEnd,
    isMobile,
    hasGoodGPU,
    reducedMotion
  };
}

function detectLowEndDevice(): boolean {
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 1;
  if (cores <= 2) return true;
  
  // Check memory (if available)
  const memory = (navigator as any).deviceMemory;
  if (memory && memory <= 2) return true;
  
  // Check connection speed
  const connection = (navigator as any).connection;
  if (connection) {
    const slowConnections = ['slow-2g', '2g', '3g'];
    if (slowConnections.includes(connection.effectiveType)) return true;
  }
  
  // Check user agent for known low-end devices
  const userAgent = navigator.userAgent.toLowerCase();
  const lowEndPatterns = [
    'android 4', 'android 5', 'android 6',
    'iphone os 9', 'iphone os 10', 'iphone os 11',
    'windows phone'
  ];
  
  return lowEndPatterns.some(pattern => userAgent.includes(pattern));
}

function detectGPUCapability(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) return false;
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
      
      // Known weak GPUs
      const weakGPUs = [
        'intel hd graphics 3000',
        'intel hd graphics 4000',
        'adreno 3',
        'mali-4',
        'powervr sgx'
      ];
      
      return !weakGPUs.some(gpu => renderer.includes(gpu));
    }
    
    return true;
  } catch {
    return false;
  }
}

export function getOptimalSettings(capabilities: DeviceCapabilities) {
  const { isLowEnd, isMobile, hasGoodGPU, reducedMotion } = capabilities;
  
  return {
    // Terminal settings
    enableTerminal: !isLowEnd && hasGoodGPU && !reducedMotion,
    terminalScale: isMobile ? 0.5 : isLowEnd ? 0.7 : 1,
    terminalOpacity: isLowEnd ? 0.1 : 0.2,
    
    // Animation settings
    enableComplexAnimations: !isLowEnd && !reducedMotion,
    animationDuration: isLowEnd ? 0.3 : reducedMotion ? 0.1 : 0.8,
    enableParallax: !isMobile && !isLowEnd,
    
    // Rendering settings
    enableSmoothScrolling: !isLowEnd && !isMobile,
    enableBlur: hasGoodGPU && !isLowEnd,
    
    // Performance settings
    throttleAnimations: isLowEnd || isMobile,
    useRequestIdleCallback: !isLowEnd
  };
}