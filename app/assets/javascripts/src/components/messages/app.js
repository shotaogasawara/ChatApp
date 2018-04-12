import React from 'react'
import Header from './header'
import MessagesBox from './messagesBox'
import UserStore from '../../stores/user'
import FriendList from './friendList'
import ReceiverStore from '../../stores/receiver'

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
      currentReceiver: ReceiverStore.getCurrentReceiver(),
    }
  }

  componentWillMount() {
    UserStore.onChange(this.onStoreChange.bind(this))
    ReceiverStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange.bind(this))
    ReceiverStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  render() {
    const {currentUser, currentReceiver} = this.state
    return (
      <div className='app'>
        <Header/>
        <MessagesBox currentUser={currentUser} currentReceiver={currentReceiver}/>
        <FriendList currentUser={currentUser} currentReceiver={currentReceiver}/>
      </div>
    )
  }
}

export default App
