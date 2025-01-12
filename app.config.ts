import { defineConfig } from '@tanstack/start/config';
import tsConfigPaths from 'vite-tsconfig-paths';
export default defineConfig({
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
  server: {
    compatibilityDate: '2024-12-01',
    esbuild: {
      options: {
        target: 'ES2022',
      },
    },
    experimental: { asyncContext: true },
    preset: 'aws-lambda',
    awsLambda: { streaming: false },
  },
});
