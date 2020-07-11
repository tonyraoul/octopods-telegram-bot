class TelegramWebhooksController < Telegram::Bot::UpdatesController
  def start!(*)
    respond_with :message, text: t('.content')
  end

  def message(message)
    # Create or update chat in database
    chat = Chat.where(id: message['chat']['id']).first_or_initialize.tap do |chat|
      chat.name = message['chat']['first_name'] + ' ' + message['chat']['last_name']
      chat.save
    end
    new_message = Message.new(
      text: message['text'],
      message_id: message['message_id'],
      user_id: message['from']['id'],
      date: message['date'],
      is_reply: false
    )
    new_message.chat = chat
    new_message.save
  end
end
