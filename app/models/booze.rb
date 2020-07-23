class Booze < ApplicationRecord
  has_many :boozedrinks, dependent: :destroy
  has_many :drinks, through: :boozedrinks
  has_associated_audits
  audited


  def self.search_boozes(name, production, history)
     find_by_sql(["
     SELECT *
     FROM boozes
     WHERE LOWER(name) LIKE LOWER(?) OR LOWER(production) LIKE LOWER(?) OR LOWER(history) LIKE LOWER(?)
     ORDER BY updated_at DESC
     ", "%#{name}%", "%#{production}%", "%#{history}%"])
   end
end
