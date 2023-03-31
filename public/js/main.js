const socket = io()
const lattitude = document.querySelector('#lattitude')
const longitude = document.querySelector('#longitude')
const form = document.querySelector('.form')
const locationChange = document.querySelector('#locationChange')
const enableLocation = document.querySelector('#enableLocation')

var locationToggle = false

let lat
let long

socket.emit('join')

//get room and users
socket.on('message', (message)=>{
  console.log(message)
})

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    //get the value of lattitude and longitude input and log them as a object in console
    socket.emit('locationChange', {
      lattitude: lattitude.value,
      longitude: longitude.value
    })

    locationChange.style.display = 'block'
    setTimeout(()=>{
      locationChange.style.display = 'none'
    },1000)
  })
const init = async () => {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        locationToggle=true;
        // Storing Longitude and Latitude in variables
        longitude.value = position.coords.longitude;
        lattitude.value = position.coords.latitude;
        // Displaying the Longitude and Latitude in the console
        console.log(`Longitude: ${longitude.value} | Latitude: ${lattitude.value}`);
      });
      if(!locationToggle){
        enableLocation.style.display = 'block'
        setTimeout(()=>{
          enableLocation.style.display = 'none'
        }
        ,3000)
      }
    } else {
      console.log("Geolocation is not supported by this browser.")
  }
}


init()