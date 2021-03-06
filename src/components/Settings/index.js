import React from 'react'
import styled from 'styled-components'
import ViewHeader from '../ViewHeader'
import Input from '../Input'
import Row from '../Row'
import Col from '../Col'

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`

const Settings = () => (
  <Wrapper>
    <ViewHeader>Settings</ViewHeader>
    <form onSubmit={e => e.preventDefault()}>
      <h2>Clock</h2>
      <Row>
        <Col width='6rem'>
          <Input name='clockGenerated' label='Generated' type='checkbox' />
        </Col>
        <Col width='4rem'>
          <Input name='clockBpm' label='BPM' type='number' />
        </Col>
      </Row>
      <h2>Aspect Ratio (when not sending to display)</h2>
      <Row>
        <Col width='4rem'>
          <Input name='aspectW' label='Width' type='number' />
        </Col>
        <Col width='4rem'>
          <Input name='aspectH' label='Height' type='number' />
        </Col>
      </Row>
      <h2>Renderer</h2>
      <Row>
        <Col width='8rem'>
          <Input name='antialias' label='Antialiasing' type='checkbox' />
        </Col>
        <Col width='8rem'>
          <Input name='throttledFPS' label='Throttled FPS' type='number' />
        </Col>
      </Row>
    </form>
  </Wrapper>
)

export default Settings
