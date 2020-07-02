class Booze < ApplicationRecord
  has_many :boozedrinks
  has_many :drinks, through: :boozedrinks
end
