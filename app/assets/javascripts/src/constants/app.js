import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  UPDATE_OPEN_CHAT_ID: null,
  SEND_MESSAGE: null,
  GET_MESSAGE: null,
  POST_MESSAGE: null,
  GET_SEARCH_USER_RESULT: null,
  GET_CURRENT_USER: null,
  GET_CURRENT_RECEIVER: null,
  GET_FRIEND: null,
  GET_SEARCH_FRIEND_RESULT: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGE: APIRoot + '/messages.json',
  SEARCH_USER: APIRoot + '/users/search',
  CURRENT_USER: APIRoot + '/users/get_current_user',
  SEARCH_FRIEND: APIRoot + '/friendships/get_friend',
}
