class Drink < ApplicationRecord
  has_many :boozedrinks, dependent: :destroy 
  has_many :boozes, through: :boozedrinks
  has_many :comments, dependent: :destroy
  audited

  has_associated_audits

   def self.search_drinks(name, history, ingredients, prep_serv)
     find_by_sql(["
     SELECT *
     FROM drinks
     WHERE LOWER(name) LIKE LOWER(?) OR LOWER(history) LIKE LOWER(?) OR LOWER(ingredients) LIKE LOWER(?) OR LOWER(prep_serv) LIKE LOWER(?)
     ORDER BY updated_at DESC
     ", "%#{name}%", "%#{history}%", "%#{ingredients}%", "%#{prep_serv}%"])
   end

end
