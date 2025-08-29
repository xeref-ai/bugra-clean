
export const featureFlags = {
  isActivityPageEnabled: () => process.env.ACTIVITY_ENABLED === 'true',
  isPublicActivityPageEnabled: () => process.env.NEXT_PUBLIC_ACTIVITY_ENABLED === 'true',
};
