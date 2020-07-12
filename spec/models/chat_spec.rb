require 'rails_helper'

RSpec.describe Chat, type: :model do
  context 'validation test' do
    it 'ensures name presence' do
      chat = Chat.new(id: 1).save
      expect(chat).to eq(false)
    end
    it 'ensures id presence' do
      chat = Chat.new(name: 'John Doe').save
      expect(chat).to eq(false)
    end
  end
end
