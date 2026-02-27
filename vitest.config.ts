import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    reporters: "verbose",
    watch: true,
    clearMocks: true,
    setupFiles: "./vitest.setup.ts",
    include: ["__tests__/integration/**/*.test.{ts,tsx}"],
  },
});
