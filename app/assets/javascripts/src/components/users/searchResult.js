import React from 'react'
import SearchResultStore from '../../stores/searchUser'

export default class SearchResult extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.getStateFromStore()
  }

  // ストアから取得
  getStateFromStore() {
    return SearchResultStore.getSearchUser()
  }

  componentWillMount() {
    SearchResultStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    SearchResultStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  // 名前をクリックすると友達になれる
  becomeFriend(user_id) {
    if (confirm('本当に友達になりますか？') === true) {
      location.replace(`http://localhost:3000/friendships/create?user_id=${user_id}`)
    }
  }

  // ユーザ一覧をリスト表示
  render() {
    const users = SearchResultStore.getSearchUser()

    if (users.length) { // 空オブジェクトの場合は表示しない
      const usersList = users.map(user => {
        return (
          <li
            className='search_user_list_item'
            onClick={this.becomeFriend.bind(this, user.id)}
          >
            {/*<form action={`/friendships/create?user_id=${ user.id }`} method='post'>*/}
            {/*<input type='hidden' name='authenticity_token' value={authenticityToken} />*/}
            {/*<input type='submit' value='●' className=''/>*/}
            {/*</form>*/}
            <div className='search_user_list_result'>
              <img
                className='search_user_list_result_image'
                src='/assets/default_image.jpg'
                alt=''
              />
              <span>{user.name}</span>
            </div>
          </li>
        )
      })

      return (
        <ul className='search_user_list'>
          {usersList}
        </ul>
      )
    } else {
      return (
        <div className='users-list'>
        </div>
      )
    }
  }
}
