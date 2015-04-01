/**
 * Configure the default routes for the app
 */
var routes = {
	"#/": "main",
	"#/about": "about", 
}

/**
 * Initialize route handling
 */
$(window).on("hashchange popstate", function(event){
	
	//Hide all pages
	$(".js-page").hide();
		
	//Be sure to blur whatever was focused
	$(":focus").blur();
	
	//Render the page or redirect to the index route
	if(routes[location.hash]){
		
		//Show the selected page
		var $page = $("#" + routes[location.hash]);
		$page.show();
		
		//Populate the search form
		var params = $.deparam.querystring();
		var $form = $("#main");
		if(params['days']){
			
			$form.find("INPUT[name='days']").val(params['days']);
			
			//Resubmit if the form changed
			if($form.data('last-query') != $form.serialize()){
				//$form.submit();
			}
			
		}
		
		//Perform autofocusing
		$page.find("[autofocus]").focus();
		
	}else{
		
		//Redirect to the index route
		history.replaceState(null, null, "#/");
		$(window).trigger("hashchange");
		
	}
	
});

/**
 * Onload
 */
$(function(){
	
	//Ensure a valid route is rendered on load
	$(window).trigger("hashchange");
	
	//Override the reset button
	$("INPUT[type='reset']").click(function(){
		window.location.search = "";
	});
	
	//Blur any links that have the blur class when clicked
	$(".js-blur").on("click", function(){
		$(this).blur();
	});
	
});