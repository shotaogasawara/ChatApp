import request from 'superagent'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'
import Dispatcher from '../dispatcher'

export default {
  // getアクション
  getMessage(sender_id, receiver_id) { // userのメッセージをすべて取得する
    return new Promise((resolve, reject) => {
      request
        .get('/api/messages.json')
        .query({sender_id: sender_id, receiver_id: receiver_id})
        .end((error, res) => {
          if (!error && res.status === 200) {
            const json = JSON.parse(res.text)
            Dispatcher.handleServerAction({
              type: ActionTypes.GET_MESSAGE,
              json,
            })
            resolve(json)
          } else {
            reject(res)
          }
        })
    })
  },
  // postアクション
  postMessage(sender_id, receiver_id, message) {
    return new Promise((resolve, reject) => {
      request
        .post(`${APIEndpoints.MESSAGE}`)
        .set('X-CSRF-Token', CSRFToken())
        .send({sender_id: sender_id, receiver_id: receiver_id, content: message})
        .end((error, res) => {
          if (!error && res.status === 200) {
            console.log('postに成功しました。')
          } else {
            reject(res)
          }
        })
    })
  },
}
