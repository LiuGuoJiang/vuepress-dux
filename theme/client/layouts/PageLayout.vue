<template>
  <div class="dux-page">
    <Navbar />
    <main class="dux-main">
      <header class="page-header">
        <h1>{{ page.title }}</h1>
        <p v-if="frontmatter.description" class="description">{{ frontmatter.description }}</p>
        <div class="meta" v-if="frontmatter.date || frontmatter.tags?.length || frontmatter.categories?.length">
          <span v-if="frontmatter.date">发布日期：{{ frontmatter.date }}</span>
          <span v-if="frontmatter.categories?.length">分类：{{ frontmatter.categories.join(', ') }}</span>
          <span v-if="frontmatter.tags?.length">标签：{{ frontmatter.tags.join(', ') }}</span>
        </div>
      </header>
      <article class="page-body">
        <Content />
      </article>
      <FooterBar :footer="footer" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Content, usePageData, usePageFrontmatter, useSiteLocaleData, useThemeData } from 'vuepress/client';
import Navbar from '../components/Navbar.vue';
import FooterBar from '../components/FooterBar.vue';
import type { DuxThemeOptions } from '../../node/config';

const page = usePageData();
const frontmatter = usePageFrontmatter<Record<string, any>>();
const site = useSiteLocaleData();
const theme = useThemeData<DuxThemeOptions>();

const footer = computed(() => frontmatter.value.footer ?? site.value.footer ?? theme.value.footer ?? {});
</script>

<style scoped lang="scss">
.dux-main {
  max-width: 840px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
}

.page-header {
  margin-bottom: 1.5rem;
}

.page-body {
  background: var(--body-bg, #fff);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.description {
  color: #4b5563;
}

.meta {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  color: #6b7280;
  font-size: 0.95rem;
}
</style>
