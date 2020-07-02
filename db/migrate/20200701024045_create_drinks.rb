class CreateDrinks < ActiveRecord::Migration[6.0]
  def change
    create_table :drinks do |t|
      t.string :name
      t.text :history
      t.text :ingredients
      t.text :prep_serv

      t.timestamps
    end
  end
end
