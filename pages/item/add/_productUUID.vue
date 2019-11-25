<template>
  <div>
    <item-add-card :productUUID="productUUID" />
  </div>
</template>

<script>
import ItemAddCard from '@/components/Item/AddCard'
export default {
  name: 'ItemAdd',
  components: { ItemAddCard },
  data () {
    return {
      productUUID: this.$route.params.productUUID
    }
  }
}
</script>
