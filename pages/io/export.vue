<template>
  <div>
    <export-db />
  </div>
</template>

<script>
import ExportDB from '@/components/IO/Export'
export default {
  name: 'ExportDBPage',
  components: { 'export-db': ExportDB }
}
</script>
