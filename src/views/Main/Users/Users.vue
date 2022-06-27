<template>
  <div class="users">
    <h2 class="text-h2">{{ $t("users") }}</h2>
    <app-user
      v-for="user in users.data"
      :avatar="user.avatar"
      :email="user.email"
      :loading="loading"
      :firstName="user.firstName"
      :lastName="user.lastName"
      :key="user.id"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { Users } from "@/models/users.types";

const users = ref({} as Users);
const loading = ref(false);

async function fetchData() {
  loading.value = false;
  const url = `${import.meta.env.VITE_API_HOST}users`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    users.value = json;
    loading.value = false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
  }
}

onBeforeMount(() => {
  fetchData();
});
</script>
