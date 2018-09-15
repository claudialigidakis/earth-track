$("#coordinates").submit(function(event) {
  event.preventDefault()
  let pointRegEx = new RegExp("^[-+]?[0-9]{1,3}(?:\.[0-9]{1,10})?$")
  let coordinates = $("#points").val().split(",")
  if (coordinates.length !== 2) return $('#points').addClass('invalid');

  let latitude = coordinates[0].trim()
  let longitude = coordinates[1].trim()
  if (pointRegEx.test(latitude) && pointRegEx.test(longitude)) {
    return createMap(latitude, longitude)
  }
  else {
    return $('#points').addClass('invalid');
  }
});

const createMap = (latitude, longitude) => {
  $("#points").val("")
  $('#points').removeClass('valid')
  axios.post(`http://localhost:3000/views`, {latitude, longitude})
  .then( data => {
    const newImage = data.data
    console.log(typeof newImage)
    $('#map').attr("src", `${newImage}`)
  })
  .catch(err => {
    return $('#points').addClass('invalid');
  })
}
