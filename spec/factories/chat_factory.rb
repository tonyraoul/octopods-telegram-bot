FactoryBot.define do
  factory :chat do
    id { 1 }
    name { 'John Doe' }
    closed { false }
    archived { false }
  end
end