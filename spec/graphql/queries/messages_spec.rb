require 'rails_helper'

module Queries
  module Messages
        RSpec.describe Messages, type: :request do
            describe '.resolve' do
                it 'retrive messages of a chat' do
                    chat = create(:chat)
                    message = create(:message)
                    post '/graphql', params: { query: query(chat_id: 1) }
                    json = JSON.parse(response.body)
                    data = json['data']['messages']
                    expect(data).to include(
                        'id' => be_present,
                        'text' => message.text
                    )
                end
            end
            def query(chat_id:)
                <<~GQL
                query {
                    messages(
                    chatId: #{chat_id},
                    ) {
                        id
                        text
                    }
                }
                GQL
           end
        end
  end
end