import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const StyledSideBar = styled.div`
background-color: red;
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

const Chats = () => {
    const { loading, error, data } = useQuery(ChatsQuery);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return <div>
        { data.chats.map(chat => <StyledChat key={chat.id}>{chat.name}</StyledChat>) }
    </div>
}

const SideBar = () => <StyledSideBar>
<Chats />
</StyledSideBar>

export default SideBar