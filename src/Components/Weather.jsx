
import icon_search from '../assets/search.png';
import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png';
import { useEffect ,useState } from 'react';


const Weather = () => {
    const [weather , setWeather] = useState(false);

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
    
            console.log("Thời tiết:", weatherData);

            // https://www.youtube.com/watch?v=zs1Nq2s_uy4
            
        } catch (error) {
            
        }
    }

    useEffect(() => {
        search("Hanoi");
    }, []);

    return(
        <>
        <div className='text-center place-content-center'>
            <div className="text-3xl border-2 text-center p-4">
            <div className="search-bar flex  ">
                    <input type="text" placeholder="search" className='' />
                    <img src={icon_search} alt="" className='size-10' />
            </div>
            <div className="weather text-center place-content-center">
                 <img src={icon_search} alt="" className='' />
                 <p className='temperature'></p>
                 <p className='localtions'></p>

                 <div className='flex'>
                  <img src={humidity} alt="" className='w-20' />
                   <p>91% humidity</p>
                 </div>
                 <div className='flex'>
                  <img src={wind} alt="" className='w-20' />
                   <p>17km/h wind spedd</p>
                 </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default Weather