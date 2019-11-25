<template>
  <v-card :to="`/gift_log/${giftLog.uuid}`">
    <v-card-title v-if="!!item">
      {{ item.name }}
    </v-card-title>
    <v-card-text>{{ giftLog.addedAtStr() }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'GiftLogCard',
  props: ['giftLog'],
  data () {
    return {
      item: null
    }
  },
  created () {
    this.giftLog.getItem().then((item) => { this.item = item })
  },
  methods: {

  }
}
</script>
