import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ['./testSetup.js'],
    testMatch: ['./src/**/*.test.jsx'],
    coverage: {
      all: true,
      include: ["src/**/*"],
      exclude: [
        "node_modules",
        "build",
        "dist",
        "vite.config.ts",
        "plugin",
        "**/*spec.ts",
        "**/*test.ts",
      ],
      provider: "istanbul",
      reporter: ["json", "html", "text", "text-summary"],
      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100,
    },
  }
})