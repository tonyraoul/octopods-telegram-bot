class Chat < ApplicationRecord
  has_many :message
  validates :name, presence: true
  validates :id, presence: true
end
