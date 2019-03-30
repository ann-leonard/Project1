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
                const guide = doc.data();
                console.log(guide);
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
                db.collection("users").onSnapshot(snapshot => {
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

        $("#saveBtn").on("click", (e) => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    cred => { 
                        return db.collection("users").doc(cred.user.uid).set({
                            selectedrecipeimg: selectedrecipeimg,
                            selectedrecipename: selectedrecipename.val()
                        });
                    };
                } else {
                    console.log("please log in")
                }
            });

        })


    });

});