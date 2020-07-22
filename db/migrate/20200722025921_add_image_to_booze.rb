class AddImageToBooze < ActiveRecord::Migration[6.0]
  def change
    add_column :boozes, :image, :string
  end
end
