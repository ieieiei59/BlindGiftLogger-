import Vue from 'vue'
import VueIdb from 'vue-idb'

Vue.use(VueIdb)

export default new VueIdb({
  database: 'BlindDB',
  schemas: [],
  options: {},
  apis: {}
})
