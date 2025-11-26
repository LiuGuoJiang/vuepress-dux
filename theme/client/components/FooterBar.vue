<template>
  <footer class="dux-footer">
    <div v-if="footer.message" class="message">{{ footer.message }}</div>
    <div v-if="footer.links?.length" class="links">
      <RouterLink v-for="link in footer.links" :key="link.link" :to="link.link">
        {{ link.text }}
      </RouterLink>
    </div>
    <div class="copyright">{{ footer.copyright || `© ${new Date().getFullYear()}` }}</div>
  </footer>
</template>

<script setup lang="ts">
interface FooterInfo {
  message?: string;
  links?: { text: string; link: string }[];
  copyright?: string;
}

interface Props {
  footer?: FooterInfo;
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.dux-footer {
  margin-top: 2rem;
  padding: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  text-align: center;
  color: #4b5563;
}

.links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 0.5rem 0;
}
</style>
