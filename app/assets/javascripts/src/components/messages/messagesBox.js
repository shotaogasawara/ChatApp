import React from 'react'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages' // 追記
import ReplyBox from '../../components/messages/replyBox'
import Utils from '../../utils'
import GetMessagesAction from '../../actions/messages'

class MessagesBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {
      messages: MessagesStore.getMessages(),
    }
  }

  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  render() {
    const {messages} = this.state
    const chatsList = messages.map(message => {
      if (message.sender_id === this.props.currentUser.id) {
        return (
          <li className='message-box__item message-box__item--from-current clear'>
            <div className='message-box__item__contents message-box__item--from-current'>
              {message.content}
            </div>
          </li>
        )
      } else {
        return (
          <li className='message-box__item clear'>
            <div className='message-box__item__contents'>
              {message.content}
            </div>
          </li>
        )
      }
    })
    return (
      <div className='message-box'>
        <ul className='message-box__list'>
          {chatsList}
        </ul>
        <ReplyBox currentUser={this.props.currentUser} currentReceiver={this.props.currentReceiver}/>,
      </div>
    )
  }

}

export default MessagesBox
