import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Signal from './components/Signal';
import CustomDrawer from './components/CustomDrawer'
import ViewStation from './components/ViewStation';
import Asset from './components/Asset';
import Points from './components/Points';
import AssetList from './components/AssetList';

function App() {
  return (
    <Router>
      <div className="App">
        <CustomDrawer/>
        <Switch>
          <Route exact path="/">

          </Route>
          <Route path="/signal">
            <Signal/>
          </Route>
          <Route exact path="/viewstation/:station"
              render={props => (
                  <ViewStation {...props} />
              )}
          />
          <Route exact path="/list/:asset/:station?"
              render={props => (
                  <AssetList {...props} />
              )}
          />
          <Route exact path="/points/:station?"
              render={props => (
                  <Points {...props} />
              )}
          />
          <Route path="/asset/:asset/:station/:id?"
              render={props => (
                  <Asset {...props} />
              )}
          />
        </Switch>
      </div>
    </Router>
  ); 
}

export default App;
