<template>
  <div class="app">
    <router-view :key="$route.path" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style></style>
