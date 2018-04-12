import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../components/users/app'

export default class Router extends BaseRouter {
  register() {
    this.route('/users/search', this.decorateUsearch)
  }

  decorateUsearch(ctx, next) {
    (new ReactDecorator()).decorate('react-search', App)
    next()
  }
}
