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

const Chat = ({ name, active, id}) => {
  const dispatch = useDispatch()
  const setActiveChat = useCallback(
    () => dispatch({ type: SET_ACTIVE_CHAT, payload: { activeChat: id } }),
    [dispatch]
  )
  return <StyledChat onClick={ () => setActiveChat(id) } className={active?'active':''}>{name}</StyledChat>
}

const Chats = () => {
    const { loading, error, data } = useQuery(ChatsQuery, {
      pollInterval: 500,
    });
    const activeChat = useSelector(state => state.chats.activeChat)
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