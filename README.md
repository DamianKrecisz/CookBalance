# CookBalance!

The application begining developed by Damian Kręcisz - [Check my Linkedin if you want contact with me](https://www.linkedin.com/in/damiankrecisz/) :smiley:

[Check demo app hosted on Firebase](https://cookbalance-41649.web.app/)


## Short description
Application with cooking recipes where you Can create menus and preparing a shopping list


## Technology stack 

**Frontend:** Angular

**UI component:** NG-ZORRO

**Backend:** Firebase

## Firebase description

- The entire database and website hosting use firebase services.
- All users can login and register with email/password and Google Account. Login with facebook is temporary turned off.

## Design assumption

The application is produced to improve skills in the Angular framework and Firebase.

 I focused mainly on <ins>functionality</ins> to be able to give the first utility version. In the future, I want to expand the application with new modules, including:
 - Calories and micronutrient counter
 - Users can share own recipes to other users
 - Opinions and ranking of recipes

## Short user pages description

### Login/register page

 - The user can register and login via tradicional method - email/password and Google+ account
 - Login with facebook is temporarily disabled
 
### User profile page
 - Users can enter information about themselves, i.e. gender, weight, age, date of birth and physical activity
 - Temporarily, the data will calculate calories to maintain the entered weight and BMI
 - In the future, it will be possible to make nutritional plans according to these data
 - The user can also change his password and delete the account 

### Recipes page

 - Here you can browse through all the recipes available in the database

### Favorite recipes page

 - After adding a recipe to favorites, the user can review it here

### Saved menu

 - Users can create a new menu and view other saved menus

### Shopping list

 - In the menu view, the user can save all ingredients used in all recipes in the menu
 - If a ingredient occurs more than once, it is added together
 - In the list, after selecting the checkbox next to an ingredient, it is moved to end of the list so that all missing ingredients are always displayed at the top of the list


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
 - After entering a ingredient in the adding field, the table automatically searches whether the ingredient is not currently avaliable in the database

### Edit recipe

 - In this view, the admin can edit all data of the recipe saved in the database

## Some screenshots



