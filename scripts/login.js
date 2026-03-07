document.getElementById("login-btn").addEventListener("click", function(){
    let userName = document.getElementById("username");
    let password = document.getElementById("pass");

    userName = userName.value;
    password = password.value;
    
    if(userName=="admin" && password=="admin123"){
        alert("Signin successful");
        window.location.assign("issue-track.html");
    }
    else{
        alert("Invalid username and password");
    }
})