import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useSelector, useDispatch } from 'react-redux'
import { SET_ACTIVE_CHAT } from '../redux/actionTypes'

const StyledSideBar = styled.div`
background-color: #ccc;
width: 300px;
height: 100%;
`
const StyledChat = styled.div`
  border: 1px solid #ccc;
  padding: 5px;
  &.active {
    background-color: #E3E3E3;
  }
`

const ChatsQuery = gql`
query {
    chats {
        name,
        id
    }
}
`
const subscribeToMoreQuery = gql`
subscription {
  newChat {
    name,
    id
  }
 }`

const Chat = ({ name, active, id}) => {
  const dispatch = useDispatch()
  const setActiveChat = useCallback(
    () => dispatch({ type: SET_ACTIVE_CHAT, payload: { activeChat: id } }),
    [dispatch]
  )
  return <StyledChat onClick={ () => setActiveChat(id) } className={active?'active':''}>{name}</StyledChat>
}

const Chats = () => {
    const { loading, error, data, subscribeToMore } = useQuery(ChatsQuery);
    const activeChat = useSelector(state => state.chats.activeChat)
    subscribeToMore({
      document: subscribeToMoreQuery,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        const newChat = subscriptionData.data.newChat

        return Object.assign({}, prev, {
          chats: [...prev.chats.filter(({id}) => id !== newChat.id ), newChat],
          __typename: prev.chats.__typename
        })
      }
    })
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return <div>
        { data.chats.map(chat => <Chat key={chat.id} active={activeChat === chat.id } {...chat}/>) }
    </div>
}

const SideBar = () => <StyledSideBar>
<Chats />
</StyledSideBar>

export default SideBar