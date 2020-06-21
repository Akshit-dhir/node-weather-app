
// following is the code we are writing for the purpose of 
// fetching the data on the client side 
// for that we are using this client side javascript file 
// fetch('http://puzzle.mead.io/puzzle')
// calling fetch in javscript will kick off asynchronous IO operation much like
// calling request in node js did
// in node when we called the request function we gave it a callback funcyion to run when it gets back the result 
// in case of fetch we are doing it slightly differently 
// we are linking a then function to it which already has a function which will be called when we get something back from 
// the call back
/*fetch('http://puzzle.mead.io/puzzle').then((response) => {
  // following code is another call back code which runs 
  // whne josn data has arrived and been parsed 
  response.json().then((data)=>{
   console.log(data)
  })
})*/
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
messageOne.textContent = ''
messageTwo.textContent = ''
// when I will run the below code , Testing! will appear 
// on the window for a while and disappear this is because 
// the page is refreshing after every 10 seconds 
// to stop this I will add following to the code 
// e.preventDefault()
weatherform.addEventListener('submit',(e) => {
    e.preventDefault()
    const address  = search.value
    // we will be able to see the result of this console.log 
    // on the client side chrome developer tool console, because this javascript code is running on the 
    // client side 
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    // the url in the fetch will not run when we deploy it on heroku server since its referring to the localhost
    // we will just give the generic path
    fetch('/weather?address='+address).then((response) => {
    // following code is another call back code which runs 
    // when json data has arrived and been parsed 
    response.json().then((data)=>{
     if(data.error)
     {
        messageOne.textContent = data.error
        messageTwo.textContent = ''
     }
     else{ 
        messageOne.textContent = data.Forcastdata
        messageTwo.textContent = data.location
     }
    })
  })
})
//Now when I will run the above code I will get an error that event listener is applied on null
//because in the index.hbs Javascript file is loaded first then the html code is run so in order to 
// do that we will have to load Javascript code after html content is created  