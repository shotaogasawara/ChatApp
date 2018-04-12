import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class GetMessagesStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }

  removeChangeListener(callback) {
    this.off('change', callback)
  }

  getMessages() {
    if (!this.get('messagesJson')) this.setMessages([])
    return this.get('messagesJson')
  }

  setMessages(obj) {
    this.set('messagesJson', obj)
  }
}

const MessagesStore = new GetMessagesStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_MESSAGE:
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break

  }
  return true
})

export default MessagesStore

