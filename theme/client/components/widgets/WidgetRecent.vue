<template>
  <div class="widget">
    <h4 class="title">{{ widget.title || '最新文章' }}</h4>
    <ul class="list">
      <li v-for="post in recent" :key="post.link">
        <RouterLink :to="post.link">{{ post.title }}</RouterLink>
        <small v-if="post.date">{{ post.date }}</small>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PostLite } from '../../composables/useBlogPosts';
import type { SidebarWidgetConfig } from '../../../node/config';

interface Props {
  widget: SidebarWidgetConfig;
  posts: PostLite[];
}

const props = defineProps<Props>();
const recent = computed(() => props.posts.slice(0, 5));
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
  display: grid;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: grid;
  gap: 0.2rem;
}

small {
  color: #6b7280;
}
</style>
