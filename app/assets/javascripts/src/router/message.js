import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../components/messages/app'
import GetCurrentUserAction from '../actions/getCurrentUser'
import UserStore from '../stores/user'

export default class MessageRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp)
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    GetCurrentUserAction.getCurrentUser()
    next()
  }
}
