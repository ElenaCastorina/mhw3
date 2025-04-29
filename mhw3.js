function toggleText() {
    let extraText = document.querySelector("#extra-text");
    let button = document.querySelector("#toggle-button");

    
    if (extraText.classList.contains("hidden")) {
        extraText.classList.remove("hidden");
        button.textContent = "NASCONDI";
    } else {
        
        extraText.classList.add("hidden");
        button.textContent = "SCOPRI DI PIÙ";
    }
}

const ScopriDiPiuButton = document.querySelector("#toggle-button");
ScopriDiPiuButton.addEventListener("click", toggleText);





function cambiaImmagine(event) {
    
    const image = document.querySelector(".nuova-collezione img");

    
    image.src = "https://amabilejewels.it/media/revslider/Banner_orizzontale.jpg";
}

const button = document.querySelector(".button-newcollection a");
button.addEventListener("click", cambiaImmagine);



function chiamaNotifica() {
    mostraNotifica("Iscrizione effettuata con successo!");
}


function mostraNotifica(messaggio) {
    const notification = document.createElement("div");
    notification.textContent = messaggio;
    notification.classList.add("notifica");
    
    document.body.appendChild(notification);
    
    
    notification.addEventListener("click", rimuoviNotifica);

    function rimuoviNotifica() {
        notification.classList.remove("notifica");
    }
}

const newsletterButton = document.querySelector(".submit");
newsletterButton.addEventListener("click", chiamaNotifica);




function showNotification(productName, productPrice) {
    let notification = document.querySelector("#notification-addToCart");
    
    
    notification.textContent= "Aggiunto al carrello: " + productName + " - " + productPrice;

    notification.classList.remove("hidden"); 

    
    
    notification.addEventListener("click", hideNotification);

    function hideNotification() {
        notification.classList.add("hidden");
    }

   
}

    function setupCartButtons() { 
        let buttons = document.querySelectorAll(".shop-icon");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", handleAddToCartClick);  
        }
    }
    setupCartButtons();

    function handleAddToCartClick(event) {
        let product = event.currentTarget;

        let productName = product.dataset.name;
        let productPrice = product.dataset.price;

        showNotification(productName, productPrice);
    }

   





    let currency = 'EUR';
    let clickedElement = null;
    
    function onresponse(response) {
      return response.json();
    }
    
    function onjsonSingle(json) {
      let currentRate = json.rates.USD;
    
      if (clickedElement !== null) {
    
        if (currency === 'EUR') {
          
          let euroValue = clickedElement.dataset.euro;
          
          let usdValue = euroValue * currentRate;
        
          clickedElement.textContent = Math.round(usdValue) + ' USD';
        
          currency = 'USD';
        } else {
          clickedElement.textContent = clickedElement.dataset.euro + ' EUR';
          
          currency = 'EUR';
        }
    
      }
    }
    
    function fetchConversione(event) {
        clickedElement = event.currentTarget;
        let promise = fetch('https://open.er-api.com/v6/latest/EUR'); 
        promise = promise.then(onresponse);
        promise = promise.then(onjsonSingle);
    }
    
    
    function setupClickPrices() {
      let prices = document.querySelectorAll('.price');
      let i = 0;
      while (i < prices.length) {
        prices[i].addEventListener('click', fetchConversione);
        i = i + 1;
      }
    }
    setupClickPrices();
    






let token;

fetch("https://accounts.spotify.com/api/token",
  {
    method: "post",
    body: 'grant_type=client_credentials',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('secret' + ':' + 'secret')
    }
  }
).then(onTokenResponse).then(onTokenJson);

function onTokenResponse(response) {
  return response.json();
}

function onTokenJson(json) {
  console.log('Token ricevuto');
  
  token = json.access_token;
}



function searchMood(event) {
  
  const mood = event.target.dataset.mood;
  console.log('Cerco mood: ' + mood);
  
  fetch("https://api.spotify.com/v1/search?type=playlist&q=" + encodeURIComponent(mood),
    {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJsonPlaylist);
}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function onJsonPlaylist(json) {
  console.log('JSON ricevuto');
  console.log(json);
  
  const playlistView = document.querySelector('#playlist-view');
  playlistView.innerHTML = '';
  
  let playlists = json.playlists.items;
  
  let playlist_filtrate = [];
  for(let playlist of playlists){
    if(playlist !==null && playlist.name && playlist.id && playlist.external_urls){
      
      playlist_filtrate.push(playlist); 
    }
    
  }
  
  playlists = playlist_filtrate;

  if (!playlists || playlists.length === 0) {
    const message = document.createElement('p');
    message.textContent = "Nessuna playlist trovata per questo mood.";
    playlistView.appendChild(message);
    return;
  }
 
  let num_results = playlists.length;
  
  if (num_results > 5) num_results = 4;
  
  for (let i = 0; i < num_results; i++) {
    const playlist_data = playlists[i];
    const title = playlist_data.name;
    const selected_image = playlist_data.images[0].url;
    const external_url = playlist_data.external_urls.spotify;
    
    const playlist = document.createElement('div');
    playlist.classList.add('playlist');
    
    const img = document.createElement('img');
    img.src = selected_image;
    img.alt = title;
    
    const caption = document.createElement('span');
    caption.textContent = title;
    
    const link = document.createElement('a');
    link.href = external_url;
    link.target = '_blank';
    link.textContent = 'Ascolta su Spotify';
    
    playlist.appendChild(img);
    playlist.appendChild(caption);
    playlist.appendChild(link);
    
    playlistView.appendChild(playlist);
  }
}




const moodButtons = document.querySelectorAll('#mood-buttons button');
for (const button of moodButtons) {
  button.addEventListener('click', searchMood);
}