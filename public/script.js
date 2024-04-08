
function onSignIn(googleUser) {
   // console.log("got here!1");
    var id_token = googleUser.credential;
    //console.log(id_token)
      // Send the ID token to server-side script called index.js for verification and
      // to create a session.

    fetch('/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Referrer-Policy': 'no-referrer-when-downgrade'},
        body: JSON.stringify({ id_token:id_token})
        })
        .then(response => {
        if(!response.ok) {
            throw new Error(response.statusText);
        }
    return response.json();
    })
    .then(data => {
    //console.log("success", data);
    const allInfo = data.allInfo;
    
    // check if email ends in stuy.edu
    if (allInfo.email.endsWith("stuy.edu") || allInfo.email===("zkarim7676@gmail.com")) {
        window.username = allInfo.name;
        window.email = allInfo.email;
        document.getElementById("googleButton").className = "googleHide";
        document.getElementById("signInSuccess").className = "signInShow"
        document.getElementById("signInSuccess").innerHTML = "Successfully signed in as " + window.username;
        document.getElementById("signin_text").className = "hide_signin";

        // display the user's target
        fetch('/target', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Referrer-Policy': 'no-referrer-when-downgrade'},
            body: JSON.stringify({ email:window.email})
            })
            .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
        return response.json();
        })
        .then(data => {
        console.log("success", data);
        const targets = data.targets;
        const target = targets.target;
        
        document.getElementById("target").innerHTML = "Your initial target is " + target;
        })



    }
    else {
        alert("You are not a Stuyvesant student. Please use a Stuyvesant email address.");
    }

    })
    .catch(error => {
    console.log("error", error);
    // Handle the error, for example, by displaying an error message to the user.
    });
}