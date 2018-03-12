import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router'
import Manage from './containers/manage';
import Index from './components/index/App';
import router from './router'
const RedirectWithStatus = ({ from, to, status }) => (
  <Route render={({ staticContext }) => {
    // there is no `staticContext` on the client, so
    // we need to guard against that here
    if (staticContext) {
      staticContext.status = status
    }
    return <Redirect from={from} to={to} />
  }} />
)
class App extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <Switch>
      {
          router.map(item=>{
                if(item.redirect){
                    return <RedirectWithStatus status={301} from={item.path} to={item.redirect}/>
                }
                else{
                  return <Route exact={item.default} path={item.path} component={item.component} />
                }
            })
       }
      </Switch>
      
    );
  }
}

export default App;







