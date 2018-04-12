import {ActionTypes} from '../constants/app'
import Dispatcher from '../dispatcher'
import ReceiverStore from '../stores/receiver'

export default {
  // getCurrentReceiver() {
  //   const currentUser = ReceiverStore.getCurrentReceiver()
  //   Dispatcher.handleViewAction({
  //     type: ActionTypes.GET_CURRENT_RECEIVER,
  //     currentUser: currentUser,
  //   })
  // },
  setCurrentReceiver(selectedFriend) {
    ReceiverStore.setCurrentReceiver(selectedFriend)
    Dispatcher.handleViewAction({
      type: ActionTypes.SET_SELECTED_FRIEND,
      selectedFriend,
    })
  },
}
