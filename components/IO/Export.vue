<template>
  <div>
    <h2>export db</h2>

    <a v-if="!!dataURL" :href="dataURL" download="dumpData.bgldump">エクスポートデータ</a>
  </div>
</template>

<script>
import { exportIndexedDB } from '@/plugins/dbIO'

export default {
  name: 'ExportDB',
  data () {
    return {
      data: null,
      dataURL: null
    }
  },
  created () {
    this.exportClicked()
  },
  methods: {
    exportClicked () {
      console.log('clicked')

      const options = {
        dexieOptions: {},
        originOptions: {
          password: ''
        }
      }

      exportIndexedDB(options).then((data) => {
        this.data = data
        this.setDataURL()
      })
    },
    setDataURL () {
      const fr = new FileReader()
      fr.onload = () => {
        this.dataURL = fr.result
      }
      fr.readAsDataURL(this.data)
    }
  }
}
</script>
