var firstResponse

 
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
$(document).ready(function(){
    var queryURL =  "https://www.themealdb.com/api/json/v1/1/filter.php?i="+ getUrlParameter("Ingredient") 
    getResponse(queryURL)
})
function getResponse(queryURL){
    $.ajax({
        url: queryURL
        ,
        method: "GET"
      }).then(function(response) {
        console.log(queryURL)
        firstResponse = response.meals.length
        for (i=0;i<firstResponse;i++){
            let id = response.meals[i].idMeal
            let id_url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+ id
            getDetails(id_url)
        }
      }).catch(function(){
          $("#searchresults").append($("<div class='roundedcorners box m-3 p-2 bg-light text-center mx-auto'>"))
          $(".box").text('Sorry, we did not find anything for that search request. Please try a different ingredient.')
          $(".box").append('<a href="../html/recipesearch.html"><button class="goBack secondarycolor btn btn-lg text-center mt-2 p-1 mx-auto titlefont bg-light">Go back</button>')
          
        })
}

function getDetails(id_url){
    $.ajax({
        url: id_url,
        method: "GET"
    }).then(function(response){
        var  secondResponse = response.meals[0]
        var moreOptions = true
        var recipeName = secondResponse.strMeal
       // console.log(secondResponse.strMealThumb)
        var recipeImg = secondResponse.strMealThumb
        var recipeDes = []
        var title
       
        function renderOptions(){
            if (moreOptions === true){
           //     for(var i = 0; i< firstResponse; i++){
              //      console.log(recipeName)
                    //CREATE RECIPE DIVS AND PUSH TO HTML IN ORDER
                    //Create the outer div
                    var box = $("<div class='roundedcorners box m-3 p-2 bg-light mx-auto'>")
                    //console.log(box)
                    //Create and append the title div
                    title =$("<div id='item' class='secondarycolor buttonfont mt-1 muli'>" + recipeName + "</div>")
                    box.append(title)
                    //Append the image to the box
                    //box.append("<img class='resultimg mt-1'>");
                    var img = $("<img class='resulting mt-1'>")
                    $(img).attr("src", recipeImg)
                    box.append(img)
                    //Create and append the description
                    recipeDes.push(secondResponse.str)
                    var description =$("<div class='secondarycolor recipedescription mt-1 muli'>" + recipeDes + "</div>")
                    box.append(description)
                    //Append the Save and Cook Buttons
                    var buttonsDiv = $("<div class='my-1 d-flex justify-content-around'></div>")

                    buttonsDiv.append("<button class='border-0 bg-light secondarycolor muli buttonfont roundedcorners'>SAVE</button>") 

                    buttonsDiv.append(`<a id='cookBtn'  href='../html/recipe.html?Id=${secondResponse.idMeal}' <button class='border-0 bg-light secondarycolor muli buttonfont blueline roundedcorners'>COOK</button></a>`)
                    
                   // $("#cookBtn").attr("href", "../html/recipe.html?Id=" + secondResponse.idMeal)


                    box.append(buttonsDiv)
                    console.log(buttonsDiv)
                    //Append box to HTML
                    $("#searchresults").append(box)
                    //Add the LoadMore Button
                    $("#loadmorebttn").html("Load More")
                    moreOptions = false
            //    }
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

        if (getUrlParameter("Area") === response.meals[0].strArea || getUrlParameter("Category") === response.meals[0].strCategory){
        renderOptions() 
        console.log(response)
        }
        else{
            renderOptions()
        }
    });
}

