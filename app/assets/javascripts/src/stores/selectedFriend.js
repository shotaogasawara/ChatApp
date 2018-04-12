import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class CurrentSelectedFriendStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }

  removeChangeListener(callback) {
    this.off('change', callback)
  }

  getSelectedFriend() {
    if (!this.get('selectedFriendJson')) this.setSelectedFriend({})
    return this.get('selectedFriendJson')
  }

  setSelectedFriend(obj) {
    this.set('selectedFriendJson', obj)
  }
}

const SelectedFriendStore = new CurrentSelectedFriendStore()

SelectedFriendStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.SET_SELECTED_FRIEND:
      SelectedFriendStore.setSelectedFriend(action.selectedFriend)
      SelectedFriendStore.emitChange()
      break
  }
  return true
})

export default SelectedFriendStore
