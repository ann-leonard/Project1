$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyAxtAWMHjPjjEdZ1gVoGVeSF8i-mdEN9IE",
        authDomain: "project-one-74297.firebaseapp.com",
        databaseURL: "https://project-one-74297.firebaseio.com",
        projectId: "project-one-74297",
        storageBucket: "project-one-74297.appspot.com",
        messagingSenderId: "1057793714147"
    };
    firebase.initializeApp(config);

    var auth = firebase.auth();
    var db = firebase.firestore();

    $("#closeBtn").on("click", (e) => {
        $(".modal").hide();
    })

    //hides & shows log in & log buttons depending on if user is logged in or out


    //setup guides from firebase, pulling information
    var setupGuides = (data) => {

        if (data.length) {
            data.forEach(doc => {
                const favorites = $("<div>").text(doc.data().name);
                console.log(favorites);
                $("#please").append(favorites);
            });
        } else {
            $("#connect").empty();
            $("#connect").append("login to review guides")
        }
    }

    //click on username when logged in, go to account page
    $("#accountBtn").on("click", (e) => {
        window.open("html/userAccount.html");
    });

    $("#logo").on("click", (e) => {
        window.open("index.html");
    })



    $("DOMContentLoaded", function () {
        console.log("hi")
        var modals = $(".modal");
        //initialize the modals
        M.Modal.init(modals);

        const setupUI = (user) => {
            if (user) {
                db.collection("users").doc(user.uid).get().then(doc => {
                    $("#accountBtn").append(user.email);
                })
    
                $(".logged-in").show();
                $(".logged-out").hide();
            } else {
                $(".logged-in").hide();
                $(".logged-out").show();
            }
        }

        //checking to see if the user is logged in or not then displaying guides if they are
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection("favorites").onSnapshot(snapshot => {
                    setupGuides(snapshot.docs)
                    setupUI(user);
                })
            } else {
                setupUI()
                setupGuides([]);
            }
        });

        //creating a user
        $("#signup-button").on("click", (e) => {
            function registrationPage() {
                window.open("html/Registration.html")
            }

            registrationPage();
        }); 

        $("#submitBtn").on("click", (e) => {
            e.preventDefault();

            var email = $("#signup-email").val()
            var password = $("#signup-password").val();

            console.log(email);
            console.log(password);

            auth.createUserWithEmailAndPassword(email, password).then(cred => {
                return db.collection("users").doc(cred.user.uid).set({
                    name: $("#name").val(), 
                    age: $("#age").val()
                });
            });

            function userAccount() {
                open("html/userAccount.html")
            }

            userAccount();
        });
            
        

        // logout
        $("#logout-button").on("click", (e) => {
            e.preventDefault();
            firebase.auth().signOut().then(() => {
                console.log("user signed out");
            });
        });

        // login
        $("#button-login").on("click", (e) => {
            e.preventDefault();

            //get user info
            var email = $("#login-email").val();
            var password = $("#login-password").val();

            auth.signInWithEmailAndPassword(email, password).then(cred => {
                console.log(cred.user);

                //close the login modal and reset the form
                var modal = $("#modal-login");
                M.Modal.getInstance(modal).close();
                // loginForm.reset();
                
                function myFunction() {
                    window.open("html/userAccount.html");
                }

                myFunction()
            });
        });

    function getUrlParameter(name) {
   name = name.replace(/[\[]/, ‘\\[‘).replace(/[\]]/, ‘\\]‘);
   var regex = new RegExp(‘[\\?&]’ + name + ‘=([^&#]*)‘);
   var results = regex.exec(location.search);
   return results === null ? ‘’ : decodeURIComponent(results[1].replace(/\+/g, ' ’));
};
$(document).ready(function(){
   var queryURL = “https://www.themealdb.com/api/json/v1/1/lookup.php?i=” + getUrlParameter(“Id”)
   getResponse(queryURL)
})
function getResponse(queryURL){
   $.ajax({
       url: queryURL
       ,
       method: “GET”
     }).then(function(response) {
       console.log(queryURL)
       console.log(response)
       var meal = response.meals[0]
       var recipeImg = response.strMealThumb
       var recipeName = response.meals[0].strMeal
       console.log(response.meals[0].strMeal)
       $(“#recipeName”).append(recipeName)
       var ingredientbox = $(“<button class=‘buttoncolor secondarycolor roundedcorners px-3 py-1 border-0 m-1’>” +  + “</button>“)
       console.log(“ingredientbox: ” + ingredientbox)
       var recipebox = $(“<div  class=‘mt-2 mb-4 buttoncolor roundedcorners px-3 py-2 tittlefont text-muted’>“)
       recipebox.append(`<div>${meal.strInstructions.split(",")}`)
       console.log(recipebox)
       console.log(recipebox.html())
       var Instructions = meal.strInstructions
       console.log(Instructions.split(“.”))
       var InstructionsArray = Instructions.split(“.”)
       console.log(InstructionsArray)

       var ingredients = []
       var measure = []
       for (i=1;i<20;i++){
           if (meal[“strIngredient” + i]){
               ingredients.push(meal[“strIngredient” + i])
           }
       }
       for (i=1;i<15;i++){
           if (meal[“strMeasure” + i]){
               measure.push(meal[“strMeasure” + i])
           }
       }
        for (i=0;i<ingredients.length;i++){
           $(“#ingredientsList”).append(`<button id="ing" class=" buttonfont secondarycolor buttoncolor border-0 roundedcorners px-3 mt-2 mx-2 ">${measure[i]}<label class="text-muted mb-0 ml-2">${ingredients[i]}</label></button>`)
       }
       // $(“#ing”).addClass(“font-weight-bold”)
       $(“#recipeList”).append(recipebox)
       $(“#recipeImage”).attr(“src”,meal.strMealThumb)
       $(“.finishedBtn”).on(“click”,function(){
       $(“#finishedLink”).attr(“href”,`../html/Congratulations.html?name=${meal.strMeal}`)
       })
   })

}
                // var recipeImage = $("#recipeImage");
                var rName = recipeName;
                console.log(rName);
            
                var docData = {
                    name: rName
                };
            
                $("#saveBtn").on("click", (e) => {
                    console.log("thanks for clicking");
                    db.collection("favorites").add(docData).then(function(){
                       console.log("document written");
                    $("#saveBtn").hide();
                    });
            
                })
    })


    
}

        


    });

    var recName = newname;
    var ingArray = ingridientsArray;
    var steps = stepsListArray;


    var recipe = {
        name: recName,
        ings: ingArray,
        directions: steps
    };

    $("#save").on("click", (e) => {
        console.log("document new recipe")
        db.collection("recipes").add(recipe).then(function(){
           
        });
    })


    

});
