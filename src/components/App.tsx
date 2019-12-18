import '@fortawesome/fontawesome-free/css/all.css'
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import './../assets/scss/App.scss'
import { Home } from './Home'

type State = {
  currentSeason: string
}

type Props = {
}

export class App extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <main>
          <Switch>
            <Route exact={ true } path='/:id?' component={ Home } />
          </Switch>
        </main>
      </div>
    )
  }
}
