import { exportDB, importInto } from 'dexie-export-import'
import db from '@/plugins/db'

/**
 * options = {
 *   dexieOptions: {},  // dexie-export-importで使用するoption
 *   originOptions: {}  // オリジナルのoption
 * }
 */
export async function exportIndexedDB (options = { dexieOptions: {}, originOptions: { password: '' } }) {
  const blob = await exportDB(db, options.dexieOptions)

  return blob
}

export async function importIndexedDB (data, options = { dexieOptions: {}, originOptions: { password: '' } }) {
  await importInto(db, data, options.dexieOptions)
}
