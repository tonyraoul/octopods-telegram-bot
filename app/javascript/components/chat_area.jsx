import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useSelector } from 'react-redux'
import MessageSender from './message_sender'

const StyledMessagesContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
  background-color: #eee;
  overflow-y: scroll;
  max-height: 100%;
  overscroll-behavior-y: contain;
  scroll-snap-type: y mandatory;
  & > div:last-child {
    scroll-snap-align: end;
  }
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`

const StyledChatArea = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`
const MessageFragment = `
  text,
  id,
  isReply
`

const MessagesQuery = gql`
query messages($chatId: ID!){
    messages(chatId: $chatId) {
        ${MessageFragment}
    }
}
`
const StyledMessage = styled.div`
  background-color: #BBB;
  min-width: 50px;
  width: fit-content;
  border-radius: 10px;
  margin: 10px;
  align-self: flex-start;
  padding: 20px;
  &.reply {
    background-color: #c6e0ea;
    align-self: flex-end;
  }
`
const subscribeToMoreQuery = gql`
subscription newMessages($chatId: ID!) {
  newMessage(chatId: $chatId) {
    ${MessageFragment}
  }
 }`
 console.log(subscribeToMoreQuery)
const ChatArea = () => {
  const activeChat = useSelector(state => state.chats.activeChat) || 0
  const { loading, error, data, subscribeToMore } = useQuery(MessagesQuery,
    { variables: { chatId: activeChat },
  })
  subscribeToMore({
    document: subscribeToMoreQuery,
    variables: {
     chatId: activeChat
    },
    updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        const newMessage = subscriptionData.data.newMessage

        return Object.assign({}, prev, {
          messages: [...prev.messages.filter(({id}) => id !== newMessage.id ), newMessage],
          __typename: prev.messages.__typename
        })
    }
  })
  if(loading) return <p>loading...</p>
  return <StyledChatArea>
     <StyledMessagesContainer>
      {!error && data.messages.map(message => <StyledMessage className={message.isReply ? 'reply' : ''} key={message.id}>{message.text}</StyledMessage>)}
     </StyledMessagesContainer>
     <MessageSender />
  </StyledChatArea>
}

export default ChatArea
