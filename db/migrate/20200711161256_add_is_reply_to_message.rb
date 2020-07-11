class AddIsReplyToMessage < ActiveRecord::Migration[6.0]
  def change
    add_column :messages, :is_reply, :boolean
  end
end
