import React from 'react'
import SearchFriendsStore from '../../stores/searchFriends'
import GetMessagesAction from '../../actions/messages'
import CurrentReceiverAction from '../../actions/currentReceiver'

class FriendList extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {
      friends: SearchFriendsStore.getFriends(),
    }
  }

  componentWillMount() {
    SearchFriendsStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    SearchFriendsStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  // 名前をクリックするとReceiverを更新してメッセージを再表示
  changeReceiver(user_id) {
    // this.setState({
    //   ReceiverId: user_id,
    // })
    CurrentReceiverAction.setCurrentReceiver(user_id) // Receiver更新
    GetMessagesAction.getMessage(this.props.currentUser.id, user_id) // メッセージ取得
  }

  // 友達一覧をリスト表示
  render() {
    const {friends} = this.state // const friends = this.state.friendsと同じ

    // if (friends.length) { // ReceriverIdの初期値取得
    //   this.state.ReceiverId = friends[0].id
    // }

    if (friends.length) { // 空オブジェクトの場合は表示しない
      const authenticityToken = $('meta[name=csrf-token]').attr('content')

      const friendsList = friends.map(friend => {
        return (
          <li
            onClick={this.changeReceiver.bind(this, friend.id)}
            className='user-list__item clear'
          >
            <form action={`friendships/delete?user_id=${ friend.id }`} method='post'>
              <input type='hidden' name='authenticity_token' value={authenticityToken}/>
              <input type='submit' value='×' className='remove-chat-btn'/>
            </form>
            <div className='user-list__item__picture'>
              <img src='/assets/default_image.jpg' alt=''/>
            </div>
            <div className='user-list__item__details'>
              <div className='user-list__item__name'>
                <a href={`users/${friend.id}`} className='user-list-name'>
                  {friend.name}
                </a>
              </div>
            </div>
          </li>
        )
      })

      return (
        <div className='user-list'>
          <ul className={'user-list__list'}>
            {friendsList}
          </ul>
          {this.state.ReceiverId}
        </div>
      )
    } else {
      return (
        <div className='user-list'>
        </div>
      )
    }
  }
}

export default FriendList
