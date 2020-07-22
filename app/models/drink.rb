class Drink < ApplicationRecord
  has_many :boozedrinks, dependent: :destroy 
  has_many :boozes, through: :boozedrinks
  has_many :comments, dependent: :destroy
  audited

  has_associated_audits
end
