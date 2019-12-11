import * as React from 'react'

type State = {
}

type Props = {
}

export class InitialScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>This is the initial screen</h1>
      </div>
    )
  }
}
