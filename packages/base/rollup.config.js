import typescript from "@rollup/plugin-typescript";
import postcss from 'rollup-plugin-postcss';

const isDevelopment = process.env.ROLLUP_WATCH;

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    sourcemap: isDevelopment
  },
  plugins: [
    typescript(),
    postcss({
      plugins: [],
    }),
  ],
};
