<template>
  <v-card>
    <v-card-title>プロダクト追加</v-card-title>
    <v-form v-model="valid" class="pa-2" lazy-validation>
      <v-text-field v-model="productData.name" :rules="[rules.required]" label="プロダクト名" />
      <v-text-field v-model="productData.price" :rules="[rules.required]" label="値段" />
      <v-file-input v-model="files" label="画像選択" accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi-camera" />
      <v-textarea v-model="productData.spText" label="詳細説明" />
    </v-form>
    <v-card-actions>
      <v-btn :disabled="!valid" @click="add">
        追加
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Product from '@/models/Product'
export default {
  name: 'ProductAdd',
  data () {
    return {
      productData: {
        name: '',
        image: '',
        spText: '',
        price: ''
      },
      files: [],
      valid: false,
      rules: {
        required: v => !!v || '必須項目です。'
      }
    }
  },
  watch: {
    files (newFiles, oldFiles) {
      console.log(newFiles)
      const fr = new FileReader()
      fr.onload = () => {
        this.productData.image = fr.result
      }
      if (newFiles !== null) {
        fr.readAsArrayBuffer(newFiles)
      }
    }
  },
  created () {

  },
  methods: {
    add () {
      Product.add(this.productData)
      this.$router.push('/product')
    }
  }
}
</script>
