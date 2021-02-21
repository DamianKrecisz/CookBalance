# CookBalance

Application created by Damian Kręcisz - [If you want to contact me, check my Linkedin](https://www.linkedin.com/in/damiankrecisz/) :smiley:

[Check demo app hosted on Firebase](https://cookbalance-41649.web.app/)


## Short description
Application with cooking recipes where you can create menus and shopping lists.


## Technology stack 

**Frontend:** Angular

**UI component:** NG-ZORRO

**Backend:** Firebase

## Attention

- I focused mainly on <ins>functionality</ins> to be able to give the first utility version.
- All recipes are in Polish because I use the Polish source of the recipes database.
- The application is under constant development. If you notice any error, please contact me and provide a description of the error to the email address: damiankrecisz3@gmail.com
 
## Firebase description

- The entire database and website hosting use firebase services.
- All users can login and register by providing email and password or using Google Account. Login via facebook is currently unavailable.

## Design assumption

The application is produced to improve skills in the Angular framework and Firebase.

 In the future, I want to expand the application with new modules, including:
 - calories and micronutrient counter,
 - sharing your own recipes with others,
 - opinions and ranking of recipes.

## Short user pages description

### Login/register page

 - The user can register and login via tradicional method - email and password or Google+ account.
 - Login via facebook is currently unavailable.
 
### User profile page
 - Users can enter information about themselves, i.e. gender, weight, age, date of birth and physical activity.
 - Based on collected data, application will calculate calories to maintain the entered weight and BMI.
 - In the future, it will be possible to make nutritional plans according to these data.
 - The user can also change his password and delete the account .

### Recipes page

 - Here you can browse through all the recipes available in the database.

### Favorite recipes page

 - After adding a recipe to favorites, the user can review it here.

### Saved menu

 - Users can create a new menu and view other saved menus.

### Shopping list

 - In the menu view, the user can save all ingredients used in all recipes in the menu.
 - If an ingredient occurs more than once, the application sums them up.
 - In the list, after selecting the checkbox next to the ingredient, it is moved to end of the list so all missing ingredients are always displayed at the top of the list.


## Short admin pages description

> I turned off the mobile view in admin's tabs - administrators should make all changes on the dekstop version.

### Dashboard

This view shows the following:

 - Active users
 - Recipes in database
 - Total saved ingredients
 - Total saved menus
 - Total saved shopping lists
 
### Add recipe

 - Here the admin can add a new recipe to the database.

### Ingredients

 - In this view, the administrator can add a new ingredient with the unit.
 - After entering a ingredient in the add field, the table automatically searches if the ingredient is currently avaliable in the database.

### Edit recipe

 - In this view, the admin can edit all data of the recipe saved in the database.

## Some screenshots

![scr1](https://i.ibb.co/fp4cFm2/scr1.png)
![scr1](https://i.ibb.co/mHyW43B/scr2.png)
![scr1](https://i.ibb.co/tZbh37J/scr3.png)
![scr1](https://i.ibb.co/XF27QfC/scr4.png)

Admin components: 

![scr1](https://i.ibb.co/DRcF6WL/scr5.png)
![scr1](https://i.ibb.co/7nkJ1Yk/scr6.png)


