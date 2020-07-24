# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# boozes = ['vodka', 'tequila', 'whiskey']
User.create(
  # all the stuff
  # Add a admin column to user through a migration - boolean
  # seed this user with the admin value as true
  name: 'Mumbo Jumbo',
  email: 'admin@tm.com',
  password: 'password',
  admin:  true
)

#List of Boozes:
booze = Booze.create(
  name: 'Vodka',
  production: 'It is composed primarily of water and ethanol, but sometimes with traces of impurities and flavorings. 
                Traditionally it is made by distilling the liquid from cereal grains that have been fermented, with potatoes 
                arising as a substitute in more recent times, and some modern brands using fruits or sugar as the base.',
  history: 'Originated in Poland and Russia',
  is_checked: false,
)

booze = Booze.create(
  name: 'Rum',
  production: 'Is a liquor made by fermenting then distilling sugarcane molasses or sugarcane juice. The distillate, a clear 
                liquid, is usually aged in oak barrels.',
  history: 'Most rums are produced in Caribbean and American countries, but also in other sugar producing countries, such as the Philippines and India.',
  is_checked: false,
)

booze = Booze.create(
  name: 'Whiskey',
  production: 'Distilling techniques were brought to Ireland and Scotland sometime between 1100 and 1300 by monks. Since wine was 
                not easily obtained there, barley beer was distilled into a liquor which became whiskey.',
  history: 'Was originally used as a medicine, both as an internal anesthetic and an external antibiotic.',
  is_checked: false,
)

booze = Booze.create(
  name: 'Tequila',
  production: 'A fermented beverage from the agave plant known as pulque was consumed in pre-Columbian central Mexico before European contact.',
  history: 'Was first produced in the 16th century near the location of the city of Tequila, which was not officially established until 1666.',
  is_checked: false,
)

booze = Booze.create(
  name: 'Gin',
  production: 'By the 1600s, the Dutch were producing gin in earnest, with hundreds of distilleries in the city of Amsterdam alone.',
  history: 'Likely traces its origins to liquors produced back in the Middle Ages, with references to a spirit flavored with “genever” 
            referenced in a 13th Century Flemish manuscript.',
  is_checked: false,
)

booze = Booze.create(
  name: 'Triple Sec',
  production: "It's a mix of Haitian orange peels, Normandy sugar beets, secret family ingredients and pure alcohol. He called it
               “Combier Liqueur d'Orange.” The liqueur is triple-distilled in copper stills to enhance its flavors and quality.",
  history: "Was created in 1834 by Jean-Baptiste Combier in France's Loire Valley.",
  is_checked: false,
)

booze = Booze.create(
  name: 'Bourbon',
  production: 'A type of American whiskey, a barrel-aged distilled spirit made primarily from corn',
  history: "The name ultimately derives from the French Bourbon dynasty, although the precise inspiration for the whiskey's name 
            is uncertain; contenders include Bourbon County in Kentucky and Bourbon Street in New Orleans, both of which are named 
            after the dynasty.",
  is_checked: false,
)

booze = Booze.create(
  name: 'Jägermeister',
  production: "Jägermeister's ingredients include 56 herbs, fruits, roots, and spices, including citrus peel, licorice, anise, poppy seeds, 
                saffron, ginger, juniper berries, and ginseng.[15] These ingredients are ground, then steeped in water and alcohol for two 
                to three days. Afterwards, this mixture is filtered and stored in oak barrels for about a year. When a year has passed, the 
                liqueur is filtered again, then mixed with sugar, caramel, and alcohol.",
  history: "was invented in the year 1934, but we must go back as far as 1870 in order to get the full vibrant story behind this 
            unique flavoured liqueur. The company's founder Wilhelm Mast moved to Wolfenbüttel, near Brunswick, Germany, in the 
            early 1870s in search of creating a successful business.",
  is_checked: false,
)


drink = Drink.create(
  name: 'Vodka Martini',
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
