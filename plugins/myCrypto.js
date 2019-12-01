import crypto from 'crypto'

const algorithm = 'aes-128-cbc'
const defaultPassword = 'BED4565C-AAED-4651-913D-36C10CAACF0B'
const iv = crypto.randomBytes(16)

function encrypt (data, password) {
  if (password === '') {
    password = defaultPassword
  }

  const key = Buffer.from(password, 'utf8')
  console.log(key)

  const cipher = crypto.createCipheriv(algorithm, key, iv)
  cipher.update(data, 'utf8', 'hex')
  const encrypted = cipher.final('hex')

  return { iv: iv.toString('hex'), encryptedData: encrypted }
}

function decrypt (data, password) {
  if (password === '') {
    password = defaultPassword
  }
  const decipher = crypto.createDecipheriv(algorithm, password, data.iv)
  decipher.update(data.encryptedData, 'hex', 'utf8')
  const decrypted = decipher.final('utf8')

  return decrypted
}

export { encrypt, decrypt }
