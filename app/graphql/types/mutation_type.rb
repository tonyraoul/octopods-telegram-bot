module Types
  class MutationType < Types::BaseObject
    field :bot_reply, Types::MessageType, null: true do
      argument :text, String, required: true
      argument :chat_id, Integer, required: true
    end

    def bot_reply(text:, chat_id:)
      chat = Chat.find(chat_id)
      Telegram.bot.send_message(chat_id: chat_id, text: text)
      message = Message.create(text: text, is_reply: true)
      message.chat = chat
      message.save
      message
    end
  end
end
