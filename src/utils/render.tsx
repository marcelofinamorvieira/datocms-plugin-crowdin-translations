import type React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Container not found');
}

const root = createRoot(container);

export function render(component: React.ReactNode): void {
  root.render(<StrictMode>{component}</StrictMode>);
}
