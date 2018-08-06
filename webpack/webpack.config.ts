import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration, Plugin, Resolve, Rule } from 'webpack';

const ROOT = path.resolve(__dirname, '../');
const OUTPUT_DESTINATION = path.resolve(ROOT, 'dist');
const IS_PROD = process.env.NODE_ENV === 'production';
const PUBLIC_PATH = IS_PROD ? '/assets/' : '/';

const entry = {
  app: './src/client/index.tsx'
};

const output = IS_PROD
  ? {
      path: OUTPUT_DESTINATION,
      filename: '[name]__[hash].js',
      chunkFilename: '[name]__[hash].js',
      publicPath: PUBLIC_PATH
    }
  : {
      path: OUTPUT_DESTINATION,
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: PUBLIC_PATH
    };

const tsLoader: Rule = {
  test: /\.tsx?$/,
  use: 'ts-loader'
};

const mode = IS_PROD ? 'production' : 'development';

const plugins: Plugin[] = [
  new HtmlWebpackPlugin({
    template: path.resolve(ROOT, 'src/client/index.html')
  })
];

const tsconfig = path.relative(ROOT, 'tsconfig.json');

const resolve: Resolve = {
  extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  plugins: [
    new TsconfigPathsPlugin({
      configFile: tsconfig
    })
  ]
};

const config: Configuration = {
  context: ROOT,
  mode,
  entry,
  output,
  module: {
    rules: [tsLoader]
  },
  plugins,
  resolve
};

export default config;
