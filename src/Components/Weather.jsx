
import icon_search from '../assets/search.png';
import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import sun from '../assets/sun.png';
import sun_02 from '../assets/sun_02.png';
import clouds from '../assets/clouds.png'
import drizzle from '../assets/drizzle.png'


import { useEffect ,useRef,useState } from 'react';


const Weather = () => {
    const [weather , setWeather] = useState(false);
    const inputRef = useRef();
    console.log("weather",weather.weathers);
    
    const allIcon = {
        "01d": sun,
        "01n": sun,
        "02d": sun_02,
        "02n": sun_02,
        "03d": clouds,
        "03n": clouds,
        "04d": clouds,
        "04n": clouds,
        "09d": rain,
        "09n": rain,
        "10d": drizzle,
        "10n": drizzle,
        "11d": rain,
        "11n": rain,
        "13d": snow,
        "13n": snow,
    };

    const search = async (city) => {
        try {
            
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${import.meta.env.VITE_API_KEY}`;

            const geoResponse = await fetch(geoUrl);
            const geoData = await geoResponse.json();
    
            if (geoData.length === 0) {
                console.error("Không tìm thấy thành phố");
                return;
            }
    
            const { lat, lon } = geoData[0];

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;
            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();
    
            console.log("weatherData",weatherData);
            

            const icon = allIcon[weatherData.weather[0].icon] || sun;
            
            setWeather({
                humidity: weatherData.main.humidity,
                wind: weatherData.wind.speed,
                temperature: Math.floor(weatherData.main.temp),
                location: weatherData.name,
                weathers: icon,

            })
            
        } catch (error) {
            
        }
    }
    const handle = () => {
        const city = inputRef.current.value.trim();
        if (city) {
            search(city);
        }
    };

    useEffect(() => {
        search("New York");
    }, []);

  

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-blue-200 to-blue-300">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
            {/* Search */}
            <div className="flex items-center gap-3 justify-center mb-6">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search city..."
                className="w-2/3 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <img
                src={icon_search}
                alt="search"
                onClick={handle}
                className="w-10 h-10 cursor-pointer hover:scale-105 transition-transform"
              />
            </div>
    
            {/* Weather info */}
            {weather && (
              <div>
                <img src={weather.weathers} alt="weather icon" className="w-24 h-24 mx-auto mb-4" />
                <p className="text-5xl font-bold text-blue-700 mb-2">{weather.temperature}°C</p>
                <p className="text-xl text-gray-600 mb-6">{weather.location}</p>
    
                {/* Details */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div className="flex items-center justify-center gap-2 bg-blue-50 rounded-lg p-2 shadow">
                    <img src={humidity} alt="humidity" className="w-8" />
                    <span>{weather.humidity}% Humidity</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 bg-blue-50 rounded-lg p-2 shadow">
                    <img src={wind} alt="wind" className="w-8" />
                    <span>{weather.wind} km/h Wind</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    };
    
    export default Weather;