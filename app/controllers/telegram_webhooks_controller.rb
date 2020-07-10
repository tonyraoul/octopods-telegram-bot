class TelegramWebhooksController < Telegram::Bot::UpdatesController
  def start!(*)
    respond_with :message, text: t('.content')
  end

  def message(message)
    # Save messages to database
    Message.create(
      text: message['text'],
      message_id: message['message_id'],
      chat_id: message['chat']['id'],
      user_id: message['from']['id'],
      date: message['date']
    )
  end
end
