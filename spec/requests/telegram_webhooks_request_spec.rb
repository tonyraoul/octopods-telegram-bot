require 'rails_helper'
require 'telegram/bot/rspec/integration/rails'

RSpec.describe 'TelegramWebhooks', telegram_bot: :rails do
  describe '#start!' do
    subject { -> { dispatch_command :start } }
    it { should respond_with_message 'Hi there!' }
  end
  describe '#message' do
    it 'saves message' do
      expect do
        dispatch_message('Hi', { chat: { first_name: 'a', last_name: 'b'}})
      end.to change { Message.count }.by(1)
    end
    it 'saves new chat' do
      expect do
        dispatch_message('Hi', { chat: { id: 2, first_name: 'a', last_name: 'b'}})
      end.to change { Chat.count }.by(1)
    end
    it 'appends message to existing chats' do
      chat = create(:chat)
      expect do
        dispatch_message('Hi', { chat: { id: chat.id, first_name: 'a', last_name: 'b'}})
      end.to change { Chat.count }.by(0)
    end
  end
end
