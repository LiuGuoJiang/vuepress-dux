<template>
  <div class="hero-carousel">
    <div v-for="item in items" :key="item.title" class="slide">
      <img v-if="item.image" :src="item.image" :alt="item.title" class="cover" />
      <div class="overlay">
        <p v-if="item.badge" class="badge">{{ item.badge }}</p>
        <h2>{{ item.title }}</h2>
        <p class="description">{{ item.description }}</p>
        <RouterLink v-if="item.link" :to="item.link" class="cta">立即查看</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BannerItem } from '../../node/config';

interface Props {
  items: BannerItem[];
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.hero-carousel {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: linear-gradient(135deg, #f5f7ff, #e0e7ff);
  min-height: 260px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
}

.slide {
  position: relative;
  min-height: 260px;
}

.cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
  opacity: 0.85;
}

.overlay {
  position: relative;
  padding: 1.5rem;
  display: grid;
  gap: 0.35rem;
  max-width: 440px;
}

.badge {
  display: inline-flex;
  padding: 0.25rem 0.6rem;
  background: rgba(37, 99, 235, 0.12);
  color: #1d4ed8;
  border-radius: 999px;
  font-weight: 700;
}

.description {
  color: #111827;
}

.cta {
  display: inline-block;
  margin-top: 0.4rem;
  background: #111827;
  color: #fff;
  padding: 0.5rem 0.9rem;
  border-radius: 10px;
}
</style>
