import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import typescript from "rollup-plugin-typescript";
import less from "rollup-plugin-less";
import json from "rollup-plugin-json";

export default {
  input: ["./src/index.js"],
  output: {
    file: "./dist/index.js",
    format: "umd",
    name: "experience",
  },
  plugins: [
    resolve(),
    less({
      output: resolve('dist/index.css'),
    }),
    typescript(),
    babel(),
    commonjs(),
    json(),
  ],
  // external: ["react", "react-dom"],
};