<template>
  <div>
    <v-card v-if="!!productObj" class="mb-2">
      <v-card-title>{{ productObj.name }}</v-card-title>
      <v-card-text v-if="productObj.spText">
        {{ productObj.spText }}
      </v-card-text>
      <v-card-text>{{ productObj.count }}個取得済み [計: {{ sumPrice }} 円] (合計価値: {{ sumValue }})</v-card-text>
      <v-card-text>全{{ items.length }}種類</v-card-text>
      <v-card-actions>
        <v-btn :to="`/item/add/${productObj.uuid}`">
          アイテムを追加
        </v-btn>
        <v-spacer />
        <v-btn color="primary" @click="editDialog = true">
          編集
        </v-btn>
        <v-btn color="red" @click="deleteDialog = true">
          削除
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="deleteDialog">
      <v-card>
        <v-card-title>削除確認ダイアログ</v-card-title>
        <v-card-text v-if="!!productObj">
          {{ productObj.name }}[プロダクト] が削除されます。
        </v-card-text>
        <v-card-text>よろしいですか？</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="deleteDialog = false">
            削除しない
          </v-btn>
          <v-btn color="red" @click="deleteProduct()">
            削除
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 編集ダイアログ -->
    <!-- TODO: コンポーネント化 -->
    <v-dialog v-model="editDialog" fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="editDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>プロダクト編集</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn dark text @click="productUpdate()">
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text v-if="!!productObj">
          <v-row><v-text-field v-model="productObj.name" label="アイテム名" /></v-row>
          <v-row><v-text-field v-model="productObj.spText" label="アイテム詳細" /></v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <h3>アイテム一覧</h3>
    <div>
      <item-card v-for="item in items" :key="item.uuid" :item="item" class="ma-2" />
    </div>
  </div>
</template>

<script>
import Product from '@/models/Product'
import ItemCard from '@/components/Item/Card'

export default {
  name: 'ProductDetail',
  components: { ItemCard },
  props: ['productUUID'],
  data () {
    return {
      productObj: null,
      items: [],
      sumPrice: 0,
      sumValue: 0,
      deleteDialog: false,
      editDialog: false
    }
  },
  created () {
    Product.get(this.productUUID).then((obj) => {
      this.productObj = obj
      this.productObj.getItems().then((arr) => {
        this.items = arr
      })
      this.setSumPrice()
      console.log('asdlkj')
      this.setSumValue()
    })
  },
  methods: {
    productUpdate () {
      this.editDialog = false
      this.productObj.save()
    },
    deleteProduct () {
      Product.get(this.productUUID).then((arr) => {})
      this.productObj.delete()
      this.$router.push('/product')
    },
    setSumPrice () {
      this.productObj.sumPrice().then((val) => {
        this.sumPrice = val
      })
    },
    setSumValue () {
      this.productObj.sumValue().then((val) => {
        this.sumValue = val
      })
    }
  }
}
</script>
