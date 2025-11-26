import { computed, onMounted, ref, watch } from 'vue';
import { usePagesData, useThemeData } from 'vuepress/client';
import type { Ref } from 'vue';
import type { DuxThemeOptions } from '../../node/config';

export interface PostLite {
  title: string;
  link: string;
  date?: string;
  excerpt?: string;
  cover?: string;
  categories?: string[];
  tags?: string[];
}

export interface TaxonomyItem {
  name: string;
  count: number;
}

const normalizeArray = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === 'string') return value.split(',').map((item) => item.trim());
  return [];
};

export const useBlogPosts = (frontmatter: Ref<Record<string, unknown>>) => {
  const theme = useThemeData<DuxThemeOptions>();
  const pagesData = usePagesData();
  const loadedPosts = ref<PostLite[]>([]);

  const frontmatterPosts = computed(() => (frontmatter.value.posts as PostLite[]) ?? []);

  const loadPostsFromPages = async () => {
    const base = theme.value.blog?.base ?? '/posts/';
    const entries = Object.entries(pagesData.value);
    const list: PostLite[] = [];

    for (const [path, loader] of entries) {
      if (!path.startsWith(base)) continue;
      const data = await loader();
      const fm = (data as any).frontmatter ?? {};
      const tags = normalizeArray((fm as any).tags ?? (fm as any).tag);
      const categories = normalizeArray((fm as any).categories ?? (fm as any).category);

      list.push({
        title: (data as any).title ?? (fm as any).title ?? path,
        link: (data as any).path ?? path,
        date: (fm as any).date ?? (fm as any).updated,
        excerpt: (fm as any).excerpt ?? (fm as any).summary ?? (fm as any).description,
        cover: (fm as any).cover ?? (fm as any).image,
        categories,
        tags,
      });
    }

    list.sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : 0;
      const bTime = b.date ? new Date(b.date).getTime() : 0;
      return bTime - aTime;
    });

    loadedPosts.value = list;
  };

  onMounted(loadPostsFromPages);
  watch(
    () => theme.value.blog,
    () => {
      void loadPostsFromPages();
    },
    { deep: true }
  );

  const posts = computed(() => (frontmatterPosts.value.length ? frontmatterPosts.value : loadedPosts.value));

  const tags = computed<TaxonomyItem[]>(() => {
    const map = new Map<string, number>();
    posts.value.forEach((post) => {
      post.tags?.forEach((tag) => map.set(tag, (map.get(tag) ?? 0) + 1));
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  });

  const categories = computed<TaxonomyItem[]>(() => {
    const map = new Map<string, number>();
    posts.value.forEach((post) => {
      post.categories?.forEach((cat) => map.set(cat, (map.get(cat) ?? 0) + 1));
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  });

  return { posts, tags, categories };
};
