// In the code below we are using the core module path to 
// get the path of the public folder   
const path = require('path')
const express =require('express')
const app = express()
// in order to access the assets of the the assets folder
// like html and css we need to add path of the public folder 
// here which will have all these files
console.log(__dirname)
//console.log(__filename) 
// the code returns me below 
// C:\Users\dhira\Documents\Node\web-server\src\app2.js
// but I need path of the public folder 
// for that I am using below path
console.log(path.join(__dirname,'../public'))
//now since I have access to this public directory.I need my app server to use this path and fetch
//content from it. For that we use the following code
//app.use(express.static())
// express.static is a function that we want to use 
// it takes the path of the folder that we want to server up
const publicDirectoryPath = path.join(__dirname,'../public') 
app.use(express.static(publicDirectoryPath))
// when we use the above code, we are never going to get the result of the following code 
// because express.static will be able to use the content of the public Directory path which is a HTML file 
// which will be rendered to root path so following code is no longer needed hence commenting it out 
//app.get('',(req,res)=>{
//    res.send('<h1>Weather</h1>')
//})
// for help and about earlier there were two seperate routes one as /help and the other as /about
// now lets try to add two html files about.html and help.html try to render then 
app.listen(3000, () => {
    console.log('Server is up and running on port 3000')    
})