import * as React from 'react'
import { RingLoader } from 'react-spinners'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  align-items: center;
`

type State = {
}

type Props = {
}

export class RingLoaderWrapper extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <RingLoader
          color='#0E76BC'
          size={ 160 } />
      </Container>
    )
  }
}
