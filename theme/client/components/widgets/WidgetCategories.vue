<template>
  <div class="widget">
    <h4 class="title">{{ widget.title || '分类' }}</h4>
    <ul class="list">
      <li v-for="item in categories" :key="item.name">
        <RouterLink :to="`/categories/${item.name}/`">{{ item.name }}</RouterLink>
        <span class="badge">{{ item.count }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { TaxonomyItem } from '../../composables/useBlogPosts';
import type { SidebarWidgetConfig } from '../../../node/config';

interface Props {
  widget: SidebarWidgetConfig;
  categories: TaxonomyItem[];
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.widget {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);
}

.title {
  margin-bottom: 0.75rem;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.35rem;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  background: #eff6ff;
  color: #1d4ed8;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  font-size: 0.85rem;
}
</style>
