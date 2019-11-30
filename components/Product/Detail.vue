<template>
  <div>
    <v-card v-if="!!productObj" class="mb-2">
      <v-card-title>{{ productObj.name }}</v-card-title>
      <v-card-text v-if="productObj.spText">
        {{ productObj.spText }}
      </v-card-text>
      <v-card-text>{{ productObj.count }}個取得済み [計: {{ sumPrice }} 円] (合計価値: {{ sumValue }})</v-card-text>
      <v-card-text>全{{ items.length }}種類</v-card-text>
      <v-card-actions>
        <v-btn :to="`/item/add/${productObj.uuid}`">
          アイテムを追加
        </v-btn>
        <v-btn @click="deleteProduct()" color="red">
          削除
        </v-btn>
      </v-card-actions>
    </v-card>
    <h3>アイテム一覧</h3>
    <div>
      <item-card v-for="item in items" :key="item.uuid" :item="item" class="ma-2" />
    </div>
  </div>
</template>

<script>
import Product from '@/models/Product'
import ItemCard from '@/components/Item/Card'

export default {
  name: 'ProductDetail',
  components: { ItemCard },
  props: ['productUUID'],
  data () {
    return {
      productObj: null,
      items: [],
      sumPrice: 0,
      sumValue: 0
    }
  },
  created () {
    Product.get(this.productUUID).then((obj) => {
      this.productObj = obj
      this.productObj.getItems()
        .then((arr) => {
          this.items = arr
        })
      this.setSumPrice()
      console.log('asdlkj')
      this.setSumValue()
    })
  },
  methods: {
    deleteProduct () {
      Product.get(this.productUUID).then((arr) => {

      })
      this.productObj.delete()
      this.$router.push('/product')
    },
    setSumPrice () {
      this.productObj.sumPrice()
        .then((val) => { this.sumPrice = val })
    },
    setSumValue () {
      this.productObj.sumValue()
        .then((val) => { this.sumValue = val })
    }
  }
}
</script>
