function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
$(document).ready(function(){
    var queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + getUrlParameter("Ingredient") 
    getResponse(queryURL)
})
function getResponse(queryURL){
    $.ajax({
        url: queryURL
        ,
        method: "GET"
      }).then(function(response) {
          console.log(response)
        console.log(queryURL)

        for (i=0;i<response.meals.length;i++){
            let id = response.meals[i].idMeal
            let id_url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+ id
            getDetails(id_url)
        }
      });
}

function getDetails(id_url){
    $.ajax({
        url: id_url,
        method: "GET"
    }).then(function(response){
        if (getUrlParameter("Area") === response.meals[0].strArea || getUrlParameter("Category") === response.meals[0].strCategory){
            console.log(response)
        }
         
    });
}

    var moreoptions = true
    var recipename = "Spaghetti and Meatballs"
    var recipeimg = "src=../assets/Images/Spghetti&Meatballs.jpg"
    var recipedes = "Spaghetti with meatballs is an Italian-American dish consisting of spaghetti, tomato sauce and meatballs"
    function renderoptions(){
        if (moreoptions === true){
            for(var i = 0; i< 6; i++){
                //CREATE RECIPE DIVS AND PUSH TO HTML IN ORDER
                //Create the outer div
                var box = $("<div class='roundedcorners box m-3 p-2 bg-light mx-auto'>")
                console.log(box)
                //Create and append the title div
                var title =$("<div class='secondarycolor buttonfont mt-1 muli'>" + recipename + "</div>")
                box.append(title)
                //Append the image to the box
                box.append("<img class='resultimg mt-1'" + recipeimg + ">");
                //Create and append the description
                var description =$("<div class='secondarycolor recipedescription mt-1 muli'>" + recipedes + "</div>")
                box.append(description)
                //Append the Save and Cook Buttons
                box.append("<div class='my-1 d-flex justify-content-around'><button class='border-0 bg-light secondarycolor muli buttonfont roundedcorners'>SAVE</button> <a href='recipe.html'><button class='border-0 bg-light secondarycolor muli buttonfont blueline roundedcorners'>COOK</button></a></div>")
                //Append box to HTML
                $("#searchresults").append(box)
                //Add the LoadMore Button
                $("#loadmorebttn").html("Load More")
                moreoptions = false
            }
        }
        else{
            //Create a box with the no more options available
            var box = $("<div class='roundedcorners secondarycolor titilefont mt-3 mb-0 p-2 bg-light mx-auto'> We apologize there are no more options available </div>")
            // Append box
            $("#searchresults").append(box)
            // Load More becomes Edit Search
            $("#loadmorebttn").html("Edit Search")
        }    
    }
    $("#loadmorebttn").on("click", function () {
        renderoptions()
    })
    renderoptions()