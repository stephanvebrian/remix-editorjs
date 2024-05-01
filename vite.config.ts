import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { flatRoutes } from "remix-flat-routes";

export default defineConfig({
  plugins: [
    remix({
      routes: async (definedRoutes) => {
        return flatRoutes("routes", definedRoutes);
      },
    }),
    tsconfigPaths(),
  ],
  ssr: {
    noExternal: [
      // MDX:
      /^rehype.*/,
      /^remark.*/,
      /^unified.*/,
      /^unist.*/,
      /^mdast.*/,
      /^micromark.*/,
      "devlop",
      "ccount",
      "markdown-table",
      "zwitch",
      "fault",
      "decode-named-character-reference",
      "longest-streak",
      "character-entities",
    ],
  },
});
