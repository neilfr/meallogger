import axios from "axios";

export default {
  deleteConsumptionLogEntry: function(consumptionLogId) {
    console.log("inside client api for delete with:", consumptionLogId);
    return axios.delete("/api/consumptionlog/" + consumptionLogId);
  },
  addConsumptionLogEntry: function(logEntry) {
    console.log("in api, add logentry!:", JSON.stringify(logEntry));
    return axios.post("api/consumptionlog/", logEntry);
  },
  getConsumptionLogByUserId: function(userId) {
    console.log("inside get log");
    return axios.get("api/consumptionlog/" + userId);
  },
  getFoodNames: function() {
    console.log("inside getfoodnames");
    return axios.get("/api/foodnames");
  },
  getFoodNamesByFoodGroupId: function(foodGroupId) {
    console.log("getFoodNamesByFoodGroupId with foodGroupId:", foodGroupId);
    return axios.get("/api/foodnames/" + foodGroupId);
    // return axios.get("/api/foodNames/:foodGroupId");
  },
  getFoodGroups: function() {
    console.log("inside getfoodgroups");
    return axios.get("/api/foodgroups");
  },
  addFavouriteFood: function(favouriteFood) {
    console.log("in api, add favourite food!:", JSON.stringify(favouriteFood));
    return axios.post("api/favouritefoods/", favouriteFood);
  },
  unFavouriteFood: function(favouriteFood) {
    console.log("in api, add favourite food!:", JSON.stringify(favouriteFood));
    return axios.delete("api/favouritefoods/", { data: favouriteFood });
  }
};
