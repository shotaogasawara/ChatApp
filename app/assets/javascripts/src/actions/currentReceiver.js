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
  setCurrentReceiver(receiver) {
    ReceiverStore.setCurrentReceiver(receiver)
    Dispatcher.handleViewAction({
      type: ActionTypes.SET_CURRENT_RECEIVER,
    })
  },
}
