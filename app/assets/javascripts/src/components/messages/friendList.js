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

  // 名前をクリックするとリンクに飛ぶ
  visitFriend(user_id) {
    if (confirm('リンク先に移動しても良いですか？') === true) {
      location.replace(`http://localhost:3000/#`)
    }
  }

  // 友達一覧をリスト表示
  render() {
    const {friends} = this.state
    // 上は下と同じ
    // const friends = this.state.friends

    if (friends.length) { // 空オブジェクトの場合は表示しない
      const friendsList = friends.map(friend => {
        return (
          <li onClick={this.visitFriend.bind(this, friend.id)}>
            {friend.name}
          </li>
        )
      })

      return (
        <div className='user-list'>
          <ul className={'search_user_list'}>
            {friendsList}
          </ul>
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
