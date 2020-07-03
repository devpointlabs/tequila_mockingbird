class Drink < ApplicationRecord
  has_many :boozedrinks
  has_many :boozes, through: :boozedrinks
end
