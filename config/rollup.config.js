import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import typescript from "rollup-plugin-typescript";
import less from "rollup-plugin-less";
import json from "rollup-plugin-json";
import replace from "rollup-plugin-replace";

const env = process.env.NODE_ENV;

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
    // replace({
    //   'process.env.NODE_ENV': JSON.stringify(env),
    // }),
    commonjs(),
    json(),
  ],
  // external: ["react", "react-dom"],
};