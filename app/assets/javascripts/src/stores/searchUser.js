import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class SearchUserResultStore extends BaseStore {
  getSearchUser() {
    if (!this.get('searchUserResultJson')) this.setSearchUser([])
    return this.get('searchUserResultJson')
  }

  setSearchUser(array) {
    this.set('searchUserResultJson', array)
  }
}

const SearchResultStore = new SearchUserResultStore()

SearchResultStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_SEARCH_USER_RESULT:
      SearchResultStore.setSearchUser(action.json)
      SearchResultStore.emitChange()
      break
  }
  return true
})

export default SearchResultStore
