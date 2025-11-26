<template>
  <div class="site-card">
    <img v-if="site.logo" :src="site.logo" alt="logo" class="avatar" />
    <h3>{{ site.title }}</h3>
    <p v-if="site.description" class="desc">{{ site.description }}</p>
    <RouterLink to="/about/" class="cta">关于我</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useSiteData } from 'vuepress/client';

const site = useSiteData();
</script>

<style scoped lang="scss">
.site-card {
  background: #fff;
  border-radius: 14px;
  padding: 1.25rem 1rem;
  text-align: center;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
}

.desc {
  color: #4b5563;
}

.cta {
  display: inline-block;
  margin-top: 0.75rem;
  padding: 0.4rem 0.9rem;
  background: #111827;
  color: #fff;
  border-radius: 10px;
}
</style>
