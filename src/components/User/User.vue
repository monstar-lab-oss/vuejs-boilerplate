<template>
  <v-list-item>
    <v-list-item-avatar left>
      <v-avatar>
        <app-image-loader
          v-if="avatar || loading"
          :loading="loading"
          :src="avatar"
          :alt="`${firstName} ${lastName}`"
        />
        <span v-else>{{ alt }}</span>
      </v-avatar>
    </v-list-item-avatar>
    <v-list-item-header>
      <v-list-item-title>{{ firstName }} {{ lastName }}</v-list-item-title>
      <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
    </v-list-item-header>
  </v-list-item>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "User",
  props: {
    avatar: String,
    email: String,
    loading: Boolean,
    firstName: String,
    lastName: String,
  },
  setup(props) {
    const alt = computed(() => {
      return (
        (props.firstName ? props.firstName.substring(0, 1) : "") +
        (props.lastName ? props.lastName.substring(0, 1) : "")
      );
    });
    return {
      alt,
    };
  },
});
</script>

<style scoped lang="scss"></style>
