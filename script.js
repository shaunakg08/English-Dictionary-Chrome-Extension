const wrapper = document.querySelector(".wrapper"),
    synonym = document.querySelector(".synonyms .list "),
    searchInput = wrapper.querySelector("input"),
    infoText = wrapper.querySelector(".info-text");

//data function 
function data(result, word) {
    if (result.title) {
        //message returned for not able to find the meaning
        infoText.innerHTML = `Cannot find the meaning of <span>"${word}"</span>. Please try to search for another word.`;
    } else {
        console.log(result);
        wrapper.classList.add("active");
        let definition = result[0].meanings[0].definitions[0];
        phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;


        //passing data to their respective element
        document.querySelector(".word p").innerHTML = result[0].word;
        document.querySelector(".word span").innerHTML = phonetics;
        document.querySelector(".meaning span").innerHTML = definition.definition;
        document.querySelector(".example span").innerHTML = definition.example;
        synonym.innerHTML = "";


        if (definition.synonyms[0] == undefined) {
            //if there is no synonym then hide the synonyms div
            synonym.parentElement.style.display = "none";
        } else {

            synonym.parentElement.style.display = "block";
            synonym.innerHTML = "";

            //getting 5 synonyms and passing them inside synonyms div
            for (let i = 0; i < 5; i++) {
                let tag = `<span>${definition.synonyms[i]},</span>`;
                synonym.insertAdjacentHTML("beforeend", tag);

            }
        }

    }


}
// fetch API function
function fetchApi(word) {
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