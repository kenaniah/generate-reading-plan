/*
 * Basic usage
 */

var reading_plan = require("./reading_plan.js")

//Total number of days
var days = process.argv[2] || 90

//List of books
var books = require("./book_list.js")

//Generate a reading plan
var list1 = new reading_plan.PlanGenerator(books, days)

//Output the reading plan
var i = 0;
for(var day of list1) console.log(reading_plan.formatDay(day, ++i));