import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import del from "rollup-plugin-delete";

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: true,
    },
  ],
  external: ["@radix-ui/react-select", "classnames", "react", "react-aria-components", "react-dom", "zod"],
  plugins: [
    del({ targets: 'dist/*' }),
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    copy({
      targets: [
        {
          src: 'src/**/*.scss',
          dest: "dist",
          rename (name, extension, fullPath) {
            fullPath = fullPath.replace("src/", "");
            fullPath = fullPath.replace(`/${name}.${extension}`, "")
            // Preserve the directory structure when copying the file.
            return `${fullPath}/${name}.${extension}`
          }
        },
      ]
    })
  ],
};
