<template>
  <div class="widget">
    <h4 class="title">{{ widget.title || '标签云' }}</h4>
    <div class="tags">
      <RouterLink v-for="tag in tags" :key="tag.name" :to="`/tags/${tag.name}/`" class="tag">
        {{ tag.name }}<span class="count">{{ tag.count }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TaxonomyItem } from '../../composables/useBlogPosts';
import type { SidebarWidgetConfig } from '../../../node/config';

interface Props {
  widget: SidebarWidgetConfig;
  tags: TaxonomyItem[];
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

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag {
  background: #f3f4f6;
  color: #111827;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  text-decoration: none;
  display: inline-flex;
  gap: 0.35rem;
  align-items: center;
}

.count {
  color: #6b7280;
  font-size: 0.85rem;
}
</style>
