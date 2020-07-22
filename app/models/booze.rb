class Booze < ApplicationRecord
  has_many :boozedrinks, dependent: :destroy
  has_many :drinks, through: :boozedrinks
  has_associated_audits
  audited
end
