 console.log('test')
 function getResponse(queryURL){
    $.ajax({
        url:queryURL
        ,
        method: "GET"
      }).then(function(response) {
        console.log(response)
        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
          }
        if (queryURL === "https://www.thecocktaildb.com/api/json/v1/1/filter.php?&a=Alcoholic"){
            var randNum = Math.floor(getRandomArbitrary(1,250))
        }
        else{
         randNum = Math.floor(getRandomArbitrary(1,50))
        }
        console.log(randNum)
        let selectedDrink = response.drinks[randNum]
        console.log(selectedDrink)
        $(".card-title").text(selectedDrink.strDrink)
        $(".card-text").text("Go to recipe?")
        $(".drinkBtn").remove()
        $(".soberDrinkBtn").remove()
        $(".card").append(`<a href='recipe.html?id=${selectedDrink.idDrink}' class='drinkRecipe secondarycolor roundedcorners border-0 buttoncolor btn btn-primary'>See full recipe`)
        $(".cardImg").attr("src", selectedDrink.strDrinkThumb)
       })
}

function getDetails(id_url){
    $.ajax({
        url: id_url,
        method: "GET"
    }).then(function(response){
    
        var drink = response.drinks[0]
        var drinkImg = drink.strDrinkThumb
        var recipeName = drink.strDrink
        $("#recipeName").append(recipeName)
        var ingredientbox = $("<button class='buttoncolor secondarycolor roundedcorners px-3 py-1 border-0 m-1'>" +  + "</button>")
        var recipebox = $("<div class='roundedcorners bg-light p-2 my-4'>")
        recipebox.text(drink.strInstructions.split(","))
        console.log(recipebox.html())
        var ingredients = []
        var measure = []
        for (i=1;i<15;i++){
            
            if (drink["strIngredient" + i]){
                ingredients.push(drink["strIngredient" + i])
            }
        }
        for (i=1;i<15;i++){
            if (drink["strMeasure" + i]){
                measure.push(drink["strMeasure" + i])
            }
        }
        console.log (ingredients)
        for (i=0;i<ingredients.length;i++){
            $("#ingredientsList").append(`<button id="ing" class="buttonfont secondarycolor buttoncolor border-0 roundedcorners px-3 mt-2 mx-2">${measure[i]}<label class="text-muted mb-0">${ingredients[i]}</label></button>`)
        }
 
        $("#recipeList").append(recipebox)
        $("#recipeImage").attr("src",drink.strDrinkThumb)
        $(".finishedBtn").on("click",function(){
        $("#finishedLink").attr("href",`../html/Congratulations2.html?name=${drink.strDrink}`)
        })
        console.log(response)
    })
    
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};



$(".drinkBtn").on("click",function(){
     queryURL= "https://www.thecocktaildb.com/api/json/v1/1/filter.php?&a=Alcoholic"
    getResponse(queryURL)

})
$(".soberDrinkBtn").on("click",function(){
     queryURL= "https://www.thecocktaildb.com/api/json/v1/1/filter.php?&a=Non_Alcoholic"
    getResponse(queryURL)
})

$(".cardImg").on("click", function(){
    $(".drinkRecipe").remove()
    getResponse(queryURL)
})

$(document).ready(function(){
    id_url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + getUrlParameter("id")
    getDetails(id_url)

})