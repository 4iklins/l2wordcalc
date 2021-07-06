

const param = {
  "url": "http://api.openweathermap.org/data/2.5/",
  "appid": "c0cee7209d71b69e1fae714e5e0e90d8"
}

const cities = {
  2643743: "london",
  625144: "minsk",
  703448: "kyiv",
  6846555: "fanipol",
  628634: "dzyarzhynsk"
}

let weather = document.querySelector('.weather');

let createSelect = function (obj) {
  let fragment = new DocumentFragment();
  let select = document.createElement('select');
  select.classList.add('weather__city-list');
  fragment.append(select);
  for (let key in obj) {
    let option = document.createElement('option');
    option.value = key;
    option.textContent = obj[key];
    option.selected = key == 625144;
    select.append(option);
  }
  return fragment;
}

function date(unix) {
  let a = new Date(unix * 1000);
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let day = a.getDate();
  let date = day + ' ' + month + ' ' + year;
  return date;
}

function sunSetRise(unix) {
  let a = new Date(unix * 1000);
  let hour = a.getHours();
  let min = a.getMinutes();
  let time = hour + ':' + min;
  return time;
}

function getWeather() {
  const cityId = document.querySelector('.weather__city-list').value;
  fetch(`${param.url}weather?id=${cityId}&appid=${param.appid}`)
    .then(weather => {
      return weather.json();
    }).then(showWeather);
}

function showWeather(data) {
  console.log(data);
  document.querySelector('.weather__name').textContent = data.name;
  document.querySelector('.weather__temp').innerHTML = Math.round(data.main.temp - 273) + '&deg;'+'C';
  document.querySelector('.weather__date').textContent = date(data.dt);
  document.querySelector('.weather__sunrise').textContent = `Sunrise ${sunSetRise(data.sys.sunrise)}`;
  document.querySelector('.weather__sunset').textContent = `Sunset ${sunSetRise(data.sys.sunset)}`;
  document.querySelector('.weather__icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`
  document.querySelector('.weather__humidity').textContent = `Humidity ${data.main.humidity}%`;
  document.querySelector('.weather__preassure').textContent = `Preassure ${data.main.pressure / 1000} atm`;
  document.querySelector('.weather__description').textContent = data.weather[0].description;
  // здесь вы выводите на страницу
}



weather.prepend(createSelect(cities));
getWeather();
document.querySelector('.weather__city-list').onchange = getWeather;

