# CookBalance!

The application was developed by Damian Kręcisz - [Check my Linkedin if you want contact with me](https://www.linkedin.com/in/damiankrecisz/) :smiley:

[Check demo app hosted on Firebase](https://cookbalance-41649.web.app/)


## Short description
Application with cooking recipes that allows you to create menus with a ready-made shopping list



## Technology stack 

**Frontend:** Angular
**UI component:** NG-ZORRO
**Backend:** Firebase

## Firebase description

- The entire database and website hosting use firebase services.
- All users can login and register with email/password and Google Account. Login with facebook is temporary turned off.

## Design assumption

The application was written in order to improve skills in the Angular and Firebase framework.

 I focused mainly on functionality to be able to give the first utility version. In the future, I want to expand the application with new modules, including:
 - Calorie and micronutrient counter
 - Self-sharing of own recipes by users
 - Opinions and ranking of recipes

## Short user pages description

### Login/register page

 - The user can register and log in via email and Google+ account
 - Login with facebook is temporarily disabled
 
### User profile page
 - Users can enter information about themselves here, i.e. gender, weight, age, date of birth and physical activity
 - Temporarily, the data will calculate calories to maintain the entered weight and BMI
 - In the future, it will be possible to make nutritional plans according to these data
 - The user can also change his password and delete the account here

### Recipes page

 - Here you can browse through all the recipes available in the database

### Favorite recipes page

 - After adding a recipe to favorites, the user can review it here

### Saved menu

 - Here, users can create a new menu and view other saved menus

### Shopping list

 - In the menu view, the user can save all the components in the menu.
 - If an ingredient in a given menu repeats, it is added up
 - In the list, after selecting the checkbox next to an ingredient, it is moved to the very end of the list so that all missing ingredients are always displayed at the top of the list


## Short admin pages description

> I turned off the mobile view in admin's tabs - administrators should make all changes on the dekstop version

### Dashboard

This view shows the following:

 - Active users
 - Recipes in database
 - Total saved ingredients
 - Total saved menus by users
 - Total shop lists saved by user
 
### Add recipe

 - Here the admin can add a new recipe to the database

### Ingredients

 - In this view, the administrator can add a new ingredient with the unit
 - After entering a component in the adding field, the table automatically searches whether the ingredient is not currently avaliable in the database

### Edit recipe

 - In this view, the admin can edit all data of the recipe saved in the database
