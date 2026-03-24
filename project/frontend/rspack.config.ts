import { defineConfig } from '@rspack/cli';
import { rspack, type SwcLoaderOptions } from '@rspack/core';
import { ReactRefreshRspackPlugin } from '@rspack/plugin-react-refresh';
import { TsCheckerRspackPlugin } from 'ts-checker-rspack-plugin';
import path from 'path';
import ESLintPlugin from 'eslint-rspack-plugin';

const isDev = process.env.NODE_ENV === 'development';

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ['last 2 versions', '> 0.2%', 'not dead', 'Firefox ESR'];

export default defineConfig({
  entry: {
    main: './src/main.tsx',
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      // 👇 ПРАВИЛА ДЛЯ CSS (ДОБАВЛЕНО)
      {
        test: /\.module\.css$/,
        type: 'css/module', // CSS Modules
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        type: 'css', // Обычные CSS
      },

      // 👇 ОСТАЛЬНЫЕ ПРАВИЛА
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: { targets },
            } satisfies SwcLoaderOptions,
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    new TsCheckerRspackPlugin({
      typescript: {
        configFile: './tsconfig.json',
      },
    }),
    new ESLintPlugin({
      configType: 'flat',
      extensions: ['ts', 'tsx'],
    }),
    isDev ? new ReactRefreshRspackPlugin() : null,
  ],
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  experiments: {
    css: true, // 👈 Оставляем включённым
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    open: true,
    client: {
      logging: 'error',
    },
  },
});
