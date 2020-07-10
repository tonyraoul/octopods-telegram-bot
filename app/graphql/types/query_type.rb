module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    field :messages, [Types::MessageType], null: false
    def messages
      Message.all
    end
  end
end
