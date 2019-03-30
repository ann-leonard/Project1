function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
$(document).ready(function(){
    var queryURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + getUrlParameter("Id") 
    getResponse(queryURL)
})
function getResponse(queryURL){
    $.ajax({
        url: queryURL
        ,
        method: "GET" 
      }).then(function(response) {
        console.log(queryURL)
        console.log(response)
        var meal = response.meals[0]
        var recipeImg = response.strMealThumb
        var recipeName = response.meals[0].strMeal
        console.log(response.meals[0].strMeal)
        $("#recipeName").append(recipeName)
        var ingredientbox = $("<button class='buttoncolor secondarycolor roundedcorners px-3 py-1 border-0 m-1'>" +  + "</button>")
        var recipebox = $("<div  class='my-4'>")
        recipebox.text(meal.strInstructions.split(","))
        console.log(recipebox.html())
        //var Instructions = meal.strInstructions
        //console.log(Instructions.split("."))
        var ingredients = []

        for (i=1;i<20;i++){
            if (meal["strIngredient" + i]){
                ingredients.push(meal["strIngredient" + i])
            }
        }
        console.log (ingredients)
        for (i=0;i<ingredients.length;i++){
            $("#ingredientsList").append(ingredients[i]+"<br>")
        }
        $("#recipeList").append(recipebox)
        $("#recipeImage").attr("src",meal.strMealThumb)
        $("#finishedBtn").on("click",function(){
            $("#finishedLink").attr("href",`../html/Congratulations.html?name=${meal.strMeal}`)
        })
    })
    
}