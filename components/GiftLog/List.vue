<template>
  <div>
    <div v-if="!!giftLogs">
      <gift-log-card v-for="giftLog in giftLogs" :key="giftLog.uuid" :giftLog="giftLog" class="mb-2" />
    </div>
  </div>
</template>

<script>
import GiftLog from '@/models/GiftLog'
import GiftLogCard from '@/components/GiftLog/Card'

export default {
  name: 'GiftLogList',
  components: {
    GiftLogCard
  },
  data () {
    return {
      giftLogs: []
    }
  },
  created () {
    this.setGiftLogs()
  },
  methods: {
    setGiftLogs () {
      GiftLog.all().then((arr) => {
        console.log(arr)
        this.giftLogs = arr
      })
    }
  }
}
</script>
