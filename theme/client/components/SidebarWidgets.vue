<template>
  <div class="sidebar-widgets">
    <component
      v-for="(widget, index) in widgets"
      :is="resolveWidget(widget)"
      :key="index"
      :widget="widget"
      :posts="posts"
      :tags="tags"
      :categories="categories"
      :ads="ads"
    />
  </div>
</template>

<script setup lang="ts">
import SiteInfoCard from './SiteInfoCard.vue';
import WidgetRecent from './widgets/WidgetRecent.vue';
import WidgetTabs from './widgets/WidgetTabs.vue';
import WidgetCategories from './widgets/WidgetCategories.vue';
import WidgetTags from './widgets/WidgetTags.vue';
import WidgetAd from './widgets/WidgetAd.vue';
import WidgetLinks from './widgets/WidgetLinks.vue';
import type {
  AdSlotConfig,
  SidebarWidgetConfig,
} from '../../node/config';
import type { PostLite, TaxonomyItem } from '../composables/useBlogPosts';

interface Props {
  widgets: SidebarWidgetConfig[];
  posts: PostLite[];
  tags: TaxonomyItem[];
  categories: TaxonomyItem[];
  ads?: AdSlotConfig[];
}

const props = defineProps<Props>();

const resolveWidget = (widget: SidebarWidgetConfig) => {
  switch (widget.type) {
    case 'profile':
      return SiteInfoCard;
    case 'recent':
      return WidgetRecent;
    case 'tabs':
      return WidgetTabs;
    case 'categories':
      return WidgetCategories;
    case 'tags':
      return WidgetTags;
    case 'ad':
      return WidgetAd;
    case 'links':
      return WidgetLinks;
    default:
      return {
        props: ['widget'],
        template: `<div class="placeholder">{{ widget.title || 'Widget' }}</div>`,
      } as any;
  }
};
</script>

<style scoped lang="scss">
.sidebar-widgets {
  display: grid;
  gap: 0.8rem;
  position: sticky;
  top: 4.5rem;
}

.placeholder {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  min-height: 80px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.04);
}
</style>
