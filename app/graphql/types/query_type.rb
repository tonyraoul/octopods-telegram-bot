module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    field :messages, [Types::MessageType], null: false do
      argument :chat_id, ID, required: true
    end
    field :chats, [Types::ChatType], null: false
    def chats
      Chat.all
    end

    def messages(chat_id:)
      Message.where(chat_id: chat_id)
    end
  end
end
