import React from 'react'
import SearchBox from './searchBox'
import SearchResult from './searchResult'

class App extends React.Component {

  render() {
    return (
      <div className='app'>
        <SearchBox/>
        <SearchResult/>
      </div>
    )
  }
}

export default App
