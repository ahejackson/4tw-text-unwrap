<template>
  <div>
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

const test = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis
egestas maecenas pharetra convallis posuere morbi leo. Adipiscing
tristique risus nec feugiat in fermentum posuere urna nec. Gravida
rutrum quisque non tellus. Tincidunt dui ut ornare lectus sit amet
est. Donec massa sapien faucibus et molestie ac. At imperdiet dui
accumsan sit. Quis eleifend quam adipiscing vitae proin sagittis nisl.
Faucibus turpis in eu mi bibendum neque.

Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Id
leo in vitae turpis massa sed. Amet cursus sit amet dictum sit. Felis
eget nunc lobortis mattis. Suscipit adipiscing bibendum est ultricies
integer quis auctor elit sed. Amet consectetur adipiscing elit ut
aliquam. Purus gravida quis blandit turpis. Adipiscing commodo elit at
imperdiet dui accumsan. Eget duis at tellus at. In dictum non
consectetur a erat nam at lectus urna.

Volutpat blandit aliquam etiam erat velit scelerisque in dictum non.
Dignissim suspendisse in est ante in nibh mauris. Sed vulputate
blandit volutpat maecenas volutpat blandit. Mauris commodo quis
imperdiet massa tincidunt nunc pulvinar. Id ornare arcu odio ut sem.
Laoreet suspendisse interdum consectetur libero id faucibus nisl.
Pharetra diam sit amet nisl suscipit.`

export default {
  data() {
    return {
      text: test,
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

    reset: function() {
      this.text = test
    },

    download: function() {
      let blob = new Blob([this.text], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, 'unwrapped.txt')
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
