<template>
  <div class="dux-page">
    <Navbar />
    <main class="dux-main">
      <section class="hero">
        <HeroCarousel v-if="carousel?.length" :items="carousel" />
        <FeatureCards v-if="features?.length" :items="features" />
      </section>
      <section class="content">
        <div class="article-column">
          <ArticleList :posts="posts" />
        </div>
        <aside class="sidebar">
          <SidebarWidgets
            :widgets="widgets"
            :posts="posts"
            :tags="tags"
            :categories="categories"
            :ads="ads"
          />
        </aside>
      </section>
    </main>
    <FooterBar :footer="footer" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePageFrontmatter, useSiteLocaleData, useThemeData } from 'vuepress/client';
import Navbar from '../components/Navbar.vue';
import FeatureCards from '../components/FeatureCards.vue';
import { useBlogPosts } from '../composables/useBlogPosts';
import type {
  AdSlotConfig,
  BannerItem,
  FeatureCard,
  SidebarWidgetConfig,
  DuxThemeOptions,
} from '../../node/config';

const frontmatter = usePageFrontmatter<Record<string, unknown>>();
const site = useSiteLocaleData();
const theme = useThemeData<DuxThemeOptions>();
const { posts, tags, categories } = useBlogPosts(frontmatter);

const carousel = computed<BannerItem[]>(() =>
  (frontmatter.value.carousel as BannerItem[]) ?? theme.value.blog?.carousel ?? []
);
const features = computed<FeatureCard[]>(() =>
  (frontmatter.value.features as FeatureCard[]) ?? theme.value.features ?? []
);
const footer = computed(() => frontmatter.value.footer ?? site.value.footer ?? theme.value.footer ?? {});
const widgets = computed<SidebarWidgetConfig[]>(
  () => (frontmatter.value.sidebarWidgets as SidebarWidgetConfig[]) ?? theme.value.sidebarWidgets ?? []
);
const ads = computed<AdSlotConfig[]>(() => theme.value.blog?.ads ?? []);
</script>

<style scoped lang="scss">
.dux-page {
  min-height: 100vh;
  background: var(--dux-bg, #f7f9fc);
  color: var(--text-color, #1f2937);
}

.dux-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
}

.content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.article-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sidebar {
  position: relative;
}

@media (max-width: 1024px) {
  .hero,
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
