<template>
  <div>
    <import-db/>
  </div>
</template>

<script>
import ImportDB from '@/components/IO/Import'

export default {
  name: 'ImportDBPage',
  components: { 'import-db': ImportDB }
}
</script>
