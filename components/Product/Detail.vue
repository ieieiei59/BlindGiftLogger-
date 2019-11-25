<template>
  <div>
    <v-card v-if="!!productObj" class="mb-2">
      <v-card-title>{{ productObj.name }}</v-card-title>
      <v-card-text v-if="productObj.spText">
        {{ productObj.spText }}
      </v-card-text>
      <v-card-text>{{ productObj.count }}個取得済み [計: {{ productObj.count * productObj.price }} 円]</v-card-text>
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
      items: []
    }
  },
  created () {
    Product.get(this.productUUID).then((obj) => {
      this.productObj = obj
      this.productObj.getItems()
        .then((arr) => {
          this.items = arr
        })
    })
  },
  methods: {
    deleteProduct () {
      Product.get(this.productUUID).then((arr) => {

      })
      this.productObj.delete()
      this.$router.push('/product')
    }
  }
}
</script>
