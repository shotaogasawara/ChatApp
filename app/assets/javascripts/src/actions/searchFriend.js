import request from 'superagent'
import {ActionTypes, APIEndpoints} from '../constants/app'
import Dispatcher from '../dispatcher'

export default {
  // DBに問い合わせて友達一覧を受け取る
  getSearchFriendResult() {
    return new Promise((resolve, reject) => {
      request
        .get(`${APIEndpoints.SEARCH_FRIEND}`)
        .end((error, res) => {
          if (!error && res.status === 200) {
            const json = JSON.parse(res.text)
            Dispatcher.handleServerAction({
              type: ActionTypes.GET_SEARCH_FRIEND_RESULT,
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
