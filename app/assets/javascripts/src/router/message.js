import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../components/messages/app'
import Usearch from '../components/users/usearch'

export default class MessageRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp)
    this.route('/users/search', this.decorateUsearch)
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    next()
  }

  decorateUsearch(ctx, next) {
    (new ReactDecorator()).decorate('react-usearch', Usearch)
    next()
  }
}
