<template>
  <div class="widget">
    <h4 class="title">{{ widget.title || '热门 / 随机' }}</h4>
    <div class="tabs">
      <button
        v-for="tab in tabNames"
        :key="tab"
        :class="['tab', { active: activeTab === tab }]"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>
    <ul class="list">
      <li v-for="post in visiblePosts" :key="post.link">
        <RouterLink :to="post.link">{{ post.title }}</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { PostLite } from '../../composables/useBlogPosts';
import type { SidebarWidgetConfig } from '../../../node/config';

interface Props {
  widget: SidebarWidgetConfig;
  posts: PostLite[];
}

const props = defineProps<Props>();
const tabNames = ['热门', '随机'];
const activeTab = ref('热门');

const visiblePosts = computed(() => {
  const source = activeTab.value === '热门' ? props.posts : [...props.posts].sort(() => 0.5 - Math.random());
  return source.slice(0, 5);
});
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

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.tab {
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  padding: 0.35rem 0.65rem;
  border-radius: 8px;
  cursor: pointer;
}

.tab.active {
  background: #111827;
  color: #fff;
  border-color: #111827;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.5rem;
}
</style>
