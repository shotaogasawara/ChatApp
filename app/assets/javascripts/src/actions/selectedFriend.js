import {ActionTypes} from '../constants/app'
import Dispatcher from '../dispatcher'
import SelectedFriendStore from '../stores/selectedFriend'

export default {
  setCurrentSelectedFriend(selectedFriend) {
    SelectedFriendStore.setSelectedFriend(selectedFriend)
    Dispatcher.handleViewAction({
      type: ActionTypes.SET_SELECTED_FRIEND,
      selectedFriend,
    })
  },
}
