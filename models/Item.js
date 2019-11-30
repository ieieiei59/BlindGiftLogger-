import uuidv4 from 'uuid/v4'
import db from '@/plugins/db'
import GiftLog from '@/models/GiftLog'
import Product from '@/models/Product'

export default class Item {
  setMemberVariable (data, name, defaultValue = null) {
    if (name in data) {
      this[name] = data[name]
    } else if (defaultValue !== null) {
      this[name] = defaultValue
    }
    return name in data
  }

  constructor (data) {
    this.setMemberVariable(data, 'productUUID')
    this.setMemberVariable(data, 'name')
    this.setMemberVariable(data, 'image')
    this.setMemberVariable(data, 'uuid')
    this.setMemberVariable(data, 'price', -1)
    this.setMemberVariable(data, 'spText', '')
    this.setMemberVariable(data, 'value', 1)
    this.setMemberVariable(data, 'count', 0)
  }

  /**
   * アイテムが所属するプロダクトを取得
   */
  getProduct () {
    return Product.get(this.productUUID)
  }

  /**
   * アイテム取得時に呼び出し
   * 呼び出されるとGiftLogを作成し、取得ログを残す
   */
  purchase () {
    this.increase()
    return GiftLog.add(this.uuid)
  }

  increase () {
    this.count += 1
    this.save()
    this.getProduct().then((product) => {
      product.increase()
    })
  }

  decrease () {
    this.count -= 1
    if (this.count < 0) {
      this.count = 0
    }
    this.getProduct().then((product) => {
      product.decrease()
    })
    this.save()
  }

  sumPrice () {
    return this.count * this.price
  }

  sumValue () {
    return this.count * this.value
  }

  /**
   * 一つあたりの 値段(円) を取得
   */
  getPrice () {
    if (this.price > 0) {
      return this.price
    } else {
      this.getProduct().then((product) => {
        return product.price
      })
    }
  }

  /**
   * メンバ変数をjsonとして取得
   */
  async json () {
    if (this.price < 0) {
      await this.getProduct().then((product) => {
        this.price = product.price
      })
    }

    return {
      uuid: this.uuid,
      productUUID: this.productUUID,
      name: this.name,
      image: this.image,
      price: this.price,
      spText: this.spText,
      value: this.value,
      count: this.count
    }
  }

  /**
   * 保存関数
   */
  async save () {
    db.Items.put(await this.json())
  }

  delete () {
    this.getGiftLogs().then((arr) => {
      for (const log of arr) {
        log.delete()
      }
    })
    this.getProduct().then((product) => {
      product.count -= this.count
      if (product.count < 0) {
        product.count = 0
      }
      product.save()
    })
    db.Items.delete(this.uuid)
  }

  getGiftLogs () {
    return GiftLog.filterByItem(this.uuid)
  }

  getImageData () {
    return new Blob([this.image], { type: 'image/jpeg' })
  }

  /**
   * アイテムを作成
   *
   * @param {Object} data
   */
  static create (data) {
    console.log(data)
    if (!('uuid' in data)) {
      data.uuid = uuidv4()
    }
    const item = new Item(data)
    if (data.price === null) {
      item.getProduct().then((product) => {
        item.price = product.price
        item.save()
      })
    } else {
      item.save()
    }
    return item
  }

  /**
   * プロダクトUUIDでフィルタして返却
   * @param {String} productUUID
   */
  static filterByProduct (productUUID) {
    return Item.all().then((arr) => {
      return arr.filter(obj => obj.productUUID === productUUID)
    })
  }

  /**
   * 保存されている全Itemを返却
   */
  static all () {
    return db.Items.toArray()
      .then((arr) => {
        return arr.map(obj => new Item(obj))
      })
  }

  static get (itemUUID) {
    return db.Items.where({ uuid: itemUUID }).toArray()
      .then((obj) => {
        return new Item(obj[0])
      })
  }
}
