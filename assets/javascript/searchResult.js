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
