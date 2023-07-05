<template>
  <div class="main">
    <Header />
    <v-sheet rounded class="main_content fade_container">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Header from "@/components/Header/Header.vue";

onMounted(() => {
  console.log("mounted", this);
});
/*
export default defineComponent({
  name: "Main",
  components: {
    Header,
  },
  mounted() {
    console.log("mounted", this.$t("createAccount"));
  },
});
*/
</script>


<style scoped lang="scss">
.main {
  &_content {
    margin: 20px;
    flex: 1;
  }
}
</style>