
import { remoteConfig } from '@/lib/firebase'; // Assuming Remote Config is initialized
import { fetchAndActivate, getBoolean } from 'firebase/remote-config';

export const FEATURE_FLAGS = {
  AUDIO_TO_DEBRIEF: 'audio_to_debrief_enabled',
};

// Fetches the latest config
export async function updateFeatureFlags() {
  if (remoteConfig) {
    await fetchAndActivate(remoteConfig);
  }
}

// Checks if a feature is enabled
export function isFeatureEnabled(flag: string): boolean {
  if (!remoteConfig) return false;

  const value = getBoolean(remoteConfig, flag);
  return value;
}

// Initialize on load to get the latest flags
updateFeatureFlags();
