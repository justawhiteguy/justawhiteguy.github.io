(function() {
  var WeatherApp = {
    init: function() {
      this.getLocation();
    },
    cache: {
      isFahrenheit: true
    },
    getLocation: function() {
      var c = WeatherApp.cache;
      if(window.chrome) {
        $.getJSON('http://ip-api.com/json', function(json) {
          // console.log('using window.chrome');
          c.lat = json.lat;
          c.long = json.lon;
          WeatherApp.getWeatherInformation();
        });
      } else {
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(data) {
            // console.log('using navigator.geolocation');
            c.lat = data.coords.latitude;
            c.long = data.coords.longitude;
            WeatherApp.getWeatherInformation();
          });
        }
      }
    },
    getWeatherInformation: function() {
      var c = WeatherApp.cache;
      var appid = "9c6ae69be4e5e88ee8d1066a05d9fd8f";
      $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + c.lat + '&lon=' + c.long + '&units=imperial&appid=' + appid, function(json) {
        c.location = json.name;
        c.country = json.sys.country;
        c.fahrenheit = Math.round(json.main.temp);
        c.celsius = Math.round((c.fahrenheit - 32) * 5 / 9);
        c.icon = json.weather[0].icon;
        c.sky = json.weather[0].main;
        WeatherApp.showWeather();
      });
    },
    showWeather: function() {
      var c = WeatherApp.cache;
      $('.location').html(c.location + ', ' + c.country);
      if(c.isFahrenheit) {
        $('.temp').html(c.fahrenheit + '&deg;F');
        WeatherApp.formatTemperature(c.fahrenheit);
      } else {
        $('.temp').html(c.celsius + '&deg;C');
      }
      $('.sky').html('<img src=\'http://openweathermap.org/img/w/' + c.icon + '.png\' alt=\'' + c.sky + '\'> ' + c.sky);
      WeatherApp.changeUnits();
    },
    changeUnits: function() {
      var c = WeatherApp.cache;
      $('#changeUnits').on('click', function() {
        c.isFahrenheit = !c.isFahrenheit;
        if(c.isFahrenheit) {
          $('.temp').html(c.fahrenheit + '&deg;F');
        } else {
          $('.temp').html(c.celsius + '&deg;C');
        }
      });
    },
    formatTemperature: function(t) {
      if(t < 10) {
        $('.temp').css('color', '#14144B');
      } else if(t < 20) {
        $('.temp').css('color','#363672');
      } else if(t < 30) {
        $('.temp').css('color','#6F6DA7');
      } else if(t < 40) {
        $('.temp').css('color','#93BDE7');
      } else if(t < 50) {
        $('.temp').css('color','#B7DB48');
      } else if(t < 60) {
        $('.temp').css('color','#EFCE10');
      } else if(t < 70) {
        $('.temp').css('color','#E6AA19');
      } else if(t < 80) {
        $('.temp').css('color','#C06618');
      } else if(t < 90) {
        $('.temp').css('color','#BA4200');
      } else if(t < 100) {
        $('.temp').css('color','#A21812');
      } else {
        $('.temp').css('color','#961E2A');
      }
    }
  };
  WeatherApp.init();
})();
