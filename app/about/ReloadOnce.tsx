"use client";
import { useEffect } from "react";

export default function ReloadOnce() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const KEY = "about_reload_done";
    const TIMESTAMP_KEY = "about_reload_timestamp";
    const currentTime = Date.now();
    const lastReloadTime = sessionStorage.getItem(TIMESTAMP_KEY);
    const hasReloaded = sessionStorage.getItem(KEY);
    
    console.log('ReloadOnce effect:', {
      currentTime,
      lastReloadTime,
      timeDiff: lastReloadTime ? currentTime - parseInt(lastReloadTime) : null,
      hasReloaded
    });
    
    // If we reloaded less than 2 seconds ago, skip
    if (lastReloadTime && currentTime - parseInt(lastReloadTime) < 2000) {
      console.log('Skipping - just reloaded');
      return;
    }
    
    // If enough time passed, clear the flag
    if (lastReloadTime && currentTime - parseInt(lastReloadTime) >= 2000) {
      console.log('Clearing flag - enough time passed');
      sessionStorage.removeItem(KEY);
    }
    
    // Check if already reloaded
    if (sessionStorage.getItem(KEY) === "1") {
      console.log('Already reloaded, skipping');
      return;
    }
    
    console.log('Reloading now...');
    sessionStorage.setItem(KEY, "1");
    sessionStorage.setItem(TIMESTAMP_KEY, currentTime.toString());
    window.location.reload();
  }, []);
  
  return null;
}