import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import SideBar from '../components/sidebar'
import { ApolloLink, ApolloClient } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { Provider } from 'react-redux'
import store from '../redux/store'
import ChatArea from '../components/chat_area'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ActionCable from 'actioncable'
import ActionCableLink from 'graphql-ruby-client/dist/subscriptions/ActionCableLink'


const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql'
})

const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription',
  )
}

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new ActionCableLink({cable}),
  httpLink
)
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`


const App = () => <ApolloProvider client={client}>
  <Provider store={store}>
    <AppContainer>
      <SideBar />
      <ChatArea />
    </AppContainer>
  </Provider>
</ApolloProvider>

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
