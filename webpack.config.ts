import { Configuration } from 'webpack';

const config: Configuration = {
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: '@graphql-tools/webpack-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.graphql', '.gql'],
  },
};

export default config;
