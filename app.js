const dbPromise = idb.open('appDb', 1, upgradeDb => {

  const currencyStore = upgradeDb.createObjectStore('currencies');

     });
 

//fetch the currencies from the api

fetch('https://free.currencyconverterapi.com/api/v5/currencies')
      .then(res=> {

       return res.json();

        }).then( result => {

          //looping through the currencies and adding them in the select options tag

          let to = document.getElementById('to'),

           from = document.getElementById('from');


          for ( let i in result.results) {

            //creating the options dropdown 
          let option = document.createElement("option");

          option.value = option.text = i;

          to.appendChild(option);

          from.appendChild(option.cloneNode(true));

                  }
        

          }).catch(()=>{

          //fetch query return null
          document.getElementById('error').innerHTML = `CHECK BACK`;

      });
  
      //Check if browser supports service worker
  
      if ('serviceWorker' in navigator) {
             
        //register the service worker

        navigator.serviceWorker.register('/sw.js');
        
        }

          
        const calculate = ()=> {

        'use strict';

        const amount = document.getElementById('amount').value;

        let fromCurrency = document.getElementById('from').value,
        
         toCurrency = document.getElementById('to').value;

         fromCurrency = encodeURIComponent(fromCurrency);

         toCurrency = encodeURIComponent(toCurrency);

        let query = `${fromCurrency}_${toCurrency}`;
        let requery = `${toCurrency}_${fromCurrency}`;

       
       const getRate = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;
        
        fetch(getRate).then(rate => {

          return rate.json();

        }).then(rateResult => {     

          let exRate = rateResult[query];

          dbPromise.then( db => {
           const tx = db.transaction('currencies', 'readwrite');
          const currencyStore = tx.objectStore('currencies');
          currencyStore.put(exRate, query);
          currencyStore.put((1/exRate), requery);
        
        });
           
          
          document.getElementById('show').innerHTML = `${fromCurrency} ${amount}  == ${toCurrency} ${amount * exRate}`;

        }).catch(()=>{

                dbPromise.then(db=> {
                const tx = db.transaction('currencies');
                const currStore = tx.objectStore('currencies');
                return currStore.get(query);
                }).then(val => {
                  if (val ) {
                       document.getElementById('error').innerHTML = `Connect to internet for updated exchange rates` ;

                return document.getElementById('show').innerHTML = `${fromCurrency} ${amount}   == ${toCurrency } ${amount * val}`; 

                 }else{

                return document.getElementById('show').innerHTML = `KINDLY CONNECT TO NETWORK`;

                  }

               
                });
         
        });

    
          return false;         
        }

        const init = () => {

            'use strict';

            const cform = document.getElementById('cform');

            cform.onsubmit = calculate;

        }

        window.onload = init;   