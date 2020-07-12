
require 'rails_helper'

module Mutations
  module BotReply
        RSpec.describe BotReply, type: :request do
            describe '.reply' do
                it 'creates a message' do
                    chat = create(:chat)
                    expect do
                        post '/graphql', params: { query: query(chat_id: 1, text: 'a') }
                    end.to change { Message.count }.by(1)
                end
            end
            def query(chat_id:, text:)
                <<~GQL
                mutation {
                    botReply(
                    chatId: #{chat_id},
                    text: "#{text}"
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