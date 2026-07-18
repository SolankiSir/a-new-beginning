import { collection, addDoc, getDocs }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Wait until Firebase database is ready

let wishCollection;


function startFirebase(){

    if(!window.db){

        setTimeout(startFirebase,100);

        return;

    }


    wishCollection = collection(window.db,"wishes");

    loadWishes();

}


startFirebase();




// Add Wish

window.addWish = async function(){

    const button = document.querySelector(".wish-submit");


    const name = document.getElementById("guestName").value.trim();

    const message = document.getElementById("guestWish").value.trim();


    if(name === "" || message === ""){

        alert("Please fill all details");

        return;

    }


    // Disable button

    button.disabled = true;

    button.innerHTML = "Sending... ❤️";



    await addDoc(wishCollection,{

        name:name,

        message:message,

        time:new Date()

    });



    alert("Your wish added ❤️");


    document.getElementById("guestName").value="";

    document.getElementById("guestWish").value="";


    button.disabled = false;

    button.innerHTML = "Send Wishes ❤️";


    loadWishes();

};




// Display Wishes

async function loadWishes(){


    const wishList=document.getElementById("wishList");


    if(!wishList || !wishCollection){

        return;

    }



    wishList.innerHTML="";



    const snapshot=await getDocs(wishCollection);



    snapshot.forEach((doc)=>{


        const data=doc.data();



        wishList.innerHTML += `

        <div class="col-md-4">

            <div class="wish-item">

                <h3>❤️</h3>

                <p>${data.message}</p>

                <h5>- ${data.name}</h5>

            </div>

        </div>

        `;


    });


}