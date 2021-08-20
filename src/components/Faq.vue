<template>
  <div style="text-align: left">


    <section v-for="item in items">
      <h1>
        {{ item.question }}
      </h1>
      <p>{{ item.answer }}</p>
    </section>
  </div>
</template>

<script lang="ts">

import {defineComponent, PropType} from "vue";

export default defineComponent({
  name: "Faq",
  props: {
    items: {
      type: Object as PropType<FaqItem>,
      required: true
    },
  },
});
</script>

<style scoped>

</style>