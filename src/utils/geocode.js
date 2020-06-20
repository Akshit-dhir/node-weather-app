const request = require("request")
const geocode=(address,callback)=>{
   const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYWtzaGl0MTk5NiIsImEiOiJja2I5MGR4aGowNTV2MnJ0MzVkYTdtNWhwIn0.o6voefdBvNcKy3EQgFsGyw&limit=1"
   request({url,json:true},(error,{body})=>
   {
       if(error)
       {
           callback("Unable to connect to internet",undefined)
       }
       else if(body.features.length===0)
       {
           callback("Unable to find the location",undefined)
       }
       else
       {
           callback(undefined,{
               'latitude':body.features[0].center[1],
               'longitude':body.features[0].center[0],
               'location':body.features[0].place_name
           })
       }
   })
}

module.exports = geocode