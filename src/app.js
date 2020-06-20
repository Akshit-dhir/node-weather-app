const express = require('express')
//express is actually a fucntion as contrast to object 
// we can directly call it to create a express application 
const app = express()
// Given below is a app.get() function which takes request and response
// the main purpose of this function is to get the request from the user
// and give back the resonse in the form of the response variable 
// we can return from this function whatever we want to return 
app.get('',(req,res) => {
   res.send('<h1>Weather</h1>')
})
// the above get method will send "Hello express" as response
// the first argument which is kept as empty string which is the basically the root address at which we want to send the 
// the response in above case it will be app.com
app.get('/help', (req,res) => {
   res.send({
       name:'Akshit',
       age:27
   })
})
app.get('/about',(req,res)=> {
res.send('<h1>About</h1>')
})
// It would be nice if we can write our html in seperate HMTL files and then try to render them here 
// lets check that out in app2.js
app.get('/weather',(req,res)=>{
res.send({
    forecast: "Windy",
    location: "Phagwara"
})
})
// app.com
// app.com/help
// app.com/about
 app.listen(3000, () => {
     console.log('Server is up and running on port 3000')    
 })
 // the above code will start a server and
 // listen at port 3000
 // we can start up the server using the node app.js
