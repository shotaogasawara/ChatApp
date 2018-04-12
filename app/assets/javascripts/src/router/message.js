import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../components/messages/app'
import GetCurrentUserAction from '../actions/getCurrentUser'
import GetSearchFriendAction from '../actions/searchFriend'

export default class MessageRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp)
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    // アクション呼び出しにより初期値を取得
    GetCurrentUserAction.getCurrentUser()
    GetSearchFriendAction.getSearchFriendResult()
    next()
  }
}
