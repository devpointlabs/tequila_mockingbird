class Comment < ApplicationRecord
  belongs_to :drink
  audited associated_with: :drink
  audited

end
