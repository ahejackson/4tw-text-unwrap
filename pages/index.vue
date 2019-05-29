<template>
  <section class="page">
    <section class="header">
      <h1 class="title">
        <span class="title-first">Text</span>
        <span class="title-last">Unwrap</span>
      </h1>
      <p>Choose a file to automatically unwrap and download or paste wrapped text below.</p>
    </section>
    <TextUnwrapper></TextUnwrapper>
  </section>
</template>

<script>
import TextUnwrapper from '@/components/TextUnwrapper.vue'

export default {
  components: {
    TextUnwrapper
  }
}
</script>
