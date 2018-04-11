import React from 'react'
import SearchFriendsStore from '../../stores/searchFriends'

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
      ReceiverId: '', // ここ、初期値を取得したいところ
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

  // 名前をクリックするとReceiverを更新
  changeReceiver(user_id) {
    this.setState({
      ReceiverId: user_id,
    })
  }

  // 友達一覧をリスト表示
  render() {
    const {friends} = this.state // const friends = this.state.friendsと同じ

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
