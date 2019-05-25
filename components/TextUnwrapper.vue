<template>
  <div>
    <text-reader @load="loadfile($event)"></text-reader>
    <br>
    <textarea v-model="text" placeholder="Paste text to unwrap here" rows="10" cols="80"></textarea>
    <br>
    <button type="button" @click="unwrap">Unwrap</button>
    <button type="button" @click="download">Download</button>
    <button
      type="button"
      v-clipboard:copy="text"
      v-clipboard:success="copySuccess"
      v-clipboard:error="copyError"
    >Copy to clipboard</button>
    <br>Wrap width:
    <input type="number" v-model="linewidth">
  </div>
</template>

<script>
import { saveAs } from 'file-saver'

import TextReader from '~/components/TextReader'

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

<style>
</style>
