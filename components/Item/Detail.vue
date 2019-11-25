<template>
  <div>
    <v-card v-if="!!item" class="mb-3">
      <v-card-title>{{ item.name }}</v-card-title>
      <v-card-text v-if="item.spText">
        {{ item.spText }}
      </v-card-text>
      <v-img :src="imgSrc" v-if="!!imgSrc" />
      <v-card-text>{{ item.count }}個取得済み [計: {{ item.sumPrice() }}円]</v-card-text>
      <v-card-actions>
        <v-btn @click="createLog">
          記録
        </v-btn>
        <v-btn @click="deleteItem()" color="red">
          削除
        </v-btn>
      </v-card-actions>
    </v-card>
    <h3>ログ</h3>
    <div>
      <gift-log-card v-for="giftLog in sortedGiftLogs" :key="giftLog.uuid" :giftLog="giftLog" class="ma-2" />
    </div>
  </div>
</template>

<script>
import Item from '@/models/Item'
import GiftLogCard from '@/components/GiftLog/Card'

export default {
  name: 'ProductDetail',
  components: { GiftLogCard },
  props: ['itemUUID'],
  data () {
    return {
      item: null,
      giftLogs: [],
      imgSrc: ''
    }
  },
  computed: {
    sortedGiftLogs () {
      return this.giftLogs.slice().sort((a, b) => {
        if (a.addedAt < b.addedAt) {
          return 1
        } else if (a.addedAt > b.addedAt) {
          return -1
        } else {
          return 0
        }
      })
    }
  },
  created () {
    Item.get(this.itemUUID)
      .then((obj) => {
        this.item = obj
        this.item.getGiftLogs().then((arr) => {
          this.giftLogs = arr
        })
        this.setImageURL()
      })
  },
  methods: {
    deleteItem () {
      this.item.delete()
      this.$router.push('/product/' + this.item.productUUID)
    },
    createLog () {
      const log = this.item.purchase()
      this.giftLogs.push(log)
    },
    setImageURL () {
      const fr = new FileReader()
      fr.onload = () => {
        this.imgSrc = fr.result
      }
      fr.readAsDataURL(this.item.getImageData())
    }
  }
}
</script>
