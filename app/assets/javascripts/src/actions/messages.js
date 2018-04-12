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
  postMessage(text) {
    return new Promise((resolve, reject) => {
      request
        .post(`${APIEndpoints.MESSAGE}`)
        .set('X-CSRF-Token', CSRFToken())
        .send({ content: text, sender_id: 1, receiver_id: 2 })
        .end((error, res) => {
          if (!error && res.status === 200) {
            console.log('postに成功しました。')
            // const json = JSON.parse(res.text)
            // Dispatcher.handleServerAction({ // Dipatcherにペイロードを渡す
            //   type: ActionTypes.POST_MESSAGE,
            //   message,
            //   json,
            // })
          } else {
            reject(res)
          }
        })
    })
  },
  //
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID,
      userID: newUserID,
    })
  },
  //
  sendMessage(userID, message) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SEND_MESSAGE,
      userID: userID,
      message: message,
      timestamp: +new Date(),
    })
  },
}
