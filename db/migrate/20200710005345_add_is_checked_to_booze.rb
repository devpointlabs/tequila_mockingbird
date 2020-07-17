class AddIsCheckedToBooze < ActiveRecord::Migration[6.0]
  def change
    add_column :boozes, :is_checked, :boolean
  end
end
