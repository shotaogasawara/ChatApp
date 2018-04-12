import request from 'superagent'
import {ActionTypes, APIEndpoints} from '../constants/app'
import Dispatcher from '../dispatcher'

export default {
  // DBに問い合わせて検索結果を受け取る
  getSearchUserResult(query) {
    return new Promise((resolve, reject) => {
      request
        .get(`${APIEndpoints.SEARCH_USER}`)
        .query({user_name: query})
        .end((error, res) => {
          if (!error && res.status === 200) {
            const json = JSON.parse(res.text)
            Dispatcher.handleServerAction({
              type: ActionTypes.GET_SEARCH_USER_RESULT,
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
