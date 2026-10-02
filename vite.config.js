import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Most files under src/ use the .js extension but contain JSX. Vite's default
// esbuild transform only auto-applies JSX parsing to .jsx/.tsx, so force it here
// instead of renaming ~200 files.
export default defineConfig({
  plugins: [react({ include: "**/*.{js,jsx}" })],
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          "@primary-color": "#04908b",
          "@body-background": "#f6f6f6",
          "@font-family": "'Open Sans', sans-serif",
          "@table-row-hover-bg": "#eaf4f4",
          "@table-padding-vertical": "5px",
          "@table-padding-horizontal": "5px",
          "@table-border-color": "#dee6e6",
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 3000,
  },
});
