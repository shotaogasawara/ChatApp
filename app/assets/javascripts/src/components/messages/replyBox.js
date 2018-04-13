import React from 'react'
import MessagesAction from '../../actions/messages'
import GetMessagesAction from '../../actions/messages'

class ReplyBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      value: '',
    }
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      if (this.state.value) { // 空文字は発火させない
        MessagesAction.postMessage(this.props.currentUser.id, this.props.selectedFriend.id, this.state.value) // メッセージをrailsにpostする
        GetMessagesAction.getMessage(this.props.currentUser.id, this.props.selectedFriend.id) // メッセージを取得
        this.setState({
          value: '',
        })
      }
    }
  }

  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }

  uploadImage(e) {
    const inputDOM = e.target
    if (!inputDOM.files.length) return
    const file = inputDOM.files[0]
    MessagesAction.postImage(this.props.currentUser.id, this.props.selectedFriend.id, file)
    GetMessagesAction.getMessage(this.props.currentUser.id, this.props.selectedFriend.id) // メッセージを取得
  }

  render() {
    return (
      <div className='reply-box'>
        <input
          value={this.state.value}
          onKeyDown={this.handleKeyDown.bind(this)}
          onChange={this.updateValue.bind(this)}
          className='reply-box__input'
          placeholder='Type message to reply..'
        />
        <input
          type='file'
          onChange={this.uploadImage.bind(this)}
        />

        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
      </div>
    )
  }
}

export default ReplyBox
