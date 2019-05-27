<template>
  <label class="text-reader">
    <slot>Read File</slot>
    <input type="file" @change="loadTextFromFile">
  </label>
</template>

<script>
export default {
  name: 'TextReader',

  methods: {
    loadTextFromFile(ev) {
      const file = ev.target.files[0]
      const reader = new FileReader()

      reader.onload = e => this.$emit('load', e.target.result)
      reader.readAsText(file)
    }
  }
}
</script>
