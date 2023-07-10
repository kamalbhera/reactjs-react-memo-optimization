import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import hey from './logo.svg'
import List from './components/List';
import ClearButton from './components/ClearButton';

function App() {
  const [userList, setUserList] = useState([]);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setUserList(data)
      })
  }, [])

  const handleText = event => {
    setText(event.target.value)
  }

  const handleSearch = () => {
    setSearch(text)
  }

  const filteredUsers = useMemo(() => userList.filter(user => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  }), [search, userList])

  const clearSearch = useCallback(() => {
    setSearch('');
    setText('');
  }, [])

  return (
    <div>
      <Header imgPath={hey} />
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 20 }}>
      </div>
      <div>
        <h1 style={{ textAlign: 'center' }}>Subscribed List</h1>
      </div>
      <hr />
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input type='text' value={text} onChange={handleText} />
          <button type='button' onClick={handleSearch}>Search</button>
        </div>
        <List userList={filteredUsers} />
        <ClearButton handleClear={clearSearch} />
      </div>
    </div>
  );
}

export default App;
