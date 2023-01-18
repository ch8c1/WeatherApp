import 'dotenv/config';

export const load = async ({params}) => {
    const fetchWeather = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&lang=eng&appid=${process.env.WEATHER_API}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
    };
    const fetchWeatherForecast = async () => {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${params.city}&lang=eng&cnt=6&appid=${process.env.WEATHER_API}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
    };

    return {
        weatherData: await fetchWeather(),
        weatherForecast: await fetchWeatherForecast()
    };
};
