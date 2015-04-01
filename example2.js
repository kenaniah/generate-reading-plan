/*
 * Generates a reading plan from 3 concurrent strategies
 */

var reading_plan = require("./reading_plan.js")

//Total number of days
var days = process.argv[2] || 90

//List of books
var books = require("./book_list.js")
delete books['Psalms'], books['Proverbs']

//Generate a reading plan
var main = new reading_plan.PlanGenerator(books, days)
var psalms = new reading_plan.PlanGenerator({'Psalms': 150}, days)
var proverbs = new reading_plan.PlanGenerator({'Proverbs': 31}, days, 3)

//Output the reading plan
var generators = [main, psalms, proverbs]
for (var i in generators) generators[i] = generators[i][Symbol.iterator]()

for (var day = 0; day < days; day++){
	var readings = []
	for (var i in generators){
		readings = readings.concat(generators[i].next().value)
	}
	console.log(reading_plan.formatDay(readings, day + 1))
}