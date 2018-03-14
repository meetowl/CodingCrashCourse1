setInterval(() => {
  axios.get('/getColour').then((response) => {
    if (document.getElementById('colour') != document.activeElement) {
      document.body.style.backgroundColor = response.data
      document.getElementById('colour').value = response.data
    }
  }).catch((error) => {
    console.log(error)
  })
}, 1000)

function submit() {
  let colour = document.getElementById('colour').value

  axios.post('/setColour', {
    colour: colour
  }).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log(error)
  })
}
