class AddImageToDrinks < ActiveRecord::Migration[6.0]
  def change
    add_column :drinks, :image, :string
  end
end
