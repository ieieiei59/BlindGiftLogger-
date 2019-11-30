<template>
  <div>
    <item-table :product="product" v-for="product in products" :key="product.uuid" />
  </div>
</template>

<script>
import ItemTable from '@/components/Item/Table'
import Product from '@/models/Product'

export default {
  components: {
    ItemTable
  },
  data () {
    return {
      products: []
    }
  },
  created () {
    this.setProduct()
  },
  methods: {
    setProduct () {
      Product.all()
        .then((products) => { this.products = products })
    }
  }
}
</script>
