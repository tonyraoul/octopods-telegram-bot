module Types
  class SubscriptionType < Types::BaseObject
    field :newMessage, Types::MessageType, null: false, description: 'A new Message' do
      argument :chat_id, ID, required: true
    end

    def new_message(chat_id:)
    end
  end
end