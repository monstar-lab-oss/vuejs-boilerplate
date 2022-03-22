<template>
  <v-footer class="footer">
    <p class="text-body-2">{{ $t("footer") }}</p>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>

<style scoped lang="scss">
.footer {
  flex-grow: 0;
  justify-content: center;
}
</style>
