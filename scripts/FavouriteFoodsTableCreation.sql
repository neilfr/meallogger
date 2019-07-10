use meallogger_db;
create table favouritefoods (
	UserID int,
    FoodID int,
    PRIMARY KEY (UserID,FoodID)
);

use meallogger_db;
select * from favouritefood;
