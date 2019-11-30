import db from '@/plugins/db'
import Item from '@/models/Item'
const uuidv4 = require('uuid/v4')

export default class Product {
  setMemberVariable (data, name, defaultValue = null) {
    if (name in data) {
      this[name] = data[name]
    } else if (defaultValue !== null) {
      this[name] = defaultValue
    }
    return name in data
  }

  constructor (data) {
    this.setMemberVariable(data, 'uuid')
    this.setMemberVariable(data, 'name')
    this.setMemberVariable(data, 'image')
    this.setMemberVariable(data, 'spText', '')
    this.setMemberVariable(data, 'price', 0)
    this.setMemberVariable(data, 'count', 0)
  }

  getItems () {
    return Item.filterByProduct(this.uuid)
  }

  sumPrice () {
    return this.getItems().then((items) => {
      return items.reduce((prevVal, item) => prevVal + item.sumPrice(), 0)
    })
  }

  sumValue () {
    return this.getItems().then((items) => {
      return items.reduce((prevVal, item) => prevVal + item.sumValue(), 0)
    })
  }

  json () {
    return {
      uuid: this.uuid,
      name: this.name,
      image: this.image,
      spText: this.spText,
      price: this.price,
      count: this.count
    }
  }

  save () {
    return db.Products.put(this.json())
  }

  delete () {
    this.getItems().then((items) => {
      for (const item of items) {
        item.delete()
      }
    })
    return db.Products.delete(this.uuid)
  }

  increase () {
    this.count += 1
    this.save()
  }

  decrease () {
    this.count -= 1
    if (this.count < 0) {
      this.count = 0
    }
    this.save()
  }

  getImageData () {
    return new Blob([this.image], { type: 'image/jpeg' })
  }

  static all () {
    return db.Products.toArray().then((arr) => {
      return arr.map(obj => new Product(obj))
    })
  }

  static get (uuid) {
    return db.Products.where({ uuid }).toArray()
      .then((arr) => {
        return new Product(arr[0])
      })
  }

  static add (data) {
    if (!('uuid' in data)) {
      data.uuid = uuidv4()
    }
    const product = new Product(data)
    product.save()
    return product
  }
}
