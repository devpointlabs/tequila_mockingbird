# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_01_024226) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "boozedrinks", force: :cascade do |t|
    t.bigint "booze_id", null: false
    t.bigint "drink_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["booze_id"], name: "index_boozedrinks_on_booze_id"
    t.index ["drink_id"], name: "index_boozedrinks_on_drink_id"
  end

  create_table "boozes", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "drinks", force: :cascade do |t|
    t.string "name"
    t.text "history"
    t.text "ingredients"
    t.text "prep_serv"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "boozedrinks", "boozes"
  add_foreign_key "boozedrinks", "drinks"
end
