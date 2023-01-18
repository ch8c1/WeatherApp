<script>
  import Geolocation from "svelte-geolocation";
  let coords = [];
  import {goto} from '$app/navigation';
  let query = '';
  function submitSearch(){
    if (query) {
      goto(`/${query}`);
      query = '';
    }
  }
  export let data;
  //icons
  let icon_code_today = data.weatherData.weather[0].icon
  const icon_url_today = `http://openweathermap.org/img/wn/${icon_code_today}@2x.png`
  let icon_code_tomorrow = data.weatherForecast.list[0].weather[0].icon
  const icon_url_tomorrow = `http://openweathermap.org/img/wn/${icon_code_tomorrow}@2x.png`
  let icon_code_2dayslater = data.weatherForecast.list[1].weather[0].icon
  const icon_url_2dayslater = `http://openweathermap.org/img/wn/${icon_code_2dayslater}@2x.png`
  let icon_code_3dayslater = data.weatherForecast.list[2].weather[0].icon
  const icon_url_3dayslater = `http://openweathermap.org/img/wn/${icon_code_3dayslater}@2x.png`
  let icon_code_4dayslater = data.weatherForecast.list[3].weather[0].icon
  const icon_url_4dayslater = `http://openweathermap.org/img/wn/${icon_code_4dayslater}@2x.png`
  let icon_code_5dayslater = data.weatherForecast.list[4].weather[0].icon
  const icon_url_5dayslater = `http://openweathermap.org/img/wn/${icon_code_5dayslater}@2x.png`
  let icon_code_6dayslater = data.weatherForecast.list[5].weather[0].icon
  const icon_url_6dayslater = `http://openweathermap.org/img/wn/${icon_code_6dayslater}@2x.png`

  //Get the current day
  let today1 = new Date();
  let daysWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let day = daysWeek[today1.getUTCDay()];

  //Get current time
  let currentTime = new Date();
  let time = currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true});

  //Get current date
  let currentDate = new Date();
  let todaysDate = currentDate.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });



  //Get the current day and add +x days
  let today2 = new Date();
  let twoDayslater = new Date(today2.getTime() + (2 * 24 * 60 * 60 * 1000));
  let twoDayslaterName = twoDayslater.toLocaleString('default', {weekday: 'long'});
  let threeDayslater = new Date(today2.getTime() + (3 * 24 * 60 * 60 * 1000));
  let threeDayslaterName = threeDayslater.toLocaleString('default', {weekday: 'long'});
  let fourDayslater = new Date(today2.getTime() + (4 * 24 * 60 * 60 * 1000));
  let fourDayslaterName = fourDayslater.toLocaleString('default', {weekday: 'long'});
  let fiveDayslater = new Date(today2.getTime() + (5 * 24 * 60 * 60 * 1000));
  let fiveDayslaterName = fiveDayslater.toLocaleString('default', {weekday: 'long'});
  let sixDayslater = new Date(today2.getTime() + (6 * 24 * 60 * 60 * 1000));
  let sixDayslaterName = sixDayslater.toLocaleString('default', {weekday: 'long'});

  // get the timestamp of sunrise and sunset
  let unix_timestamp_sunrise = data.weatherData.sys.sunrise;
  let unix_timestamp_sunset = data.weatherData.sys.sunset;

  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  let date_sunrise = new Date(unix_timestamp_sunrise * 1000);
  let date_sunset = new Date(unix_timestamp_sunset * 1000);
  // Hours part from the timestamp
  let hours_sunrise = date_sunrise.getHours();
  let hours_sunset = date_sunset.getHours();
  // Minutes part from the timestamp
  let minutes_sunrise = "0" + date_sunrise.getMinutes();
  let minutes_sunset = "0" + date_sunset.getMinutes();

  // Will display time in 10:30:23 format
  let formattedTime_sunrise = hours_sunrise + ':' + minutes_sunrise.substr(-2)
  let formattedTime_sunset = hours_sunset + ':' + minutes_sunset.substr(-2)


</script>

<html lang="eng">
<div class="grid grid-cols-[400px_minmax(900px,_2fr)]">
  <div class="col-span-1 h-screen bg-[#0D1B2A] text-white">
    <form on:submit|preventDefault={submitSearch}>   
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="flex justify-center items-center">
      <div class="relative top-5">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" 
                stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input type="search" id="default-search" class="block w-[20rem] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-[#E0E1DD]
           dark:bg-[#E0E1DD] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search location" required bind:value={query}>
      </div>
    </div>
  </form>

  <h1 class="mt-[3rem] text-center text-[2rem] font-bold text-[#E0E1DD]">{data.weatherData.name}, {data.weatherData.sys.country} </h1>

  <h1 class="text-center text-md text-[#E0E1DD]"> {day} </h1>

  <img src="{icon_url_today}" alt="Weather Icon" class="mt-[2rem] h-[8rem] mx-auto">

  <h1 class="text-center font-bold text-lg -mt-5 text-[#E0E1DD]">{data.weatherData.weather[0].main}</h1>

  <h1 class="text-center text-sm text-[#E0E1DD]">{data.weatherData.weather[0].description}</h1>

  <h1 class="text-[#E0E1DD] text-[2rem] text-center mt-12">{data.weatherData.main.temp}º</h1>

  <h1 class="text-[1.9rem] ml-[3rem] mt-[4.8rem] text-[#E0E1DD]">High:</h1>

  <h1 class="ml-[3.6rem] text-[1.1rem] text-[#E0E1DD]">{data.weatherData.main.temp_max}º</h1>

  <div class="-mt-[4.5rem]">
    <h1 class="text-right mr-[3.6rem] text-[1.9rem] ml-[3rem] text-[#E0E1DD]">Low:</h1>

    <h1 class=" text-right mr-[4rem] text-[1.1rem] text-[#E0E1DD]">{data.weatherData.main.temp_min}º</h1>
  </div>

  <div class="flex flex-col mt-12 gap-3">
    <div class="bg-[#E0E1DD] ml-3.5 h-32 w-[23rem] rounded-[1rem] ">
      <svg class=" absolute ml-8 mt-10 w-auto h-[2.5rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 
        8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 
        16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/></svg>
          <h5 class="mt-[1rem] text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">Sunrise</h5>
          <p class="font-normal mt-5 text-center text-[1.6rem] text-gray-700 dark:text-gray-400">{formattedTime_sunrise} AM</p>

    </div>

    <div class="bg-[#E0E1DD] ml-3.5 h-32 w-[23rem] rounded-[1rem] ">
      <svg class=" absolute ml-8 mt-10 w-auto h-[2.5rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M6.083 13a6 6 0 1 1 11.834 0h-2.043a4 4 0 1 0-7.748 0H6.083zM2 15h10v2H2v-2zm12 0h8v2h-8v-2zm2
        4h4v2h-4v-2zM4 19h10v2H4v-2zm7-18h2v3h-2V1zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM19.07 3.515l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/></svg>
         <h5 class="mt-[1rem] text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">Sunset</h5>
         <p class="font-normal mt-5 text-center text-[1.6rem] text-gray-700 dark:text-gray-400">{formattedTime_sunset} PM</p>
    </div>
  </div>




</div>





  <div class="col-span-1 bg-[#1B263B] text-white">

  <h1 class="text-[#E0E1DD] ml-6 mt-12 text-[2rem]">Weather forecast for {data.weatherData.name} </h1>

  <h1 class="text-right -mt-[3.5rem] mr-[5rem] text-[2rem] text-[#E0E1DD]" > {time} </h1>
  <h1 class="text-right mr-12 text-[1rem] text-[#E0E1DD]">{todaysDate}</h1>

  <div>

    <div class=" block h-[13rem] w-[15rem] mt-[8rem] ml-6 bg-white border border-gray-200 rounded-[2rem] hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <p class="text-black font-bold mt-1 ml-4">Tomorrow</p>
      <hr class="absolute h-[2rem] w-[0.01rem] ml-[8.1rem] mt-[8.5rem] bg-black">
      <p class="text-black text-[1rem] font-bold ml-[5rem] mt-1">{data.weatherForecast.list[0].weather[0].description}</p>
      <p class="text-black text-[0.8rem] ml-4 mt-[6.5rem]">Pressure: {data.weatherForecast.list[0].main.pressure} hpa</p>
      <p class="text-black text-[0.8rem] ml-4 ">Humidity: {data.weatherForecast.list[0].main.humidity} g.m<sup>3</sup></p>
      <p class="text-black text-[0.8rem] ml-[8.7rem] -mt-[2.4rem]">Wind: {data.weatherForecast.list[0].wind.speed} km/h</p>
      <p class="text-black text-[0.8rem] ml-[8.7rem] ">Clouds: {data.weatherForecast.list[0].clouds.all}%</p>

      <p class="text-black text-[2rem] ml-6 -mt-[7.5rem] ">{data.weatherForecast.list[0].main.temp}º</p>
      <img src="{icon_url_tomorrow}" alt="Weather Icon" class=" h-[6rem] w-auto ml-[8.5rem] -mt-[4.2rem]">
    </div>
    

  </div>


  <div>

    <div class=" block h-[13rem] w-[15rem] mt-[8rem] ml-6 bg-white border border-gray-200 rounded-[2rem] hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <p class="text-black font-bold mt-1 ml-4">{twoDayslaterName}</p>
      <hr class="absolute h-[2rem] w-[0.01rem] ml-[8.1rem] mt-[8.5rem] bg-black">
      <p class="text-black text-[1rem] font-bold ml-[5rem] mt-1">{data.weatherForecast.list[1].weather[0].description}</p>
      <p class="text-black text-[0.8rem] ml-4 mt-[6.5rem]">Pressure: {data.weatherForecast.list[1].main.pressure} hpa</p>
      <p class="text-black text-[0.8rem] ml-4 ">Humidity: {data.weatherForecast.list[1].main.humidity} g.m<sup>3</sup></p>
      <p class="text-black text-[0.8rem] ml-[8.7rem] -mt-[2.4rem]">Wind: {data.weatherForecast.list[1].wind.speed} km/h</p>
      <p class="text-black text-[0.8rem] ml-[8.7rem] ">Clouds: {data.weatherForecast.list[1].clouds.all}%</p>

            <p class="text-black text-[2rem] ml-6 -mt-[7.5rem] ">{data.weatherForecast.list[1].main.temp}º</p>
      <img src="{icon_url_2dayslater}" alt="Weather Icon" class=" h-[6rem] w-auto ml-[8.5rem] -mt-[4.2rem]">
    </div>
    

  </div>


  <div>

    <div class=" block h-[13rem] w-[15rem] -mt-[34rem] ml-[20rem] bg-white border border-gray-200 rounded-[2rem] hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <p class="text-black font-bold mt-1 ml-4">{threeDayslaterName}</p>
      <hr class="absolute h-[2rem] w-[0.01rem] ml-[8.1rem] mt-[8.5rem] bg-black">
      <p class="text-black text-[1rem] font-bold ml-[5rem] mt-1 ">{data.weatherForecast.list[2].weather[0].description}</p>
      <p class="text-black text-[0.8rem] ml-4 mt-[6.5rem]">Pressure: {data.weatherForecast.list[2].main.pressure} hpa</p>
      <p class="text-black text-[0.8rem] ml-4 ">Humidity: {data.weatherForecast.list[2].main.humidity} g.m<sup>3</sup></p>
      <p class="text-black text-[0.8rem] ml-[8.7rem] -mt-[2.4rem] ">Wind: {data.weatherForecast.list[2].wind.speed} km/h</p>
      <p class="text-black text-[0.8rem] ml-[8.7rem] ">Clouds: {data.weatherForecast.list[2].clouds.all}%</p>

      <p class="text-black text-[2rem] ml-6 -mt-[7.5rem] ">{data.weatherForecast.list[2].main.temp}º</p>
      <img src="{icon_url_3dayslater}" alt="Weather Icon" class=" h-[6rem] w-auto ml-[8.5rem] -mt-[4.2rem]">
    </div>
    

  </div>  

  <div>

    <div class=" block h-[13rem] w-[15rem] mt-[8rem] ml-[20rem] bg-white border border-gray-200 rounded-[2rem] hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <p class="text-black font-bold mt-1 ml-4">{fourDayslaterName}</p>
      <hr class="absolute h-[2rem] w-[0.01rem] ml-[8.1rem] mt-[8.5rem] bg-black">
      <p class="text-black text-[1rem] font-bold ml-[5rem] mt-1">{data.weatherForecast.list[3].weather[0].description}</p>
      <p class="text-black text-[0.8rem] ml-4 mt-[6.5rem]">Pressure: {data.weatherForecast.list[3].main.pressure} hpa</p>
      <p class="text-black text-[0.8rem] ml-4 ">Humidity: {data.weatherForecast.list[3].main.humidity} g.m<sup>3</sup></p>
      <p class="text-black text-[0.8rem] ml-[8.7rem] -mt-[2.4rem] ">Wind: {data.weatherForecast.list[3].wind.speed} km/h</p>
      <p class="text-black text-[0.8rem] ml-[8.7rem] ">Clouds: {data.weatherForecast.list[3].clouds.all}%</p>

      <p class="text-black text-[2rem] ml-6 -mt-[7.5rem]">{data.weatherForecast.list[3].main.temp}º</p>
      <img src="{icon_url_4dayslater}" alt="Weather Icon" class=" h-[6rem] w-auto ml-[8.5rem] -mt-[4.2rem]">
    </div>
    

  </div>  



  <div>

    <div class=" block h-[13rem] w-[15rem] -mt-[34rem] ml-[38rem] bg-white border border-gray-200 rounded-[2rem] hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <p class="text-black font-bold mt-1 ml-4">{fiveDayslaterName}</p>
      <hr class="absolute h-[2rem] w-[0.01rem] ml-[8.1rem] mt-[8.5rem] bg-black">
      <p class="text-black text-[1rem] font-bold ml-[5rem] mt-1">{data.weatherForecast.list[4].weather[0].description}</p>
      <p class="text-black text-[0.8rem] ml-4 mt-[6.5rem]">Pressure: {data.weatherForecast.list[4].main.pressure} hpa</p>
      <p class="text-black text-[0.8rem] ml-4  ">Humidity: {data.weatherForecast.list[4].main.humidity} g.m<sup>3</sup></p>
      <p class="text-black text-[0.8rem] ml-[8.7rem] -mt-[2.4rem] ">Wind: {data.weatherForecast.list[4].wind.speed} km/h</p>
      <p class="text-black text-[0.8rem] ml-[8.7rem] ">Clouds: {data.weatherForecast.list[4].clouds.all}%</p>

      <p class="text-black text-[2rem] ml-6 -mt-[7.5rem] ">{data.weatherForecast.list[4].main.temp}º</p>
      <img src="{icon_url_5dayslater}" alt="Weather Icon" class=" h-[6rem] w-auto ml-[8.5rem] -mt-[4.2rem]">
    </div>
    

  </div>  

  </div>

<div style="position:absolute; bottom:0; right:0;">
  <h1 class="text-right text-[#E0E1DD] mr-1 text-sm ">Powered by <a href="https://openweathermap.org/" target="_blank" rel="noreferrer">OpenWeatherAPI</a></h1>
</div>


</div>

</html>