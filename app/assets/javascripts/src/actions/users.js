import request from 'superagent'
import {ActionTypes} from '../constants/app'
import Dispatcher from '../dispatcher'

export default {
  // getアクション
  getUser() {
    return new Promise((resolve, reject) => {
      request
        .get('/api/users.json')
        .end((error, res) => {
          if (!error && res.status === 200) {
            const json = JSON.parse(res.text)
            Dispatcher.handleServerAction({
              type: ActionTypes.GET_USER,
              json,
            })
            resolve(json)
          } else {
            reject(res)
          }
        })
    })
  },
}
