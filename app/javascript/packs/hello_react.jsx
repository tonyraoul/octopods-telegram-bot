import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import SideBar from '../components/sidebar'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { Provider } from 'react-redux'
import store from '../redux/store'

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
})

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`


const App = () => <ApolloProvider client={client}>
  <Provider store={store}>
    <AppContainer>
      <SideBar></SideBar>
    </AppContainer>
  </Provider>
</ApolloProvider>

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
