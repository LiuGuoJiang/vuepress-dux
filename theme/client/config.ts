import { defineClientConfig } from 'vuepress/client';
import HeroCarousel from './components/HeroCarousel.vue';
import ArticleList from './components/ArticleList.vue';
import SidebarWidgets from './components/SidebarWidgets.vue';
import FooterBar from './components/FooterBar.vue';
import './styles/index.scss';

export default defineClientConfig({
  enhance({ app }) {
    app.component('HeroCarousel', HeroCarousel);
    app.component('ArticleList', ArticleList);
    app.component('SidebarWidgets', SidebarWidgets);
    app.component('FooterBar', FooterBar);
  },
});
