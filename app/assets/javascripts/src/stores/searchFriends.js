import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class SearchFriendsResultStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }

  removeChangeListener(callback) {
    this.off('change', callback)
  }

  getFriends() {
    if (!this.get('friendsJson')) this.setFriends({})
    return this.get('friendsJson')
  }

  setFriends(obj) {
    this.set('friendsJson', obj)
  }
}

const SearchFriendsStore = new SearchFriendsResultStore()

SearchFriendsStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_SEARCH_FRIEND_RESULT:
      SearchFriendsStore.setFriends(action.json)
      SearchFriendsStore.emitChange()
      break
  }
  return true
})

export default SearchFriendsStore
