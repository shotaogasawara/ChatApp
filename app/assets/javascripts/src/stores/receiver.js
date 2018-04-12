import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class CurrentReceiverStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }

  removeChangeListener(callback) {
    this.off('change', callback)
  }

  getCurrentReceiver() {
    if (!this.get('currentReceiverJson')) this.setCurrentReceiver({})
    return this.get('currentReceiverJson')
  }

  setCurrentReceiver(obj) {
    this.set('currentReceiverJson', obj)
  }
}

const ReceiverStore = new CurrentReceiverStore()

ReceiverStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.SET_SELECTED_FRIEND:
      ReceiverStore.setCurrentReceiver(action.selectedFriend)
      ReceiverStore.emitChange()
      break
  }
  return true
})

export default ReceiverStore

