import Dexie from 'dexie'

const db = new Dexie('BlindItemLogDB')

db.version(1).stores({
  Items: 'uuid, productUUID, name, image, price, spText, value, count',
  Products: 'uuid, name, image, spText, price, count',
  GiftLogs: 'uuid, itemUUID, addedAt'
})

export default db
