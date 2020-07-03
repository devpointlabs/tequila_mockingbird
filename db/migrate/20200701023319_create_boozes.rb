class CreateBoozes < ActiveRecord::Migration[6.0]
  def change
    create_table :boozes do |t|
      t.string :name

      t.timestamps
    end
  end
end
