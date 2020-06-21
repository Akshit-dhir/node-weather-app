const hbs = require('hbs')
const path = require('path')
const express =require('express')
const app = express()
// below code is to fetch the dynamic port provided by heroku
// to us , fetched through process , followed by the environment variablee which 
// will have our port inside PORT
const port = process.env.PORT || 3000
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath) 
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
        res.render('index',{
            title:'Weather',
            name:'Akshit Dhir'
        })
    })
        app.get('/about',(req,res)=>{
           res.render('about',{
             title:'About me',
             name:'Akshit Dhir'  
           }) 
        })
        app.get('/help',(req,res)=>{
            res.render('help',{
              helpcontent:'this page is for help',
              title:'Help',
              name: 'Akshit Dhir'
            }) 
         })
         app.get('/weather',(req,res)=>{
            if(!req.query.address)
            {
                return res.send({
                    error: "You must provide an address"
                 })
            }
            else
            {
                address=req.query.address
                geocode(address,(error,{latitude,longitude,location}={})=>
                {
                    if(error)
                    {
                        return res.send({
                            error: error
                        })
                    }
                    forecast(latitude,longitude,(error,{Weather_type,temperature,feelslike}={})=>
                    {
                        if(error)
                        {
                            return res.send({
                                error:error
                            })
                        }
                        res.send({
                            Forcastdata : Weather_type +" outside.There is temperature of "+temperature+" feels like "+feelslike,
                            location,
                            address
                        })
                    })
                })
            }
        })
         // In the below code when we visit 
         // localhost:3000/products we will get an empty array as an result
         // Now in the url we can write below 
         // localhost:3000/products if we need to pass anything to this url, it will be 
         // passed using a key value pair starting with question mark
         // which is called a query string
         // like lochalhost:3000/products?search=games
         // in the above case we are just passing a search query to an express api with key
         // as search & value as games
         // we can also pass two queries as below 
         // lochalhost:3000/products?search=games&rating=5
         // now the question is how does the server fetch this information 
         // from the query it will be fetched through the request variable of the get function 
         app.get('/products',(req,res)=>{
            // lets check what do we have in the req.query function
            // we get the following out output when we runthe following code
            // console.log(req.query)
            // { search: 'games', rating: '5' }
            // now when I run the below code and try to run it with the command localhost:3000/products
            // I will get the error because res.send() is called twice to avoid this I have added a return statement inside of the if block
            if(!req.query.search){
               return res.send({
                   error: "You must provide a search tree"
                })
            }
            res.send({
                products: []
            })
        })
    app.get('/help/*',(req,res)=>{
        res.render('error',{
            errorcontent:'Help page not found',
            title:'404',
            name:'Akshit Dhir'
        })
    })
    app.get('*',(req,res)=>{
        res.render('error',{
            errorcontent:'Page not found',
            title:'404',
            name:'Akshit Dhir'
        })
    })
    // the goal is to actually use the geocode and the forecast function down in this function 
    // to get the location name and send the actual weather of that location 
    
    app.listen(port, () => {
        console.log('Server is up and running on port '+ port)    
    })
    // I the above code we were using lochost port 3000 for listening to our app now we can change it 
    // since it will be hosted at the heroku server and heroku will provide us an 
    // dynamic server where our app can be hosted 
    // WHne we deploy our app onto the heroku server we nned to specify which file 
    // we nned to specify which file need to be executed at the server /
    // we will do it by setting the script property of package.json as "start": "node src/app.js" 
    // we can even start this app from our console using npm run start
