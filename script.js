const wrapper = document.querySelector(".wrapper"),
    synonym = document.querySelector(".synonyms .list "),
    searchInput = wrapper.querySelector("input"),
    infoText = wrapper.querySelector(".info-text"),
    volumeIcon = wrapper.querySelector(".word i"),
    removeIcon = wrapper.querySelector(".search span")

let audio;

//data function 
function data(result, word) {
    if (result.title) {
        //message returned for not able to find the meaning
        infoText.innerHTML = `Cannot find the meaning of <span>"${word}"</span>. Please try to search for another word.`;
    } else {
        wrapper.classList.add("active");
        let definition = result[0].meanings[0].definitions[0];
        phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;
        //cresting Audio object and passing audio src
        audio = new Audio("https:" + result[0].phonetics[0].audio);


        //passing data to their respective element
        document.querySelector(".word p").innerHTML = result[0].word;
        document.querySelector(".word span").innerHTML = phonetics;
        document.querySelector(".meaning span").innerHTML = definition.definition;
        document.querySelector(".example span").innerHTML = definition.example;




        if (definition.synonyms[0] == undefined) {
            //if there is no synonym then hide the synonyms div
            synonym.innerHTML = "No Synonyms";
        } else {

            synonym.parentElement.style.display = "block";
            synonym.innerHTML = "";

            //getting 5 synonyms and passing them inside synonyms div
            for (let i = 0; i < 5; i++) {
                let tag = `<span onclick= search('${definition.synonyms[i]}')>${definition.synonyms[i]},</span>`;
                synonym.insertAdjacentHTML("beforeend", tag);

            }
        }

    }


}

//search when one clicks on a synonym
function search(word) {
    searchInput.value = word;
    fetchApi(word);

}

// fetch API function
function fetchApi(word) {

    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    // fetching api response and returning it with parsing into js obj and in another then 
    // method calling data function with passing api response and searched word as an argument
    fetch(url).then(res => res.json()).then(result => data(result, word));

}

searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter" && e.target.value)
        fetchApi(e.target.value);


});

volumeIcon.addEventListener("click", () => {
    audio.play();
});

removeIcon.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#6c6a6e";
    infoText.innerHTML = "Type a word to search and press enter to get its meaning, example and synonyms.";
})