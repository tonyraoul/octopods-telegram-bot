FactoryBot.define do
  factory :message do
    text { 'text' }
    chat_id { 1 }
    sequence(:message_id)
    is_reply { false }
  end
end