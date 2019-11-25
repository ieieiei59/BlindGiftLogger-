<template>
  <div>
    <gift-log-detail :uuid="giftLogUUID"/>
  </div>
</template>

<script>
import GiftLogDetail from '@/components/GiftLog/Detail'
export default {
  name: 'GiftLogDetailPage',
  components: { GiftLogDetail },
  data () {
    return {
      giftLogUUID: this.$route.params.giftLogUUID
    }
  }
}
</script>
