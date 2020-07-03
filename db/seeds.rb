# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# boozes = ['vodka', 'tequila', 'whiskey']

booze = Booze.create(
  name: 'vodka',
  production: 'made with potatoes',
  history: 'unknown...',
  
)

drink = Drink.create(
  name: 'vodka martini',
  history: 'James Bond',
  ingredients: 'vodka and an olive',
  prep_serv: 'shaken NOT Stirred',
  
)

boozedrink = Boozedrink.create(
  booze_id: booze.id,
  drink_id: drink.id
)

puts "Data Seeded."
# drinks = ['white russian', 'vodka martini']
