import React from 'react'
import ParamBar from '../../containers/ParamBar'
import ParamInputSelect from '../../containers/ParamInputSelect'
import Modifier from '../../containers/Modifier'
import styled from 'styled-components'

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 1rem;
  margin: 0 0.5rem 0.5rem 0;
`

const Items = styled.div`

`

const Param = ({ title, nodeId, modifierIds }) => (
  <Wrapper>
    {title}
    <br />
    <ParamBar nodeId={nodeId} />
    <ParamInputSelect nodeId={nodeId} />

    <Items>
      {modifierIds.map((id) => (
        <Modifier nodeId={id} key={id} />
      ))}
    </Items>
  </Wrapper>
)

Param.propTypes = {
  title: React.PropTypes.string.isRequired,
  nodeId: React.PropTypes.string.isRequired,
  modifierIds: React.PropTypes.arrayOf(
    React.PropTypes.string
  )
}

export default Param
