var filter
function getResponse(queryURL){
    $.ajax({
        url: queryURL
        ,
        method: "GET"
      }).then(function(response) {
    //iterates through response and checks for filters
        for ( i = 0; i < 6; i++ ){
            if (filter === response.meals[i].strArea){
                console.log(response.meals[i])
            }
        }
      });
}

$(".area").on("click", function(){
    filter = this.innerHTML
    $(this).removeClass("btn-secondary ")
    $(this).addClass("btn-primary")
})

$(document.body).on("click", ".submitBtn", function(){
    var allCategories = "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
    var allAreas = "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    var userInput = $(".userMealName").val().trim()
    var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + userInput
    if (!userInput){
      userInput = $(".userIngredient").val().trim()
      queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + userInput 
    }
    //getResponse(allCategories)
    //getResponse(allAreas)
    getResponse(queryURL)
    $(".userMealName").val("")
    $(".userIngredient").val("")

})
