import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    sourcemap: true,
  },
  plugins: [
    typescript(),
    babel({
      babelHelpers: "inline",
    }),
  ],
  external: ["react", "rxjs/operators", "rxjs" , "uuid"],
};
