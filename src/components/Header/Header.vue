<template>
  <v-app-bar color="primary">
    <v-btn to="/main" color="secondary">{{ $t("home") }}</v-btn>
    <v-btn to="/main/users">{{ $t("users") }}</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
});
</script>

<style scoped lang="scss"></style>
