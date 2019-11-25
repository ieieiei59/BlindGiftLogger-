<template>
  <div v-if="productUUID !== null">
    <product-detail-card :productUUID="productUUID" />
  </div>
</template>

<script>
import ProductDetailCard from '@/components/Product/Detail'
export default {
  name: 'ProductDetail',
  components: { ProductDetailCard },
  data () {
    return {
      productUUID: this.$route.params.productUUID
    }
  }
}
</script>
