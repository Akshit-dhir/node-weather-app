// In app2.js we saw that when we can load assets statically
// and and everytime when we reload our about.html file 
// we will get the same image and about title 
// now lets see how to mak this process dynamic 
// other thing is we will be able to get reusable code
// For eg we need same header and footer to be used among all the .html files
// for this we will install hbs npm module 
// hbs is friendly with express js there is other module named as handlebars
// which can also be used, but its of low level and can't be used with express js 
// after installing hbs we need to tell express which templating engine we have installed
// and that we have done in line number - 33
const path = require('path')
const express =require('express')
const app = express()
console.log(__dirname)
console.log(path.join(__dirname,'../public'))
// define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
// app.set() needs a key value pair , it has a key 
// the setting name and has a value as well
// express expect that all our views, in our case handlebars must
// live in a specific folder 
// now what we will do is we will replace out index.html home page 
// by a view index.hbs, this view can be used again latter,
// handle bars file index.hbs is just a HTML will couple of more features 
// we will copy everything from index.html to index.hbs and delete index.html 
// file since it is not required, we will keep other files there which are required 
// statically
// Now no one is going to access the index.hbs page directly we have to write the code
// written from line number 32
const viewsPath = path.join(__dirname,'../templates')
// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath) 
// setup static directory to serve
app.use(express.static(publicDirectoryPath))
// we can also renaim our view folder and use a customized name instead
// but when we will run the code after just renaiming we will get error 
// In order to avoid this,we have to set path of the new named directory 
// and give this path to the app server code at line 34

app.get('',(req,res)=>{
// here below I am providing a second argument which will be rendered in heading of index.hbs
    res.render('index',{
        title:'Weather App',
        name: 'Akshit Dhir'
    })
    app.get('/about',(req,res)=>{
       res.render('about',{
         title:'About me',
         name:'Akshit Dhir'  
       }) 
    })
    app.get('/help',(req,res)=>{
        res.render('help',{
          title:'Help',
          helpcontent:'this page is for help'  
        }) 
     })
// render allows us to render one of our views. and we just need to give the 
// name of the view to be rendered 
})
app.listen(3000, () => {
    console.log('Server is up and running on port 3000')    
})