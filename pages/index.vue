<template>
  <section class="container">
    <div>
      <h1 class="title">Text Unwrap</h1>
      <h2 class="subtitle">Unwrap exported 4tw text files</h2>
      <TextUnwrapper></TextUnwrapper>
    </div>
  </section>
</template>

<script>
import TextUnwrapper from '~/components/TextUnwrapper.vue'

export default {
  components: {
    TextUnwrapper
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 1.5rem;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 1.25rem;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
