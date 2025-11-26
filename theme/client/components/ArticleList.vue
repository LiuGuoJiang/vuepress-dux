<template>
  <div class="article-list">
    <article v-for="post in posts" :key="post.link" class="card">
      <RouterLink :to="post.link" class="thumb">
        <img v-if="post.cover" :src="post.cover" :alt="post.title" loading="lazy" />
        <div v-else class="placeholder" />
      </RouterLink>
      <div class="meta">
        <p class="date" v-if="post.date">{{ post.date }}</p>
        <RouterLink :to="post.link" class="title">{{ post.title }}</RouterLink>
        <p v-if="post.excerpt" class="excerpt">{{ post.excerpt }}</p>
        <div class="chips">
          <span v-for="cat in post.categories" :key="cat" class="chip">{{ cat }}</span>
          <span v-for="tag in post.tags" :key="tag" class="chip muted">#{{ tag }}</span>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { PostLite } from '../composables/useBlogPosts';

interface Props {
  posts: PostLite[];
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.article-list {
  display: grid;
  gap: 1rem;
}

.card {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 1rem;
  background: #fff;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);
}

.thumb {
  position: relative;
  display: block;
}

.thumb img,
.placeholder {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
}

.meta {
  display: grid;
  gap: 0.35rem;
}

.title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #111827;
  text-decoration: none;
}

.excerpt {
  color: #4b5563;
}

.chips {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.chip {
  background: #eff6ff;
  color: #1d4ed8;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.9rem;
}

.chip.muted {
  background: #f3f4f6;
  color: #374151;
}

@media (max-width: 720px) {
  .card {
    grid-template-columns: 1fr;
  }
}
</style>
