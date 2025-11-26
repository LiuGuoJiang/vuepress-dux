<template>
  <div class="widget ad" v-if="content">
    <h4 v-if="widget.title" class="title">{{ widget.title }}</h4>
    <div v-if="content.html" class="html" v-html="content.html" />
    <RouterLink v-else-if="content.image" :to="content.link || '#'" class="image-slot">
      <img :src="content.image" :alt="content.id" loading="lazy" />
    </RouterLink>
    <p v-else class="placeholder">{{ content.slot || '广告位' }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { AdSlotConfig, SidebarWidgetConfig } from '../../../node/config';

interface Props {
  widget: SidebarWidgetConfig;
  ads?: AdSlotConfig[];
}

const props = defineProps<Props>();

const content = computed(() => {
  if (!props.ads?.length) return props.widget.payload as AdSlotConfig | undefined;
  if (props.widget.payload?.id) {
    return props.ads.find((ad) => ad.id === props.widget.payload?.id);
  }
  return props.ads.find((ad) => ad.position === 'sidebar') ?? props.ads[0];
});
</script>

<style scoped lang="scss">
.widget {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);
}

.image-slot img {
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
}

.placeholder {
  color: #6b7280;
  text-align: center;
}
</style>
