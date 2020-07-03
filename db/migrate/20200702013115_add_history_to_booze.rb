class AddHistoryToBooze < ActiveRecord::Migration[6.0]
  def change
    add_column :boozes, :history, :text
  end
end
