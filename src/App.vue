<template>
  <v-app>
    <v-main class="main">
      <div class="fade_container">
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
      <Footer />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Footer from "@/components/Footer/Footer.vue";

export default defineComponent({
  name: "App",
  components: {
    Footer,
  },
});
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
}
</style>
