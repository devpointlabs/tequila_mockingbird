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
  production: 'It is composed primarily of water and ethanol, but sometimes with traces of impurities and flavorings. Traditionally it is made by distilling the liquid from cereal grains that have been fermented, with potatoes arising as a substitute in more recent times, and some modern brands using fruits or sugar as the base.',
  history: 'Originated in Poland and Russia',
  is_checked: false,
)

booze = Booze.create(
  name: 'Rum',
  production: 'Is a liquor made by fermenting then distilling sugarcane molasses or sugarcane juice. The distillate, a clear liquid, is usually aged in oak barrels.',
  history: 'Most rums are produced in Caribbean and American countries, but also in other sugar producing countries, such as the Philippines and India.',
  is_checked: false,
)

booze = Booze.create(
  name: 'Whiskey',
  production: 'Distilling techniques were brought to Ireland and Scotland sometime between 1100 and 1300 by monks. Since wine was not easily obtained there, barley beer was distilled into a liquor which became whiskey.',
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
  history: 'Likely traces its origins to liquors produced back in the Middle Ages, with references to a spirit flavored with “genever” referenced in a 13th Century Flemish manuscript.',
  is_checked: false,
)

booze = Booze.create(
  name: 'Triple Sec',
  production: "It's a mix of Haitian orange peels, Normandy sugar beets, secret family ingredients and pure alcohol. He called it “Combier Liqueur d'Orange.” The liqueur is triple-distilled in copper stills to enhance its flavors and quality.",
  history: "Was created in 1834 by Jean-Baptiste Combier in France's Loire Valley.",
  is_checked: false,
)

booze = Booze.create(
  name: 'Bourbon',
  production: 'A type of American whiskey, a barrel-aged distilled spirit made primarily from corn',
  history: "The name ultimately derives from the French Bourbon dynasty, although the precise inspiration for the whiskey's name is uncertain; contenders include Bourbon County in Kentucky and Bourbon Street in New Orleans, both of which are named after the dynasty.",
  is_checked: false,
)

booze = Booze.create(
  name: 'Jägermeister',
  production: "Jägermeister's ingredients include 56 herbs, fruits, roots, and spices, including citrus peel, licorice, anise, poppy seeds, saffron, ginger, juniper berries, and ginseng.[15] These ingredients are ground, then steeped in water and alcohol for two to three days. Afterwards, this mixture is filtered and stored in oak barrels for about a year. When a year has passed, the liqueur is filtered again, then mixed with sugar, caramel, and alcohol.",
  history: "was invented in the year 1934, but we must go back as far as 1870 in order to get the full vibrant story behind this unique flavoured liqueur. The company's founder Wilhelm Mast moved to Wolfenbüttel, near Brunswick, Germany, in the early 1870s in search of creating a successful business.",
  is_checked: false,
)


drink = Drink.create(
  name: 'Irish Lemonade',
  history: 'Created by Jameson Whiskey',
  ingredients: '1 part Jameson (Original), 2 parts Lemonade, a splash of club soda, and bitters',
  prep_serv: 'In a mason jar add ice and stir ingredients. Top with lemon and fresh mint',
  
)

drink = Drink.create(
  name: 'Old Fashioned',
  history: 'Created in a fancy bar',
  ingredients: 'Bourbon, Sugar, Angostura bitters, Water, Orange peel',
  prep_serv: 'Mix well',
)

drink = Drink.create(
  name: 'Frozen Margarita',
  history: 'One of the earliest stories is of the margarita being invented in 1938 by Carlos "Danny" Herrera at his restaurant Rancho La Gloria, halfway between Tijuana and Rosarito, Baja California, created for customer and former Ziegfeld dancer Marjorie King, who was allergic to many spirits, but not to tequila.',
  ingredients: 'Place 1 cup tequila, 1 cup lime juice, 1/2 cup triple sec, 2 tablespoons agave syrup, 6 cups of ice',
  prep_serv: '1.) Place all ingredients in a blender
    2.) Blend until slushy and pour into 4 glasses
    3.) Serve immediately',
)

drink = Drink.create(
  name: 'Blood & Sand',
  history: 'Invented in the 1920s in honor of the Rudolph Valentino film of the same name, the Blood & Sand has withstood the test of time for almost 100 years.',
  ingredients: 'Equal parts Scotch, sweet vermouth, Cherry Heering (the "blood"), and orange juice (the "sand")',
  prep_serv: 'Pour all ingredients into cocktail shaker filled with ice cubes. Shake well. Strain into Cocktail glass. Flame orange zest over the top of the glass.',
)

boozedrink = Boozedrink.create(
  booze_id: booze.id,
  drink_id: drink.id
)

puts "Data Seeded."
# drinks = ['white russian', 'vodka martini']
