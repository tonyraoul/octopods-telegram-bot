class CreateChats < ActiveRecord::Migration[6.0]
  def change
    create_table :chats do |t|
      t.boolean :closed, default: false
      t.boolean :archived, default: false
      t.string  :name

      t.timestamps
    end
  end
end
