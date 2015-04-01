/**
 * Constructs a new generator that will yield a plan for each day
 * @param Array title_list
 * @param Array num_days
 * @param Integer repeats
 * @constructor
 */
function PlanGenerator(title_list, num_days, repeats){
	
	//Other vars
	this.repeats = repeats || 1
	this.num_days = num_days || 0
	this.title_list = title_list
	
	//Convert title list to an array if it is not already one
	if(!Array.isArray(this.title_list)){
		var tmp_list = []
		for (var k in this.title_list){
			tmp_list.push([k, this.title_list[k]])
		}
		this.title_list = tmp_list
	}
	

	//An iterator that yields the reading plan per day
	this[Symbol.iterator] = function* (){
	
		//Manage the number of repeats
		var repeats = this.repeats
		var titles = this.title_list.slice()
		while (--repeats > 0){
			titles = titles.concat(this.title_list)
		}
			
		//Determine the total number of chapters (or pages)
		var chapters = 0; titles.forEach(function(v){chapters += v[1]})
		var per_day = chapters / this.num_days
		
		//Track progress
		var progress = 0;
		var book_progress = 0;
		
		//Iterate over days
		for(var d = 0; d < this.num_days; d++) {
			
			var chapters_today = Math.floor(progress + per_day) - Math.floor(progress)
			
			//Fix rounding issue on last day
			if(d + 1 == this.num_days){
				chapters_today = chapters - Math.floor(progress)
			}
			//console.log("Day " + (d + 1) + ": " + chapters_today)
			
			var day = []
			while(chapters_today){
				
				//Did we finish the book?
				if(titles[0][1] <= book_progress + chapters_today){
					
					//Figure out how many chapters to the end of the book
					var diff = titles[0][1] - book_progress
					
					//Add the reading
					day.push([titles[0][0], book_progress + 1, diff - 1])
					
					//Remove the book from the list
					titles.shift()
					book_progress = 0
					
					//Decrease chapters today
					chapters_today -= diff
					
				}else{
					
					//Add the reading
					day.push([titles[0][0], book_progress + 1, chapters_today - 1])
					
					book_progress += chapters_today
					chapters_today = 0
					
				}
				
			}
			
			//Keep track of where we were last at
			progress += per_day
			
			//Output the day
			yield day
			
		}
		
	}
		
}

/**
 * Formats a full day's readings
 * @param Array contents
 * @param Integer day
 * @returns String
 */
function formatDay(contents, day){
	var readings = []
	for(var i = 0; i < contents.length; i++){
		var parts = contents[i]
		if(parts[2]){
			readings.push(parts[0] + " " + parts[1] + " - " + (parts[1] + parts[2]))
		}else{
			readings.push(parts[0] + " " + parts[1])
		}
	}
	return day ? "Day " + day + ": " + readings.join(", ") : readings.join(", ")
}

//Export the module
module.exports = {
	PlanGenerator: PlanGenerator,
	formatDay: formatDay
}