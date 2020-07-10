require 'rails_helper'
require 'telegram/bot/rspec/integration/rails'

RSpec.describe 'TelegramWebhooks', telegram_bot: :rails do
  describe '#start!' do
    subject { -> { dispatch_command :start } }
    it { should respond_with_message 'Hi there!' }
  end
end
