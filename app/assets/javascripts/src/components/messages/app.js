import React from 'react'
import Header from './header'
import MessagesBox from './messagesBox'
import UserStore from '../../stores/user'
import FriendList from './friendList'

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
    }
  }
  componentWillMount() {
    UserStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  render() {
    return (
        <div className='app'>
          <Header />
          <MessagesBox user={this.state.currentUser} />
          <FriendList />
        </div>
      )
  }
}

export default App
