import './App.css';
import './components/TodoList/TodoList'
import TodoList from './components/TodoList/TodoList';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <TodoList></TodoList>
    </div>
  );
}

export default App;
