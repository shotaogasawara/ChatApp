import {Dispatcher} from 'flux'
import assign from 'object-assign'

const appDispatcher = assign(new Dispatcher(), {
  handleServerAction(action) { // サーバからのアクションを受け取る
    this.dispatch({ // ペイロードを渡す
      source: 'server',
      action: action,
    })
  },

  handleViewAction(action) { // ビューからのアクションを受け取る
    this.dispatch({ // ペイロードを渡す
      source: 'view',
      action: action,
    })
  },
})

export default appDispatcher
