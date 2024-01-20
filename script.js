let fName = document.querySelector(".fname");
let lName = document.querySelector(".lname");
let pCountry = document.querySelector(".country");
let pScore = document.querySelector(".number")
let btn = document.querySelector("button");
let del = document.querySelector(".delete");

let section2 = document.querySelector(".section2");

let data = [
    {
        firstName: 'Rohit',
        lastName: 'Sharma',
        country: 'India',
        playerScore: 82
    },
    {
        firstName: 'Virat',
        lastName: 'Kolhi',
        country: 'India',
        playerScore: 90
    },
    {
        firstName: 'Shubman',
        lastName: 'Gill',
        country: 'India',
        playerScore: 75
    }
];



document.onload = updateData();


// adding player 
btn.addEventListener("click", (e) => {

    // preventDefault for not submitting form cause if we click submit button the page will automatically reload and all data will lost
    e.preventDefault()

    if (fName.value == "" || lName.value == "" || pCountry.value == "" || pScore.value == "") {
        alert("Please fill all the sections");
    }

    else {
        let playerExist = false;
        data.forEach((item) => {
            if (item.firstName == fName.value && item.lastName == lName.value) {
                alert(`${fName.value} ${lName.value} player already exist.`);
                playerExist = true;
            }

        });

        if (!playerExist) {
            data.push({ firstName: fName.value, lastName: lName.value, country: pCountry.value, playerScore: pScore.value });

            updateData();

            fName.value = "";
            lName.value = "";
            pCountry.value = "";
            pScore.value = "";

        }
    }
})

document.addEventListener("click", (e) => {
    if (e.target.classList.contains('add')) {
        let eventFName = e.target.parentElement.parentElement.children[0];
        let eventLName = e.target.parentElement.parentElement.children[1];
        data.forEach((item) => {
            if (eventFName.innerHTML == `${item.firstName}` && eventLName.innerHTML == `${item.lastName}`) {
                let sc = Number(item.playerScore);
                sc += 5;
                item.playerScore = sc;

                updateData();
            }
        })
    }
    else if (e.target.classList.contains('sub')) {
        let eventFName = e.target.parentElement.parentElement.children[0];
        let eventLName = e.target.parentElement.parentElement.children[1];
        data.forEach((item) => {
            if (eventFName.innerHTML == `${item.firstName}` && eventLName.innerHTML == `${item.lastName}` && item.playerScore >= 5) {
                let sc = Number(item.playerScore);
                sc -= 5;
                item.playerScore = sc;

                updateData();
            }
        })
    }
})

function updateData() {
    section2.innerHTML = '';
    data.sort((p1, p2) => p2.playerScore - p1.playerScore);
    data.forEach((item) => {
        let div = document.createElement("div");
        div.classList.add("playerDiv");

        let playerFName = document.createElement("span")
        let playerLName = document.createElement("span")
        let playerCountry = document.createElement("span")
        let score = document.createElement("span")

        let lastSpan = document.createElement("div")

        playerFName.innerHTML = `${item.firstName}`;
        playerLName.innerHTML = `${item.lastName}`;
        playerCountry.innerHTML = item.country;
        score.innerHTML = item.playerScore;
        lastSpan.innerHTML = `<i class="fa-solid fa-trash-can delete"></i><span class="add">+5</span><span class="sub">-5</span>`;
        lastSpan.classList.add("lastspan");

        div.append(playerFName, playerLName, playerCountry, score, lastSpan);
        section2.append(div);
    })
}


document.addEventListener("click", (e) => {
    if (e.target.classList.contains('delete')) {
        let personFname = e.target.parentElement.parentElement.children[0].innerText;
        console.log(personFname);
        let personLname = e.target.parentElement.parentElement.children[1].innerText;

        let index = data.findIndex((person) => person.firstName.toUpperCase() == personFname)

        console.log(index);

        if (index !== -1) {
            data.splice(index, 1);
            updateData();
        }
    }
})