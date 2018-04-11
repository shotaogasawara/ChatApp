import React from 'react'
import SearchUserAction from '../../../src/actions/searchUser'

export default class SearchBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  // 検索ボックスの初期値をから文字に設定
  get initialState() {
    return {
      searchWord: '',
    }
  }

  // Etnが押下されるとDBに検索をかける
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      SearchUserAction.getSearchUserResult(this.state.searchWord) // 入力ワードのDB検索結果を取得
    }
  }

  // stateの値を検索ボックスの値と同期させる
  updateSearchWord(e) {
    this.setState({
      searchWord: e.target.value,
    })
  }

  render() {
    return (
      <input
        className='search_form'
        onKeyDown={this.handleKeyDown.bind(this)}
        onChange={this.updateSearchWord.bind(this)}
        placeholder='ユーザー名で検索しよう'
      />
    )
  }
}
