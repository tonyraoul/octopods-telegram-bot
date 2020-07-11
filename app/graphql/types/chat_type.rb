module Types
  class ChatType < Types::BaseObject
    field :id, ID, null: false
    field :closed, Boolean, null: true
    field :archived, Boolean, null: true
    field :name, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
