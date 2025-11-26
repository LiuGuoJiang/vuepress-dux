import { path } from '@vuepress/utils';
import { defaultTheme } from '@vuepress/theme-default';
import type { Theme } from 'vuepress';
import { createDuxPlugins } from './node/plugins';
import { resolveThemeOptions, type DuxThemeOptions } from './node/config';

export const duxTheme = (options: DuxThemeOptions = {}): Theme => {
  const resolved = resolveThemeOptions(options);
  const baseTheme = defaultTheme(resolved);

  return {
    name: 'vuepress-theme-dux',
    extends: baseTheme,
    layouts: {
      Layout: path.resolve(__dirname, './client/layouts/PageLayout.vue'),
      HomeLayout: path.resolve(__dirname, './client/layouts/HomeLayout.vue'),
    },
    clientConfigFile: path.resolve(__dirname, './client/config.ts'),
    plugins: createDuxPlugins(resolved),
  };
};

export default duxTheme;
