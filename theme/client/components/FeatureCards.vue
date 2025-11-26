<template>
  <div class="feature-cards">
    <article v-for="item in items" :key="item.title" class="card">
      <p v-if="item.tag" class="tag">{{ item.tag }}</p>
      <h3>{{ item.title }}</h3>
      <p class="description">{{ item.description }}</p>
      <RouterLink v-if="item.link" :to="item.link" class="cta">查看</RouterLink>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { FeatureCard } from '../../node/config';

interface Props {
  items: FeatureCard[];
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.feature-cards {
  display: grid;
  gap: 0.75rem;
}

.card {
  background: #fff;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
}

.tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: #eff6ff;
  color: #1d4ed8;
  border-radius: 6px;
  font-size: 0.85rem;
}

.description {
  color: #4b5563;
}

.cta {
  display: inline-block;
  margin-top: 0.5rem;
  color: #2563eb;
}
</style>
