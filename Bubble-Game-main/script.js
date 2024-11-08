// Event bubbling :: jis element pr click kren gy uspr event raise huga agr wahan event listener na mila tu phr event element  k parent pr listener dhundy ga and so on
let timer = 60;
let score = 0;
let hitrn = 0;

function increasescore() {
    score += 10;
    document.querySelector("#scoreval").textContent = score;
}

function bubble() {
    let clutter = "";
    for (let i = 1; i <= 133; i++) {
        let no = Math.floor(Math.random() * 10)
        console.log(no);
        clutter += `<div class="bubble">${no}</div>`
    }
    document.querySelector(".pbtm").innerHTML = clutter;
}

function runtimer() {

    let timeint = setInterval(() => {
        if (timer > 0) {
            timer--;
            document.querySelector("#timer").textContent = timer;
        } else {
            document.querySelector(".pbtm").innerHTML = (`<h1>Game Over </h1>`)
            clearInterval(timeint);
        }

    }, 1000);

}

function hitno() {
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector("#hitval").textContent = hitrn;
}

document.querySelector(".pbtm")
    .addEventListener("click", function (details) {
        let clickednum = Number(details.target.textContent);
        if (clickednum === hitrn) {
            increasescore()
            bubble()
            hitno()
        }
    });

bubble()
runtimer()
hitno()


