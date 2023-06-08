// import webpack from  'webpack';
import path from "node:path";
import CopyPlugin from "copy-webpack-plugin";

import * as url from 'node:url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/**
 *
 * @param environment
 * @param argv
 */
export default function config(environment, argv) {
  const production = argv.mode === "production";
  return {
    mode: production ? "production" : "development",
    devtool: "cheap-source-map",
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "split-activity.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            // you may want to bundle SLDS SASS files with webpack,
            // we'll keep things simple for this example and just copy SLDS into dist
            from: path.resolve(__dirname,
              "../../node_modules/@salesforce-ux/design-system/assets"
            ),
            to: path.resolve(__dirname,"dist/design-system"),
          },
        ],
      }),
    ],
  };
}
