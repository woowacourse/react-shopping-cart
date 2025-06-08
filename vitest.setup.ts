import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock fetch for tests
global.fetch = vi.fn();

// Setup for tests
beforeEach(() => {
  vi.clearAllMocks();
});
