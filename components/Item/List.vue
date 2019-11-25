<template>
  <div>
    <div v-if="!!items">
      <item-card v-for="item in items" :key="item.uuid" :item="item" class="mb-2" />
    </div>
  </div>
</template>

<script>
import Item from '@/models/Item'
import ItemCard from '@/components/Item/Card'

export default {
  name: 'ItemList',
  components: {
    ItemCard
  },
  data () {
    return {
      items: []
    }
  },
  created () {
    this.setItems()
  },
  methods: {
    setItems () {
      Item.all().then((arr) => {
        console.log(arr)
        this.items = arr
      })
    }
  }
}
</script>
