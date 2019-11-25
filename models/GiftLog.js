import uuidv4 from 'uuid/v4'
import moment from 'moment'
import db from '@/plugins/db'
import Item from '@/models/Item'

export default class GiftLog {
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
    this.setMemberVariable(data, 'itemUUID')
    this.setMemberVariable(data, 'addedAt', Date.now())

    this.getItem().then((item) => { this.item = item })
  }

  addedAtStr () {
    return moment(new Date(this.addedAt)).format('YYYY/MM/DD HH:mm')
  }

  json () {
    return {
      uuid: this.uuid,
      itemUUID: this.itemUUID,
      addedAt: this.addedAt
    }
  }

  getItem () {
    return Item.get(this.itemUUID)
  }

  save () {
    return db.GiftLogs.put(this.json())
  }

  delete () {
    this.getItem().then((item) => { item.decrease() })
    return db.GiftLogs.delete(this.uuid)
  }

  static all () {
    return db.GiftLogs.toArray()
      .then((arr) => {
        return arr.map(obj => new GiftLog(obj))
      })
  }

  static add (itemUUID) {
    const data = {
      uuid: uuidv4(),
      itemUUID
    }
    const log = new GiftLog(data)
    console.log(log)
    log.save()
    return log
  }

  static get (uuid) {
    return db.GiftLogs.where({ uuid }).toArray()
      .then((arr) => {
        return new GiftLog(arr[0])
      })
  }

  static filterByItem (itemUUID) {
    return db.GiftLogs.where({ itemUUID }).toArray()
      .then((arr) => {
        console.log(arr)
        return arr.map(obj => new GiftLog(obj))
      })
  }
}
