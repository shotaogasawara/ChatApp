// const UserStore = {
//   user: {
//     id: 1,
//     name: 'John Doek',
//     profilePicture: 'https://avatars1.githubusercontent.com/u/8901351?v=3&s=200',
//   },
// }
//
// export default UserStore

import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'
import GetCurrentUserAction from '../actions/getCurrentUser'

class CurrentUserStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }

  removeChangeListener(callback) {
    this.off('change', callback)
  }

  getCurrentUser() {
    if (!this.get('currentUserJson')) this.setCurrentUser({})
    return this.get('currentUserJson')
  }

  setCurrentUser(obj) {
    this.set('currentUserJson', obj)
  }
}

const UserStore = new CurrentUserStore()

UserStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_CURRENT_USER:
      UserStore.setCurrentUser(action.json)
      UserStore.emitChange()
      break
  }
  return true
})

// var tmp = UserStore.getCurrentUser()
// console.log(tmp)
// GetCurrentUserAction.getCurrentUser().then(() => UserStore.getCurrentUser() )
// tmp = UserStore.getCurrentUser() //
// console.log(tmp)


export default UserStore

