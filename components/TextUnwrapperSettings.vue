<template>
  <div class="text-unwrapper-settings">
    <button @click="showSettings = !showSettings" :class="{ opened: showSettings }">
      <fa icon="cog"/>
    </button>
    <transition name="slide">
      <label v-show="showSettings" class="text-unwrapper-settings-panel">
        Existing wrap width
        <input
          type="number"
          v-bind:value="value"
          v-on:input="$emit('input', $event.target.value)"
        >
      </label>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TextUnwrapperSettings',

  props: ['value'],

  data() {
    return {
      showSettings: true
    }
  }
}
</script>
