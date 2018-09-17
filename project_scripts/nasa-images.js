const points = $('#points')
const loader = document.querySelector('#loader')
const map = document.querySelector('#map')


const showSpinner = () => {
  loader.style.display = 'block';
  map.style.display = 'none';
}

const hideSpinner = () => {
  loader.style.display = 'none';
  map.style.display = 'block';
}

const quickLink = (event) => {
  let values = event.currentTarget.id
  let coordinates = values.split(",")
  let latitude = coordinates[0].trim()
  let longitude = coordinates[1].trim()
  return createMap(latitude, longitude)
}

$(".quick").on("click", function(event){ quickLink(event); });


$("#coordinates").submit(function(event) {
  event.preventDefault()
  let pointRegEx = new RegExp("^[-+]?[0-9]{1,3}(?:\.[0-9]{1,10})?$")
  let coordinates = points.val().split(",")
  if (coordinates.length !== 2) return points.addClass('invalid');
  let latitude = coordinates[0].trim()
  let longitude = coordinates[1].trim()
  console.log(pointRegEx.test(latitude), pointRegEx.test(longitude));
  if (pointRegEx.test(latitude) && pointRegEx.test(longitude)) {
    return createMap(latitude, longitude)
  }
  else {
    return points.addClass('invalid');
  }
});

const createMap = async (latitude, longitude) => {
  try {
    showSpinner()
    points.val("")
    points.removeClass('valid')
    const images = await axios.post(`http://localhost:3000/views`, {latitude, longitude})
    $('#display_points').html(`${latitude}, ${longitude}`)

    $('#top-left').attr("src", `${images.data.top_left}`)
    $('#top-middle').attr("src", `${images.data.top_middle}`)
    $('#top-right').attr("src", `${images.data.top_right}`)
    $('#center-left').attr("src", `${images.data.center_left}`)
    $('#center').attr("src", `${images.data.center}`)
    $('#center-right').attr("src", `${images.data.center_right}`)
    $('#bottom-left').attr("src", `${images.data.bottom_left}`)
    $('#bottom-center').attr("src", `${images.data.bottom_middle}`)
    $('#bottom-right').attr("src", `${images.data.bottom_right}`)
  }
  catch {
    return points.addClass('invalid');
  }
  finally {
       hideSpinner()
  }
}
