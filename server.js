
const express = require('express');
// we'll use morgan to log the HTTP layer
const morgan = require('morgan');
// we'll use body-parser's json() method to 
// parse JSON data sent in requests to this app
const bodyParser = require('body-parser');

// we import the model
const {ShoppingList, Recipes} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

// manually add some data to the shopping list
ShoppingList.create('beans', 2);
ShoppingList.create('tomatoes', 3);
ShoppingList.create('peppers', 4);

// manually add some recipes to the recipe list
Recipes.create('Macaroni and Cheese', ['cheese', 'macaroni', 'salt']);
Recipes.create('Peanut Butter and Jelly Sandwich', ['peanut butter', 'jelly', 'bread']);
Recipes.create('chocolate milk', ['cocoa', 'milk', 'sugar']);

// get endpoint /shopping-list to get the shopping list
app.get('/shopping-list', (req, res) => {
	res.json(ShoppingList.get());
});

// get endpoint /recipes to get the recipe list
app.get('/recipes', (req, res) => {
	res.json(Recipes.get());
});

app.listen(process.env.PORT || 8080, () => {
	console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
