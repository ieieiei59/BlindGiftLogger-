<template>
  <v-card v-if="(!!giftLog) && (!!item)">
    <v-card-title>{{ item.name }}</v-card-title>
    <v-card-text v-if="item.spText">
      {{ item.spText }}
    </v-card-text>
    <v-card-text v-if="giftLog">
      {{ giftLog.addedAtStr() }}
    </v-card-text>
    <v-card-actions>
      <v-btn @click="deleteGiftLog()" color="red">
        削除
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import GiftLog from '@/models/GiftLog'
export default {
  name: 'GiftLogDetail',
  props: ['uuid'],
  data () {
    return {
      giftLog: null,
      item: null
    }
  },
  created () {
    GiftLog.get(this.uuid)
      .then((obj) => {
        console.log(obj)
        this.giftLog = obj
        this.giftLog.getItem().then((item) => { this.item = item })
      })
  },
  methods: {
    deleteGiftLog () {
      console.log(this.giftLog)
      this.giftLog.delete()
      this.$router.replace('/item/' + this.item.uuid)
      this.$router.go(-1)
    }
  }
}
</script>
