import React from 'react';
import './App.css';
import {Container} from 'reactstrap';
import Navbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Container>
        <ItemModal />
      </Container>      
      <ShoppingList />
    </div>
  );
}

export default App;
