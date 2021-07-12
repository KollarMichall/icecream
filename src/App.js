import Header from './structure/Header';
import Footer from './structure/Footer';
import Menu from './ice-cream/Menu';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import './styles/app.scss';
import EditIceCream from './ice-cream/EditIceCream';

function App() {
  return (
    <Router>
      <div className="App">
      <Header/>
        <Switch>
          <Route path="/" exact component={Menu}/>
          <Route path="/menu-items/:menuItemId" component={EditIceCream}/>
          <Redirect to="/"/>
        </Switch>
      <Footer/>
      </div>
    </Router>
  );
}

export default App;
