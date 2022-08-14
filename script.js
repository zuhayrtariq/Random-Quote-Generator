let quoteText = document.querySelector('#quote');
let container = document.querySelector('.container');
let authorText = document.querySelector('#author');
let newQuote = document.querySelector('#new-quote');
let loader = document.querySelector('#loader');

let apiQuotes = [];
let quote;

function loading() {
    loader.hidden = false;
    container.hidden = true
}

function loaded() {
    loader.hidden = true;
    container.hidden = false
}
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const res = await fetch(apiUrl);
        apiQuotes = await res.json();
        loaded();
        getQuote();

    } catch (error) {
        console.log("There is an Error!", error);
    }
}

getQuotes();

$('#new-quote').click(function() {
    getQuote();
});

$('#tweet-button').click(function() {

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`;
    window.open(twitterUrl, '_blank');
})

function getQuote() {
    loading();
    quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.innerHTML = quote.text;
    if (!quote.author) {
        quote.author = "Unknown";
    }
    authorText.innerHTML = quote.author;
    loaded();
}