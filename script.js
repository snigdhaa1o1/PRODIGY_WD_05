const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
  const APIKey = '646b5683c2a0dd4a968b31fa3f2b20f6';
  const city = document.querySelector('.search-box input').value;

  if (city === '') return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
      if (json.cod === '404') {
        container.style.height = '590px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
        return;
      }

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      // Update content
      temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
      description.innerHTML = json.weather[0].description;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${Math.round(json.wind.speed)} km/h`;

      // Weather image
      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'images/clear.webp';
          break;
        case 'Rain':
          image.src = 'images/rain.png';
          break;
        case 'Snow':
          image.src = 'images/snow.webp';
          break;
        case 'Clouds':
          image.src = 'images/cloud.png';
          break;
        case 'Mist':
        case 'Haze':
          image.src = 'images/mist.png';
          break;
        default:
          image.src = 'images/cloud.png';
      }

      container.style.height = '590px';
      weatherBox.classList.add('active');
      weatherDetails.classList.add('active');
      error404.classList.remove('active');
    })
    .catch(error => {
      alert('An error occurred. Please try again.');
      console.error(error);
    });
});
