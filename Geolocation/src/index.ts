navigator.geolocation.getCurrentPosition(
    (position)=>{
        const {latitude, longitude} = position.coords;
        console.log(latitude)
    },
    (error)=>{
        console.log(error)
    }
)

//run this in client environment since server does not have navigator