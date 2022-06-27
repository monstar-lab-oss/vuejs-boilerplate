<template>
  <div
    class="imageLoader"
    :class="{ 'imageLoader-loading': loading || imgLoading }"
    ref="imageLoader"
  >
    <img
      v-if="src && !imgError"
      :src="src"
      :alt="alt"
      @click="handleImageLoad"
      @load="handleImageLoad"
      @onLoad="handleImageLoad"
      @error="handleImageError"
      @onError="handleImageError"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const imgLoading = ref(true);
const imgError = ref(false);

function handleImageLoad() {
  imgLoading.value = false;
}

function handleImageError() {
  imgError.value = true;
}

watch(
  () => props.src,
  () => {
    imgLoading.value = true;
    imgError.value = false;
  }
);
</script>

<style lang="scss" scoped>
.imageLoader {
  overflow: hidden;
  position: relative;
  display: block;
  background-color: #eee;
  width: 100%;
  height: 100%;
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity 0.2s cubic-bezier(0.25, 0.8, 0.5, 1);
    opacity: 0;
  }
  &:before {
    background-color: #eee;
  }
  &:after {
    background: linear-gradient(
      90deg,
      transparent,
      hsla(0, 0%, 100%, 0.3),
      transparent
    );
    animation: loading 1.5s infinite;
    transform: translateX(-100%);
    z-index: 1;
  }
  &-loading {
    &:before,
    &:after {
      opacity: 1;
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>
