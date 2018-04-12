import React from 'react'
import MessagesBox from './messagesBox'
import UserStore from '../../stores/user'
import FriendList from './friendList'
import SelectedFriendStore from '../../stores/selectedFriend'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {
      currentUser: UserStore.getCurrentUser(),
      selectedFriend: SelectedFriendStore.getSelectedFriend(),
    }
  }

  componentWillMount() {
    UserStore.onChange(this.onStoreChange.bind(this))
    SelectedFriendStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange.bind(this))
    SelectedFriendStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  render() {
    const {currentUser, selectedFriend} = this.state
    return (
      <div className='app'>
        <MessagesBox currentUser={currentUser} selectedFriend={selectedFriend}/>
        <FriendList currentUser={currentUser} selectedFriend={selectedFriend}/>
      </div>
    )
  }
}

export default App
