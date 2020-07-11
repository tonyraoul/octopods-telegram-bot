import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useSelector } from 'react-redux'

const StyledChatArea = styled.div`
  width: 100%;
  background-color: #eee;
  overflow-y: scroll;
  overscroll-behavior-y: contain;
  scroll-snap-type: y mandatory;
  & > div:last-child {
    scroll-snap-align: end;
  }
`
const MessagesQuery = gql`
query messages($chatId: ID!){
    messages(chatId: $chatId) {
        text,
        id
    }
}
`
const StyledMessage = styled.div`
  background-color: #BBB;
  min-width: 50px;
  width: fit-content;
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
`

const ChatArea = () => {
  const activeChat = useSelector(state => state.chats.activeChat) || 0
  const { loading, error, data } = useQuery(MessagesQuery,
    { variables: { chatId: activeChat },
    pollInterval: 500,
  })
  if(loading) return <p>loading...</p>
  if(error) return <p>error :(</p>
  return <StyledChatArea>
    {data.messages.map(message => <StyledMessage key={message.id}>{message.text}</StyledMessage>)}
  </StyledChatArea>
}

export default ChatArea
