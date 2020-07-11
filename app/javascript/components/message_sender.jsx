import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const StyledContainer = styled.div`
  background-color: #CDCDCD;
  min-height: 80px;
  width: 100%;
  display: flex;
  textarea {
    width: 100%;
    margin-left: 40px;
    background: transparent;
    border: 0;
    outline: none;
    resize: none;
    padding: 10px;
  }
`
const StyledButton = styled.button`
  border: 0;
  background-color: blue;
  color: white;
  &:disabled {
    opacity: 0;
  }
`

const Container = () => {
  const activeChat = useSelector(state => state.chats.activeChat) || 0
  return (<StyledContainer>
      <textarea placeholder={activeChat ? 'Start typing here..' : 'Please select a chat'} ></textarea>
      <StyledButton disabled={!activeChat}>Send</StyledButton>
  </StyledContainer>)
}

export default Container
