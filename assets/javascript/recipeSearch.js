//variables to store user choice
var areaFilter = '';
var categoryFilter = '';
//keeps track of whether a button was selected or not
var areaChosen = false;
var categoryChosen= false;

$(document.body).on("click", ".filter", function(){
    var clicked = $(this).attr("clicked")
    var group = $(this).offsetParent()
    if (group.attr("data-choice")=== "true"){
       $(this).attr("data-selected", "true")
        
    }
    if (group.attr("data-choice") === "false"){
        $(this).attr("data-selected", "false")
        if (clicked === "off"){
            $(this).attr("clicked", "on");
            $(group).attr("data-choice", "true")
            // ADD THE X
            // Create a Div to hold the x
            var xdiv = $("<img class='ml-2 selectedButton' src=assets/images/x.png>")
            // append xdiv to html
            $(this).append(xdiv)
    
            //CHANGE THE BUTTON'S COLOR
            //Remove current color
            $(this).removeClass("secondarycolor buttoncolor pr-3")
            //Add new color
            $(this).addClass("clickedcolors")
    
            //add to dr

            if ($(this).hasClass("arrecpiebttn")){
                areaChosen = true;
                areaFilter = $(this).attr("value")

            }
            else{
                categoryChosen = true;
                categoryFilter = $(this).attr("value")
            }

        }
        
    }
    else{
        
            //CHANGE CLIKED FROM ON TO OFF
            $(this).attr("clicked", "off");
            if ($(this).attr("data-selected"==="true")){
                
            
            //REMOVE THE X
           $(".selectedButton").remove()
           // $(".xctbutton").remove()

            //CHANGE COLORS BACK
            //remove current colors
            $(this).removeClass("clickedcolors")
            //add original colors
            $(this).addClass("secondarycolor buttoncolor pr-3")

            //make choice false
            $(group).attr("data-choice", "false")

            areaFilter = '';
            categoryFilter = '';
            }
             
}
    
})

function getResponse(queryURL){
    $.ajax({
        url: queryURL
        ,
        method: "GET"
      }).then(function(response) {
          console.log(response)
    //iterates through response and checks for filters
        console.log(queryURL)
        console.log(response.meals[0].strArea)
      });
}


$("#submitbttn").on("click",function(){
    var userInput = $(".userInput").val();
    var queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + userInput
    console.log(userInput)
    getResponse(queryURL)
    $(".userInput").val("")
})