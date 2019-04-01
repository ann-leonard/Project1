
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
        recipebox.append(`<p style="font-size:1.2em;" class="text-dark">${meal.strInstructions.split(",")}`)
        console.log(recipebox.html())
        //var Instructions = meal.strInstructions
        //console.log(Instructions.split("."))
        var ingredients = []
        var measure = []
        for (i=1;i<20;i++){
            if (meal["strIngredient" + i]){
                ingredients.push(meal["strIngredient" + i])
            }
        }
        for (i=1;i<15;i++){
            if (meal["strMeasure" + i]){
                measure.push(meal["strMeasure" + i])
            }
        }
         for (i=0;i<ingredients.length;i++){
            $("#ingredientsList").append(`<h5 id="ing">${measure[i]}<label class="text-muted m-3">${ingredients[i]}</label></h5><br>`)
        }
       $("#ing").addClass("font-weight-bold")
        $("#recipeList").append(recipebox)
        $("#recipeImage").attr("src",meal.strMealThumb)
        $(".finishedBtn").on("click",function(){
            $("#finishedLink").attr("href",`../html/Congratulations.html?name=${meal.strMeal}`)
        })
    })
    
}
/*    var selectedingredients = ["2 (30 ounce) jars spaghetti sauce", "2 lbs lean ground beef" , "2 eggs" , "3⁄4 cup dry breadcrumbs", "1⁄4 cup fresh parsley, chopped", "1 garlic clove, minced" , "1⁄2-1 teaspoon salt", "1⁄4 cup parmesan cheese" , "1 lb spaghetti, cooked al dente"]
        var selectedrecipe = ["Place sauce in a large saucepan and simmer over medium heat" , "In large bowl mix beef, eggs, crumbs, parsley, garlic, salt and Parmesan.", "Shape into 18 meatballs.", "Place meatballs in simmering sauce.", "When sauce returns to a simmer, cover and cook 30-35 minutes (or more!) till cooked through.", "Serve sauce and meatballs over warm spaghetti."]
        //Attach variable to the website
        $("#recipeimage").attr("src", selectedRecipeImg)   
        //Include the ingredients in the html
        for(var i=0; i < selectedingredients.length; i++){
            //create a var with <div>

        }
        for(var i=0; i< selectedrecipe.length; i++){
            var recipebox = $("<div  class='my-4'>")
            var topbox =$("<div>")
            var stepnumber = i+1
            topbox.append("<div class='step"+stepnumber+" leftfloat secondarycolor subtitlefont'> STEP " + stepnumber +"</div>")
            topbox.append("<div class='checkbttn' data-value='"+ stepnumber + "'><i class='far rightfloat fa-square secondarycolor'></i></div>")
            recipebox.append(topbox)
            recipebox.append("<br>")
            recipebox.append("<div class='step"+stepnumber+" secondarycolor lineheight my-1 textfont'>" + recipeName + "</div>")
            $("#recipelist").append(recipebox)
        }
    
    
      });
}
    
    
    
    
    
    //ADD THE RECIPE IMAGE TO THE TOP
    //Variable with the image src
   
    $(".checkbttn").on("click", function () {
        var number = parseInt(($(this).attr("data-value")))
        console.log (number)
        console.log (selectedrecipe.length)
        if (number === selectedrecipe.length){
        console.log("you did it")
        window.location.replace("Congratulations.html")
        }
        else{
        var graymachine = "step"+ ($(this).attr("data-value"))
        console.log(graymachine)
        $("."+graymachine).removeClass("secondarycolor")
        $("."+graymachine).addClass("fadedcolor")
        $(this).empty()
        $(this).html("<i class='far fa-check-square rightfloat fadedcolor'></i>")
        }
        */