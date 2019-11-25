<template>
  <v-card :to="`/item/${item.productUUID}/${item.uuid}`">
    <v-card-title>{{ item.name }}</v-card-title>
    <v-img :src="imgSrc" if="!!item.image" />
    <v-card-text>{{ item.count }}個</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ItemCard',
  props: ['item'],
  data () {
    return {
      imgSrc: ''
    }
  },
  created () {
    this.setImageURL()
  },
  methods: {
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
