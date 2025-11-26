import { defineUserConfig } from 'vuepress';
import duxTheme from '../../theme';
import type { DuxThemeOptions } from '../../theme/node/config';

const duxOptions: DuxThemeOptions = {
  logo: '/images/avatar.png',
  navbar: [
    { text: '首页', link: '/' },
    { text: '归档', link: '/archive/' },
    { text: '标签', link: '/tags/' },
  ],
  blog: {
    base: '/posts/',
    perPage: 6,
    carousel: [
      {
        title: 'VuePress DUX 主题',
        description: '对标 DUX Demo 的 VuePress 主题脚手架',
        link: '/posts/welcome.html',
        image: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=800&q=80',
        badge: '置顶',
      },
    ],
    ads: [
      {
        id: 'sidebar-1',
        image:
          'https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=540&q=80',
        link: 'https://themebetter.com/',
        position: 'sidebar',
      },
    ],
  },
  features: [
    { title: '置顶精选', description: '展示精选文章卡片', link: '/posts/welcome.html', tag: '精选' },
    { title: '广告位', description: '保留侧栏广告位插槽', link: '/ads/' },
  ],
  sidebarWidgets: [
    { type: 'profile', title: '关于本站' },
    { type: 'recent', title: '最新文章' },
    { type: 'tabs', title: '热门 / 随机' },
    { type: 'categories', title: '分类' },
    { type: 'tags', title: '标签云' },
    { type: 'ad', title: '广告赞助', payload: { id: 'sidebar-1' } },
    {
      type: 'links',
      title: '友情链接',
      payload: { links: [{ text: 'DUX Demo', link: 'https://demo.themebetter.com/dux/' }] },
    },
  ],
  footer: {
    message: 'Powered by VuePress & DUX',
    copyright: '© 2024 DUX Theme',
    links: [
      { text: 'GitHub', link: 'https://github.com' },
      { text: 'Demo', link: 'https://demo.themebetter.com/dux/' },
    ],
  },
};

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'DUX 主题 Demo',
  description: 'VuePress 版 DUX 主题示例站点',
  theme: duxTheme(duxOptions),
});
