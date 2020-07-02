class CreateBoozedrinks < ActiveRecord::Migration[6.0]
  def change
    create_table :boozedrinks do |t|
      t.belongs_to :booze, null: false, foreign_key: true
      t.belongs_to :drink, null: false, foreign_key: true

      t.timestamps
    end
  end
end
