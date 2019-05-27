<template>
  <div class="text-unwrapper">
    <section class="text-unwrapper-loadfile">
      <text-reader @load="loadfile($event)">
        <fa icon="file-upload"/> Upload File
      </text-reader>
    </section>

    <textarea
      v-model="text"
      placeholder="Paste text to unwrap here"
      rows="10"
      cols="80"
      class="text-unwrapper-textarea"
    ></textarea>

    <section class="text-unwrapper-controls">
      <button type="button" @click="unwrap">
        <fa icon="align-left"/> Unwrap
      </button>
      <button type="button" @click="download">
        <fa icon="download"/> Download
      </button>
      <button
        type="button"
        v-clipboard:copy="text"
        v-clipboard:success="copySuccess"
        v-clipboard:error="copyError"
      >
        <fa icon="copy"/> Copy Text
      </button>
    </section>

    <section class="text-unwrapper-settings">
      <fa icon="cog"/> Settings
      Wrap width:
      <input type="number" v-model="linewidth">
    </section>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'

import TextReader from '@/components/TextReader'

export default {
  name: 'TextUnwrapper',

  components: {
    TextReader
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

  methods: {
    copySuccess: function(e) {
      alert('You just copied: ' + e.text)
    },

    copyError: function(e) {
      alert('Failed to copy text')
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

    unwrap: function() {
      if (this.text == '') {
        return
      }

      let lines = this.text.split('\n')

      let unwrapped = ''
      let nextLine = ''
      let nextLineFirstWord = ''
      let extendedLine = ''

      for (let i = 0; i < lines.length; i++) {
        // Is there a next line?
        if (i + 1 < lines.length) {
          nextLine = lines[i + 1]
        } else {
          nextLine = ''
        }

        nextLineFirstWord = nextLine.split(' ', 1)[0]

        // If it exists, add the first word of the next line to this line
        if (nextLineFirstWord != ' ') {
          extendedLine = lines[i] + ' ' + nextLineFirstWord
        } else {
          extendedLine = lines[i]
        }

        if (
          lines[i].length <= this.linewidth &&
          extendedLine.length > this.linewidth
        ) {
          // then the line was wrapped so lets unwrap it
          unwrapped += lines[i] + ' '
        } else {
          unwrapped += lines[i] + '\n'
        }
      }

      this.text = unwrapped
    }
  }
}
</script>
