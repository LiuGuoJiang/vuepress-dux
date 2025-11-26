import type { DefaultThemeOptions } from '@vuepress/theme-default';

export type SidebarWidgetType =
  | 'profile'
  | 'recent'
  | 'tabs'
  | 'categories'
  | 'tags'
  | 'archive'
  | 'ad'
  | 'links'
  | 'qrcode';

export interface BannerItem {
  title: string;
  description?: string;
  link?: string;
  image?: string;
  badge?: string;
}

export interface FeatureCard {
  title: string;
  description?: string;
  link?: string;
  image?: string;
  tag?: string;
}

export interface SidebarWidgetConfig {
  type: SidebarWidgetType;
  title?: string;
  position?: 'main' | 'footer';
  payload?: Record<string, unknown>;
}

export interface AdSlotConfig {
  id: string;
  slot?: string;
  html?: string;
  image?: string;
  link?: string;
  position?: 'sidebar' | 'inline' | 'footer';
}

export interface DuxThemeBlogConfig {
  base: string;
  perPage?: number;
  highlight?: string[];
  carousel?: BannerItem[];
  ads?: AdSlotConfig[];
}

export interface DuxThemeOptions extends DefaultThemeOptions {
  blog?: DuxThemeBlogConfig;
  features?: FeatureCard[];
  sidebarWidgets?: SidebarWidgetConfig[];
  footer?: {
    message?: string;
    copyright?: string;
    links?: { text: string; link: string }[];
  };
  toc?: { enable: boolean; float?: boolean };
  analytics?: { provider: 'ga' | 'plausible' | 'umami'; options?: Record<string, unknown> };
}

export const defaultWidgets: SidebarWidgetConfig[] = [
  { type: 'profile' },
  { type: 'recent', title: '最新文章' },
  { type: 'tabs', title: '热门 / 随机' },
  { type: 'categories', title: '分类' },
  { type: 'tags', title: '标签云' },
];

export const resolveThemeOptions = (options: DuxThemeOptions = {}): DuxThemeOptions => ({
  sidebarWidgets: options.sidebarWidgets ?? defaultWidgets,
  blog: options.blog ?? { base: '/posts/', perPage: 10 },
  ...options,
});
