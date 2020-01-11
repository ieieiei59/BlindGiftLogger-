<template>
  <div>
    <v-card v-if="(!!giftLog) && (!!item)">
      <v-card-title>{{ item.name }}</v-card-title>
      <v-card-text v-if="item.spText">
        {{ item.spText }}
      </v-card-text>
      <v-card-text v-if="giftLog">
        {{ giftLog.addedAtStr() }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" @click="deleteDialog = true">
          削除
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="deleteDialog">
      <v-card>
        <v-card-title>削除確認ダイアログ</v-card-title>
        <v-card-text v-if="!!item">
          {{ item.name }}[ギフトログ] が削除されます。
        </v-card-text>
        <v-card-text>よろしいですか？</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="deleteDialog = false">
            削除しない
          </v-btn>
          <v-btn color="red" @click="deleteGiftLog()">
            削除
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import GiftLog from '@/models/GiftLog'
export default {
  name: 'GiftLogDetail',
  props: ['uuid'],
  data () {
    return {
      deleteDialog: false,
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
