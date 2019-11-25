<template>
  <div>
    <div v-if="products">
      <product-card v-for="product in products" :key="product.uuid" :product="product" class="mb-2" />
    </div>
    <v-btn to="/product/add">
      追加
    </v-btn>
  </div>
</template>

<script>
import Product from '@/models/Product'
import ProductCard from '@/components/Product/Card'

export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  data () {
    return {
      products: []
    }
  },
  created () {
    this.setProducts()
  },
  methods: {
    setProducts () {
      Product.all().then((arr) => {
        this.products = arr
      })
    }
  }
}
</script>
