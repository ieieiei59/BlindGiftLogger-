<template>
  <div>
    <h3>アイテム詳細</h3>
    <item-detail :productUUID="productUUID" :itemUUID="itemUUID" />
  </div>
</template>

<script>
import ItemDetail from '@/components/Item/Detail'

export default {
  name: 'ItemDetailPage',
  components: { ItemDetail },
  data () {
    return {
      productUUID: this.$route.params.productUUID,
      itemUUID: this.$route.params.itemUUID
    }
  }
}
</script>
