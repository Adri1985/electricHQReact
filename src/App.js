
import NavBar from './components/NavBar/NavBar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';




function App() {
  return (
    <div className="App">
        <NavBar />
        <ItemListContainer saludo="Welcome to ElectricHQ"/>
    </div>
  );
}

export default App;
