<template>
  <v-card v-if="!!product">
    <v-card-title>アイテム追加 [{{ product.name }}]</v-card-title>
    <v-form v-model="valid" class="pa-2" lazy-validation>
      <v-text-field v-model="itemData.name" :rules="[rules.required]" label="プロダクト名" />
      <v-text-field v-model="itemData.value" :rules="[rules.required]" label="価値" />
      <v-file-input v-model="files" label="画像選択" accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi-camera" />
      <v-text-field v-model="itemData.price" label="値段(空欄で初期値)" />
      <v-textarea v-model="itemData.spText" label="詳細説明" />
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
import Item from '@/models/Item'

export default {
  name: 'ItemAddCard',
  props: ['productUUID'],
  data () {
    return {
      itemData: {
        productUUID: '',
        name: '',
        image: '',
        spText: '',
        price: '',
        value: ''
      },
      files: [],
      product: null,
      valid: false,
      rules: {
        required: v => !!v || '必須項目です。'
      }
    }
  },
  watch: {
    files (newFiles, oldFiles) {
      const fr = new FileReader()
      fr.onload = () => {
        this.itemData.image = fr.result
      }
      if (newFiles !== null) {
        fr.readAsArrayBuffer(newFiles)
      }
    }
  },
  created () {
    this.setProduct()
  },
  methods: {
    setProduct () {
      Product.get(this.productUUID)
        .then((obj) => {
          this.itemData.productUUID = obj.uuid
          this.product = obj
        })
    },
    add () {
      Item.create(this.itemData)
      this.$router.push('/product/' + this.product.uuid)
    }
  }
}
</script>
