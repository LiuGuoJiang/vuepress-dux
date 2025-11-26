<template>
  <div class="widget">
    <h4 class="title">{{ widget.title || '友情链接' }}</h4>
    <ul class="list">
      <li v-for="link in links" :key="link.link">
        <a :href="link.link" target="_blank" rel="noopener">{{ link.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { SidebarWidgetConfig } from '../../../node/config';

interface FriendlyLink {
  text: string;
  link: string;
}

interface Props {
  widget: SidebarWidgetConfig;
}

const props = defineProps<Props>();
const links = (props.widget.payload?.links as FriendlyLink[]) ?? [];
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
</style>
