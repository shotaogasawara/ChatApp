import React from 'react'
import MessagesAction from "../../actions/messages"
import MessagesStore from "../../stores/messages"

export default class SearchBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  //
  get initialState() {
    return {
      value: '',
    }
  }
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      MessagesAction.sendMessage(MessagesStore.getOpenChatUserID(), this.state.value) // メッセージをStoreして画面に表示する
      MessagesAction.postMessage(this.state.value) // メッセージをpostする
      this.setState({
        value: '',
      })
    }
  }
  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    return (
      <div className='search-box'>
        <input
          value = { this.state.value }
          onKeyDown = { this.handleKeyDown.bind(this) }
          onChange = { this.updateValue.bind(this) }
          className='reply-box__input'
          placeholder='Type message to reply..'
        />
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
      </div>
    )
  }
}
