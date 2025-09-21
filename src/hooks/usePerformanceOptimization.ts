import { useState, useEffect, useCallback } from 'react';
import { detectDeviceCapabilities, getOptimalSettings, DeviceCapabilities } from '../utils/deviceDetection';

export function usePerformanceOptimization() {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities | null>(null);
  const [settings, setSettings] = useState<ReturnType<typeof getOptimalSettings> | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Detect capabilities on mount
    const detectedCapabilities = detectDeviceCapabilities();
    const optimalSettings = getOptimalSettings(detectedCapabilities);
    
    setCapabilities(detectedCapabilities);
    setSettings(optimalSettings);
    setIsReady(true);

    // Log performance info for debugging
    console.log('Device capabilities:', detectedCapabilities);
    console.log('Optimal settings:', optimalSettings);
  }, []);

  const throttledCallback = useCallback((callback: () => void, delay: number = 16) => {
    if (!settings?.throttleAnimations) {
      callback();
      return;
    }

    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    };
  }, [settings?.throttleAnimations]);

  const requestIdleCallback = useCallback((callback: () => void) => {
    if (settings?.useRequestIdleCallback && 'requestIdleCallback' in window) {
      window.requestIdleCallback(callback);
    } else {
      setTimeout(callback, 0);
    }
  }, [settings?.useRequestIdleCallback]);

  return {
    capabilities,
    settings,
    isReady,
    throttledCallback,
    requestIdleCallback
  };
}