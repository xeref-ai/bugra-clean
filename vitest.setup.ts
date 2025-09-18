
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// This is a more robust mock for Firebase Analytics.
// It prevents the SDK from trying to initialize or make network requests in the test environment.
vi.mock('firebase/analytics', async () => {
    const original = await vi.importActual('firebase/analytics');
    return {
        ...original,
        getAnalytics: vi.fn(() => null), // Return null to prevent initialization
        isSupported: vi.fn(() => Promise.resolve(false)),
        logEvent: vi.fn(),
        setAnalyticsCollectionEnabled: vi.fn(),
    };
});
