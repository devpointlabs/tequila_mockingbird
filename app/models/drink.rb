class Drink < ApplicationRecord
  has_many :boozedrinks, dependent: :destroy 
  has_many :boozes, through: :boozedrinks
end
