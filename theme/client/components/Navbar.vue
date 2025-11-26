<template>
  <header class="dux-navbar">
    <div class="brand">
      <RouterLink to="/">
        <img v-if="site.logo" :src="site.logo" alt="logo" class="logo" />
        <span class="title">{{ site.title }}</span>
      </RouterLink>
    </div>
    <nav class="menu" v-if="navItems.length">
      <RouterLink v-for="item in navItems" :key="item.text" :to="item.link" class="menu-item">
        {{ item.text }}
      </RouterLink>
    </nav>
    <div class="actions">
      <button class="search">搜索</button>
      <a v-if="theme.repo" :href="theme.repo" class="repo" target="_blank" rel="noopener">GitHub</a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSiteData, useThemeData } from 'vuepress/client';
import type { DuxThemeOptions } from '../../node/config';

const site = useSiteData();
const theme = useThemeData<DuxThemeOptions>();

const navItems = computed(() => theme.value.navbar ?? (site.value.themeConfig as any)?.navbar ?? []);
</script>

<style scoped lang="scss">
.dux-navbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
}

.logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
}

.menu {
  display: inline-flex;
  gap: 0.75rem;
  font-weight: 600;
  align-items: center;
}

.menu-item {
  color: inherit;
  text-decoration: none;
  padding: 0.35rem 0.5rem;
  border-radius: 8px;
}

.menu-item.router-link-active {
  color: #2563eb;
  background: #eef2ff;
}

.actions {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.search {
  padding: 0.4rem 0.75rem;
  background: #111827;
  color: white;
  border-radius: 10px;
  border: none;
}

.repo {
  color: #2563eb;
  font-weight: 600;
}
</style>
