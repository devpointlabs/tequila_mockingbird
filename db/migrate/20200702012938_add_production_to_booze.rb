class AddProductionToBooze < ActiveRecord::Migration[6.0]
  def change
    add_column :boozes, :production, :text
  end
end
