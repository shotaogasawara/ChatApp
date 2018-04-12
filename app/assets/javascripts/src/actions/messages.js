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
  postMessage(message) {
    return new Promise((resolve, reject) => {
      request
        .post(`${APIEndpoints.MESSAGE}`)
        .set('X-CSRF-Token', CSRFToken())
        .send({ content: message, sender_id: 1, receiver_id: 2 })
        .end((error, res) => {
          if (!error && res.status === 200) {
            console.log('postに成功しました。')
            // const json = JSON.parse(res.text)
            // Dispatcher.handleServerAction({ // Dipatcherにペイロードを渡す
            //   type: ActionTypes.POST_MESSAGE,
            //   json,
            // })
          } else {
            reject(res)
          }
        })
    })
  },
  // sendMessage(message) { //
  //   Dispatcher.handleViewAction({
  //     type: ActionTypes.SEND_MESSAGE,
  //     message: message,
  //   })
  // },
}
