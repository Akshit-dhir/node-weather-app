// I am creating this seperate file because I want explain how to 
// have a const header and footer on all the pages through a single sharable code 
// rather than sending individually it to the .hbs file (improved html file) of each page 
// for that I wrote the below code
// we are basically creating partials
// I have loaded hbs below
// I will keep my partials and views inside templates directory
// Partials will be kept under partial folder inside of the templates folder 
// Views will be kept under views folder inside of the templates folder 
const hbs = require('hbs')
const path = require('path')
const express =require('express')
const app = express()
// define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
// we need to register our partials inside of the hbs directory
hbs.registerPartials(partialsPath) 
// setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    // here below I am providing a second argument which will be rendered in heading of index.hbs
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
         
    // following code is to handle error page, the pages that we get when we try to access some other url like localhost:3000/me 
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
    // render allows us to render one of our views. and we just need to give the 
    // name of the view to be rendered 
    app.listen(3000, () => {
        console.log('Server is up and running on port 3000')    
    })
    // Another problem is when we save our about.hbs file and we refresh the link localhost:3000
    // we will not get the intended output this is because the server is restarted only when we save our app.js files 
    // we can modify our nodemon restart call function as shown in line number -- 
    // to do that we will do a small tweek to the command that we are running now
    // nodemon src/app4.js -e js,hbs
    // this is a way to tell nodemon to extend( -e) the facility of restarting to files 
    // of extension js and hbs