const request = require("request")
const forecast = (latitude,longitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=0a8366139ab5b696c3811a3fba52c5b6&query="+latitude+","+longitude+"&units=f"
    request({url,json:true},(error,{body})=>
    {
       if(error)
       {
           callback("Unable to connect to internet",undefined)
       }
       else if(body.error)
       {
           callback("Unable to find the location",undefined)
       }
       else{
           callback(undefined,{
             'Weather_type':body.current.weather_descriptions[0],
             'temperature':body.current.temperature,
             'feelslike':body.current.feelslike 
           })
       }
    })
}
module.exports = forecast