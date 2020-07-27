module Types
  class SubscriptionType < Types::BaseObject
    field :newChat, Types::ChatType, null: false, description: 'A new chat'

    field :newMessage, Types::MessageType, null: false, description: 'A new Message' do
      argument :chat_id, ID, required: true
    end

    def new_message(chat_id:)
    end

    def new_chat
    end
  end
end