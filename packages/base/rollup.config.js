import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    sourcemap: true
  },
  external: ['rxjs', 'uuid', 'rxjs/operators'],
  plugins: [
    typescript(),
    postcss({
      plugins: [],
    }),
  ],
};
