import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class SearchUserResultStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getSearchUser() {
    if (!this.get('searchUserResultJson')) this.setSearchUser({})
    return this.get('searchUserResultJson')
  }

  setSearchUser(obj) {
    this.set('searchUserResultJson', obj)
  }
}

const SearchResultStore = new SearchUserResultStore()

SearchResultStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_SEARCH_USER_RESULT:
      SearchResultStore.setSearchUser(action.json) // action.jsonはチェック済み
      SearchResultStore.emitChange()
      const result = SearchResultStore.getSearchUser() // jsonを引っ張ってこれることを確認！
      break
  }
  return true
})

export default SearchResultStore
