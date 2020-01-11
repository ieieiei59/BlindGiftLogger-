<template>
  <div>
    <v-card v-if="!!item" class="mb-3">
      <v-card-title>{{ item.name }}</v-card-title>
      <v-card-text v-if="item.spText">
        {{ item.spText }}
      </v-card-text>
      <v-img v-if="!!imgSrc" :src="imgSrc" />
      <v-card-text>{{ item.count }}個取得済み [計: {{ item.sumPrice() }}円] (合計価値: {{ item.sumValue() }})</v-card-text>

      <v-card-actions>
        <v-btn @click="createLog">
          記録
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

    <!-- 削除確認ダイアログ -->
    <!-- TODO: コンポーネント化 -->
    <v-dialog v-model="deleteDialog">
      <v-card>
        <v-card-title>削除確認ダイアログ</v-card-title>
        <v-card-text v-if="!!item">
          {{ item.name }}[アイテム] が削除されます。
        </v-card-text>
        <v-card-text>よろしいですか？</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="deleteDialog = false">
            削除しない
          </v-btn>
          <v-btn color="red" @click="deleteItem()">
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
          <v-toolbar-title>アイテム編集</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn dark text @click="itemUpdate()">
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text v-if="!!item">
          <v-row><v-text-field v-model="item.name" label="アイテム名" /></v-row>
          <v-row><v-text-field v-model="item.spText" label="アイテム詳細" /></v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <h3>ログ</h3>
    <div>
      <gift-log-card v-for="giftLog in sortedGiftLogs" :key="giftLog.uuid" :gift-log="giftLog" class="ma-2" />
    </div>
  </div>
</template>

<script>
import Item from '@/models/Item'
import GiftLogCard from '@/components/GiftLog/Card'

export default {
  name: 'ProductDetail',
  components: { GiftLogCard },
  props: ['itemUUID'],
  data () {
    return {
      deleteDialog: false,
      editDialog: false,
      item: null,
      giftLogs: [],
      imgSrc: ''
    }
  },
  computed: {
    sortedGiftLogs () {
      return this.giftLogs.slice().sort((a, b) => {
        if (a.addedAt < b.addedAt) {
          return 1
        } else if (a.addedAt > b.addedAt) {
          return -1
        } else {
          return 0
        }
      })
    }
  },
  created () {
    Item.get(this.itemUUID)
      .then((obj) => {
        this.item = obj
        this.item.getGiftLogs().then((arr) => {
          this.giftLogs = arr
        })
        this.setImageURL()
      })
  },
  methods: {
    itemUpdate () {
      this.editDialog = false
      this.item.save()
    },
    deleteItem () {
      this.item.delete()
      this.$router.push('/product/' + this.item.productUUID)
    },
    createLog () {
      const log = this.item.purchase()
      this.giftLogs.push(log)
    },
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
