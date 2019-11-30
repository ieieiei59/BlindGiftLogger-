<template>
  <div>
    <h3>{{ product.name }}</h3>
    <v-data-table
      :headers="headers"
      :items="items"
    />
  </div>
</template>

<script>
export default {
  name: 'ItemTable',
  props: ['product'],
  data () {
    return {
      headers: [
        { text: 'アイテム名', align: 'left', value: 'name' },
        { text: '価値', value: 'value' },
        { text: '価格', value: 'price' },
        { text: '個数', value: 'count' }
      ],
      items: []
    }
  },
  created () {
    this.setItems()
  },
  methods: {
    setItems () {
      this.product.getItems().then((items) => { this.items = items })
    }
  }
}
</script>
