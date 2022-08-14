let quoteText = document.querySelector('#quote');
let container = document.querySelector('.container');
let authorText = document.querySelector('#author');
let newQuote = document.querySelector('#new-quote');
let loader = document.querySelector('#loader');

function loading() {
    loader.hidden = false;
    container.hidden = true
}

function loaded() {
    loader.hidden = true;
    container.hidden = false
}

async function getQuote() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        loading();
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);
        if (!data.quoteAuthor) {
            authorText.innerHTML = "Unknown";
        } else {
            authorText.innerHTML = data.quoteAuthor;
        }
        if (data.quoteText > 100) {
            quoteText.classList.add('long-qoute');
        } else {
            quoteText.classList.remove('long-qoute');
        }
        quoteText.innerHTML = data.quoteText;
        loaded();
    } catch (error) {
        alert("There is an Error!", error)
        console.log(error);
        getQuote();
    }
}

getQuote();
$('#new-quote').click(function() {
    getQuote();
});
$('#tweet-button').click(function() {

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`;
    window.open(twitterUrl, '_blank');
})