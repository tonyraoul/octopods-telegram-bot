import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

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

const BOT_REPLY_MUTATION = gql`
  mutation botReply($text: String!, $chatId: Int!) {
    botReply(text: $text, chatId: $chatId) {
      id
    }
  }
`

const Container = () => {
  const [text, setText] = useState('')
  const [botReply] = useMutation(BOT_REPLY_MUTATION)
  const activeChat = useSelector(state => state.chats.activeChat) || 0
  const reply = useCallback(() => {
      botReply({ variables: { text, chatId: parseInt(activeChat) }})
      setText('')
  })
  return (<StyledContainer>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder={activeChat ? 'Start typing here..' : 'Please select a chat'} ></textarea>
      <StyledButton onClick={reply} disabled={!activeChat}>Send</StyledButton>
  </StyledContainer>)
}

export default Container
