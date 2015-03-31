//Total number of days
var days = process.argv[2] || 90

//List of books
var books = { 
  Genesis: 50,
  Exodus: 40,
  Leviticus: 27,
  Numbers: 36,
  Deuteronomy: 34,
  Joshua: 24,
  Judges: 21,
  Ruth: 4,
  '1 Samuel': 31,
  '2 Samuel': 24,
  '1 Kings': 22,
  '2 Kings': 25,
  '1 Chronicles': 29,
  '2 Chronicles': 36,
  Ezra: 10,
  Nehemiah: 13,
  Esther: 10,
  Job: 42,
//  Psalms: 150,
//  Proverbs: 31,
  Ecclesiastes: 12,
  'Song of Songs': 8,
  Isaiah: 66,
  Jeremiah: 52,
  Lamentations: 5,
  Ezekiel: 48,
  Daniel: 12,
  Hosea: 14,
  Joel: 3,
  Amos: 9,
  Obadiah: 1,
  Jonah: 4,
  Micah: 7,
  Nahum: 3,
  Habakkuk: 3,
  Zephaniah: 3,
  Haggai: 2,
  Zechariah: 14,
  Malachi: 4,
  Matthew: 28,
  Mark: 16,
  Luke: 24,
  John: 21,
  Acts: 28,
  Romans: 16,
  '1 Corinthians': 16,
  '2 Corinthians': 13,
  Galatians: 6,
  Ephesians: 6,
  Philippians: 4,
  Colossians: 4,
  '1 Thessalonians': 5,
  '2 Thessalonians': 3,
  '1 Timothy': 6,
  '2 Timothy': 4,
  Titus: 3,
  Philemon: 1,
  Hebrews: 13,
  James: 5,
  '1 Peter': 5,
  '2 Peter': 3,
  '1 John': 5,
  '2 John': 1,
  '3 John': 1,
  Jude: 1,
  Revelation: 22 
}

//Determine the total number of chapters
var book_list = []
var chapters = 0
for (k in books){ 
	book_list.push([k, books[k]])
	chapters += books[k];
}
var per_day = chapters / days;

console.log("Total chapters: " + chapters)
console.log("Per day: " + per_day)

//Track overall progress
var progress = 0;

//Track progress in an individual book
var book_progress = 0;
for (var d = 0; d < days; d++) {
	
	var chapters_today = Math.floor(progress + per_day) - Math.floor(progress);
	
	//Fix rounding issue on last day
	if(d + 1 == days) chapters_today = chapters - Math.floor(progress)
	
	//console.log("Day " + (d + 1) + ": " + chapters_today)
	
	var day = []
	while(chapters_today){
		
		//Did we finish the book?
		if(book_list[0][1] <= book_progress + chapters_today){
			
			//Figure out how many chapters to the end of the book
			var diff = book_list[0][1] - book_progress
			
			//Add the reading
			day.push([book_list[0][0], book_progress + 1, diff - 1])
			
			//Remove the book from the list
			book_list.shift()
			book_progress = 0
			
			//Decrease chapters today
			chapters_today -= diff
			
		}else{
			
			//Add the reading
			day.push([book_list[0][0], book_progress + 1, chapters_today - 1])
			
			book_progress += chapters_today
			chapters_today = 0
			
		}
		
	}
	
	//Output the reading list
	var readings = [];
	for(var i = 0; i < day.length; i++){
		var segment = day[i]
		if(segment[2]){
			readings.push(segment[0] + " " + segment[1] + " - " + (segment[1] + segment[2]))
		}else{
			readings.push(segment[0] + " " + segment[1])
		}
	}
	console.log("Day " + (d + 1) + ": " + readings.join(", "))
	//console.log(readings.join(", "))
	
	//Keep track of where we were last at
	progress += per_day
	
}
