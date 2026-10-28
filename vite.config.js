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
          "@primary-color": "#EC8D57",
          "@body-background": "#FFF5EE",
          "@font-family": "'Open Sans', sans-serif",
          "@code-family": "'Open Sans', sans-serif",
          "@table-row-hover-bg": "#FCE3D2",
          "@table-padding-vertical": "10px",
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
