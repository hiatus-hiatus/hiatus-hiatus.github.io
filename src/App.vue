<template>
  <router-view :key="$route.path" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Base",
});
</script>

<style></style>
