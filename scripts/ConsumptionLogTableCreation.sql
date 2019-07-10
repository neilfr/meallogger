create table consumptionlog (
	ConsumptionLogID int PRIMARY KEY not null auto_increment,
    UserID int,
    FoodID int ,
    Quantity int,
    LogDate datetime,
    FOREIGN KEY (FoodID) references foodname(FoodID)
);
