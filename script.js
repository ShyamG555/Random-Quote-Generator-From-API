const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const getNewQuoteBtn = document.getElementById("new-quote-btn");
const copyToClipBoardBtn = document.getElementById("copy-btn");
const shareTwitterBtn = document.getElementById("twitter-btn");
const exportImageBtn = document.getElementById("export-btn");
const body = document.body


async function getRandomQuote(){      // function to get randon quote from API
   
    const apiUrl = 'https://api.freeapi.app/api/v1/public/quotes/quote/random'
    getRandomBg()
    try{
        const response = await fetch(apiUrl);     
        const apiData = await response.json()    // converting response to JSON
        
        if(response.ok){                          // validation if we have received the response or not
            const fetchQuote = apiData.data.content;
            const fetchAuthor = apiData.data.author;
            quoteText.innerText = fetchQuote
            quoteAuthor.innerHTML = `- ${fetchAuthor}`
        }
    }catch(error){
        console.error(`Failed to fetch data from API ${error.message}`)
        
    }
}

getNewQuoteBtn.addEventListener('click', getRandomQuote);  // New quote button getting new quote on click

async function copyQuoteAndAuthor() {
    try{
    const textToCopy = `${quoteText.textContent} ${quoteAuthor.textContent}`;
    await navigator.clipboard.writeText(textToCopy);
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = 'Text copied to clipboard!';    // showing popup message
    document.body.appendChild(popup)

    popup.classList.add('show')

    setTimeout(() => {
        popup.classList.remove('show');      // hiding popup after 2 seconds 
    }, 1000);

    }catch(error){
        console.error(`Failed to copy: ${error}`)
    }
}
copyToClipBoardBtn.addEventListener('click', copyQuoteAndAuthor)          // copy to clipboard button 


shareTwitterBtn.addEventListener('click', () => {                   // share on twitter button function
        const getStringForTweet = `${quoteText.textContent} ${quoteAuthor.textContent}`
        const twitterUrl = `https://twitter.com/intent/tweet?text=${getStringForTweet}`
        window.open(twitterUrl)
})

function getRandomBg (){
    const images = [
        './images/img1.jpg',
        './images/img2.jpg',
        './images/img3.jpg',
        './images/img4.jpg',
        './images/img5.jpg',
        './images/img6.jpg'
    ]
    const randomImage = images[Math.floor(Math.random() * images.length)];
    body.style.backgroundImage = `url('${randomImage}')`;

}

exportImageBtn.addEventListener('click', () => {
    html2canvas(document.querySelector('.quote-box-for-image')).then(canvas => {
      const link = document.createElement('a');
      link.download = 'quote.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  });

getRandomQuote()

