import type { Plugin } from 'vuepress';
import type { DuxThemeOptions } from './config';

export const createDuxPlugins = (options: DuxThemeOptions): Plugin[] => {
  const plugins: Plugin[] = [];

  if (options.blog?.ads?.length) {
    plugins.push({
      name: 'dux-ad-slots',
      define: {
        __DUX_AD_SLOTS__: options.blog.ads,
      },
    });
  }

  return plugins;
};
