const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'ace6328b33c070341ef1060b965d9767'; 

async function weatherFn(cName) {
    const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`; 
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
            $('#weather-info').fadeOut();
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);

    const celsius = data.main.temp;
    const fahrenheit = (celsius * 9/5) + 32;

    $('#temperature').html(`${celsius.toFixed(1)}°C / ${fahrenheit.toFixed(1)}°F`);
    
    const feelsLikeCelsius = data.main.feels_like;
    const feelsLikeFahrenheit = (feelsLikeCelsius * 9/5) + 32;
    $('#feels-like').html(`Feels like: ${feelsLikeCelsius.toFixed(1)}°C / ${feelsLikeFahrenheit.toFixed(1)}°F`);
    
    const description = data.weather[0].description.trim();
    $('#description').text(description.charAt(0).toUpperCase() + description.slice(1));  // Capitalize first letter
    
    if (data.wind) {
        $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    }

    if (data.weather[0].main.toLowerCase() === 'snow') {
        $('#additional-info').html('Moderate snow-ice warning');
    } else {
        $('#additional-info').html('');
    }

    const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    $('#weather-icon').attr('src', weatherIcon);

    const weatherCondition = data.weather[0].main.toLowerCase();
  
    $('#weather-icon').removeClass('sunny rainy cloudy windy snowy thunderstorm');

    if (weatherCondition === 'clear') {
        $('#weather-icon').addClass('sunny');
    } else if (weatherCondition === 'rain') {
        $('#weather-icon').addClass('rainy');
    } else if (weatherCondition === 'clouds') {
        $('#weather-icon').addClass('cloudy');
    } else if (weatherCondition === 'wind') {
        $('#weather-icon').addClass('windy');
    } else if (weatherCondition === 'snow') {
        $('#weather-icon').addClass('snowy');
    } else if (weatherCondition === 'thunderstorm') {
        $('#weather-icon').addClass('thunderstorm');
    } else {
        $('#weather-icon').addClass('sunny');
    }

    $('#weather-info').removeClass().addClass('animate__animated').addClass('animate__fadeIn');

    $('#weather-info').fadeIn();
}
$(document).ready(function () {
    $('#city-input-btn').click(function () {
        const cityName = $('#city-input').val();
        if (cityName) {
            weatherFn(cityName);
        }
    });

    $('#city-input').keydown(function (e) {
        if (e.key === 'Enter') {
            const cityName = $('#city-input').val();
            if (cityName) {
                weatherFn(cityName);
            }
        }
    });
});

