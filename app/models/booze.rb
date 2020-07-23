class Booze < ApplicationRecord
  has_many :boozedrinks, dependent: :destroy
  has_many :drinks, through: :boozedrinks
  has_associated_audits
  audited


  def self.search_boozes(name, history)
     find_by_sql(["
     SELECT *
     FROM boozes
     WHERE LOWER(name) LIKE LOWER(?) OR LOWER(history) LIKE LOWER(?)
     ORDER BY updated_at DESC
     ", "%#{name}%", "%#{history}%"])
   end
end
