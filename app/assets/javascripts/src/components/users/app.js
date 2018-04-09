import React from 'react'
import Logo from './logo'
import SearchBox from './searchBox'
import SearchResult from './searchResult'

class App extends React.Component {

  render() {
    return (
      <div className='app'>
        <div className='search'>
          <Logo/>
          <SearchBox/>
          <SearchResult/>
        </div>
      </div>
    )
  }
}

export default App
