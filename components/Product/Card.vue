<template>
  <v-card :to="`/product/${product.uuid}`">
    <v-card-title>{{ product.name }}</v-card-title>
    <v-img :src="imgSrc" if="!!product.image" />
    <v-card-text>{{ product.count }}個</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
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
      console.log(this.product)
      console.log(this.product.getImageData())
      fr.readAsDataURL(this.product.getImageData())
    }
  }
}
</script>
