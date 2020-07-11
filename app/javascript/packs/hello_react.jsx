import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import SideBar from '../components/sidebar'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
})

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`


const App = () => <ApolloProvider client={client}>
  <AppContainer>
    <SideBar></SideBar>
  </AppContainer>
</ApolloProvider>

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
