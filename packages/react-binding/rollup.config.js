import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";

const isDevelopment = process.env.ROLLUP_WATCH;

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    sourcemap: isDevelopment,
  },
  plugins: [
    typescript(),
    babel({
      babelHelpers: "inline",
    }),
  ],
  external: ["react"],
};
