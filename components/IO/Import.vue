<template>
  <div>
    <v-file-input v-model="file" />
    <v-btn @click="importClicked()" :disabled="!file">
      インポート
    </v-btn>
  </div>
</template>

<script>
import { importIndexedDB } from '@/plugins/dbIO'
export default {
  name: 'ImportDB',
  data () {
    return {
      file: null
    }
  },
  created () {

  },
  methods: {
    importClicked () {
      console.log('clicked')
      console.log(this.file)

      importIndexedDB(this.file)

      const fr = new FileReader()
      fr.addEventListener('load', (reader, ev) => {
        importIndexedDB(fr.result)
      })
    }
  }
}
</script>
