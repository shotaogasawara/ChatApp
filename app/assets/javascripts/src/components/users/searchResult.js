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

  // ユーザ一覧をリスト表示
  render() {
    const users = SearchResultStore.getSearchUser()
    if (users.length) { // 空オブジェクトの場合は表示しない
      const usersList = users.map(user => {
        return (
          <li>{user.name}</li>
        )
      })

      return (
        <div className='users-list'>
          <ul>
            {usersList}
          </ul>
        </div>
      )
    } else {
      return (
        <div className='users-list'>
        </div>
      )
    }
  }
}
