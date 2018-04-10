import React from 'react'
import Header from './header'
import UserList from './userList'
import MessagesBox from './messagesBox'
import MessagesStore from "../../stores/messages";
import UserStore from "../../stores/user";

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
          <UserList user={this.state.currentUser}/>
          <MessagesBox />
        </div>
      )
  }
}

export default App
