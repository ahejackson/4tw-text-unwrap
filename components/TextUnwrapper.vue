<template>
  <div class="text-unwrapper">
    <section class="text-unwrapper-loadfile">
      <text-reader @load="loadfile($event)">
        <fa icon="file-upload"/>Upload File
      </text-reader>
    </section>

    <section class="text-unwrapper-textarea-section">
      <textarea
        v-model="text"
        placeholder="Paste text to unwrap here"
        class="text-unwrapper-textarea"
        :style="textAreaWidth"
      ></textarea>
    </section>

    <section class="text-unwrapper-controls">
      <button type="button" @click="unwrap">
        <fa icon="align-left"/>Unwrap
      </button>
      <button type="button" @click="download">
        <fa icon="download"/>Download
      </button>
      <button
        type="button"
        v-clipboard:copy="text"
        v-clipboard:success="copySuccess"
        v-clipboard:error="copyError"
      >
        <fa icon="copy"/>Copy Text
      </button>
    </section>

    <section class="text-unwrapper-settings-section">
      <text-unwrapper-settings v-model.number="linewidth"/>
    </section>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'

import TextReader from '@/components/TextReader.vue'
import TextUnwrapperSettings from '@/components/TextUnwrapperSettings.vue'

const cleaner = new RegExp(String.fromCharCode(160), 'g')

export default {
  name: 'TextUnwrapper',

  components: {
    TextReader,
    TextUnwrapperSettings
  },

  data() {
    return {
      text: '',
      linewidth: this.wrapwidth
    }
  },

  props: {
    wrapwidth: {
      type: Number,
      default: 70
    }
  },

  computed: {
    textAreaWidth: function() {
      return `max-width: ${this.linewidth + 16}ch;`
    }
  },

  methods: {
    copySuccess: function(e) {
      // alert('You just copied: ' + e.text)
    },

    copyError: function(e) {
      // alert('Failed to copy text')
    },

    download: function() {
      let blob = new Blob([this.text], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, 'unwrapped.txt')
    },

    loadfile: function(e) {
      this.text = e
      this.unwrap()
      this.download()
    },

    clean: function() {
      // 4tw exported strings sometimes include non-breaking spaces (character code 160) instead of spaces
      // parse and replace them
      this.text = this.text.replace(cleaner, ' ')
    },

    unwrap: function() {
      if (this.text == '') {
        return
      }

      this.clean()
      let lines = this.text.split('\n')

      let unwrapped = ''
      let nextLine = ''
      let nextLineFirstWord = ''

      for (let i = 0; i < lines.length; i++) {
        // Is there a next line?
        if (i + 1 < lines.length) {
          nextLine = lines[i + 1]
        } else {
          nextLine = ''
        }

        nextLineFirstWord = nextLine.split(' ', 1)[0]

        // If it exists, add the first word of the next line to this line
        if (nextLineFirstWord !== '') {
          // if length(lines[i] + ' ' + nextLineFirstWord) is >= to the linewrap, we unwrap
          // But also check that the original line was wrapped and the extended line would be longer than the wrap length
          if (
            lines[i].length <= this.linewidth &&
            lines[i].length + nextLineFirstWord.length + 1 >=
            this.linewidth
          ) {
            // then the line was wrapped so lets unwrap it
            unwrapped += lines[i] + ' '
          } else {
            unwrapped += lines[i] + '\n'
          }
        } else {
          unwrapped += lines[i] + '\n'
        }
      }

      this.text = unwrapped
    }
  }
}
</script>
