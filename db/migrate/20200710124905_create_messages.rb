class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.integer :message_id
      t.string :user_id
      t.string :chat_id
      t.integer :date
      t.string :text

      t.timestamps
    end
  end
end
