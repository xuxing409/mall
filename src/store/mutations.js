import {
  ADD_COUNTER,
  ADD_TO_CART,
  CHANGE_CHECKED,
  CHECK_CLICK
} from './mutations-types'
export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  },
  [CHANGE_CHECKED](state, payload) {
    payload.checked = !payload.checked
  },
  [CHECK_CLICK](state, isSelectAll){
    if(isSelectAll) {
      state.cartList.forEach(item => {
        item.checked = false
      })
    } else {
      state.cartList.forEach(item => {
        item.checked = true
      })
    }
  }
}