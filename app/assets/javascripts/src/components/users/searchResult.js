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
    // const users = this.state.searchResult // app.jsで渡したsearchResultを代入
    return (
      <h1>{ this.state }</h1>
      // <h1>test</h1>
    )
  }
}
