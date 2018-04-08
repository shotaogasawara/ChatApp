import React from 'react'
import SearchResultStore from '../../stores/searchUser'

export default class SearchResult extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.getStateFromStore()
  }

  // 検索結果をストアから取得
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
    if (this.state) { // stateがから文字の場合は除く
      const users = this.state.searchUserResultJson.map((user) => {
        return (
          <li> {user.id} </li>
        )
      })

      return (
        <div className='users-list'>
          <ul>
            {users}
          </ul>
        </div>
      )
    } else {
      return (
        <h1>state = null</h1>
      )
    }
  }
}
