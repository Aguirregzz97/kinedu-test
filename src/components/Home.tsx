import * as React from 'react'
import { InitialScreen } from './InitialScreen'
import { getActivities } from '../shared/RestApi'

type State = {
}

type Props = {
}

export class Home extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
  }

  async componentDidMount() {
    let activites = await getActivities()
    console.log(activites)
  }

  render() {
    return (
        <InitialScreen />
    )
  }
}
