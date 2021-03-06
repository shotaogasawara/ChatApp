import React from 'react'
import SearchFriendsStore from '../../stores/searchFriends'
import GetMessagesAction from '../../actions/messages'
import SelectedFriendAction from '../../actions/selectedFriend'

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

  changeReceiver(selectedFriend) {  // 名前をクリックするとReceiverを更新してメッセージを再表示
    SelectedFriendAction.setCurrentSelectedFriend(selectedFriend) // Receiver更新
    GetMessagesAction.getMessage(this.props.currentUser.id, selectedFriend.id) // メッセージ取得
    // JQueryでクラスを追加する
  }

  render() {  // 友達一覧をリスト表示
    const {friends} = this.state // const friends = this.state.friendsと同じ

    if (friends.length) { // 空オブジェクトの場合は表示しない
      const authenticityToken = $('meta[name=csrf-token]').attr('content')

      const friendsList = friends.map(friend => {
        return (
          <li
            onClick={this.changeReceiver.bind(this, friend)}
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
          {this.props.selectedFriend.id}
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
