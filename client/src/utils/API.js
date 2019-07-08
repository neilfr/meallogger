import axios from "axios";

export default {
  getConsumptionLogByUserId: function(userId) {
    console.log("inside get log");
    return axios.get("api/consumptionLog/" + userId);
  },
  getFoodNames: function() {
    console.log("inside getfoodNames");
    return axios.get("/api/foodNames");
  },
  getFoodNamesByFoodGroupId: function(foodGroupId) {
    console.log("getFoodNamesByFoodGroupId with foodGroupId:", foodGroupId);
    return axios.get("/api/foodNames/" + foodGroupId);
    // return axios.get("/api/foodNames/:foodGroupId");
  },
  getFoodGroups: function() {
    console.log("inside getfoodgroups");
    return axios.get("/api/foodgroups");
  },
  addFavouriteFood: function(favouriteFood) {
    console.log("in api, add favourite food!:", JSON.stringify(favouriteFood));
    return axios.post("api/favouriteFoods/", favouriteFood);
  },
  unFavouriteFood: function(favouriteFood) {
    console.log("in api, add favourite food!:", JSON.stringify(favouriteFood));
    return axios.delete("api/favouriteFoods/", { data: favouriteFood });
  },
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
