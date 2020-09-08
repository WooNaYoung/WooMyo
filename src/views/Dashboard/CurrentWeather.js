import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/WeatherIcons/css/WeatherIcons.css";
import "../../assets/css/WeatherIcons/css/WeatherIconsWind.css";

const api2 = {
  key: "d63c7d503cfb0a45ff09fe5274c4d2ea",
  base: "https://api.openweathermap.org/data/2.5/onecall",
};

const CurrentWeather = () => {
  const [data, setData] = useState(null); // 결과물 관리
  const [loading, setLoading] = useState(false); //로딩중 관리, 현재 api가 요청중인지 아닌지 알려주는 값
  const [error, setError] = useState(null); //에러 관리, 에러가 발행하면 이 상태에 에러가 담김

  let Lat = "37.4652876"; //추후 변경 예정
  let Lon = "126.900341";

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        setData(null);
        setError(null);
        setLoading(true);
        const res = await axios.get(
          `${api2.base}?lat=${Lat}&lon=${Lon}&appid=${api2.key}`
        );
        setData(res.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchDatas();
  }, []); //컴포넌트가 처음 렌더링 될 때 어떤 작업을 하겠다, 일단 비어있는 배열을 집어넣음

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return <div>data가 아닙니다</div>;
  const box = { width: "50%", float: "left" };

  console.log(data.current.weather[0].main);

  return (
    <div>
      <div style={box}>
        <h3>지역 정보</h3>
        위도 : {data.lat} <br />
        경도 : {data.lon} <br />
        지역 : {data.timezone} <br />
      </div>
      <div style={box}>
        <h3>현재날씨</h3>
        현재 온도 : {Math.round(data.current.temp - 273.15)}℃<br />
        체감온도 : {Math.round(data.current.feels_like - 273.15)}℃<br />
        습도 : {data.current.humidity}% <br />
        자외선 : {data.current.uvi} <br />
        구름 :{data.current.clouds} <br />
        바람 속도 :{data.current.wind_speed} <br />
        날씨 :{data.current.weather[0].main} <br />
        날씨 설명 :{data.current.weather[0].description} <br />
        <i
          className="wi wi-cloud"
          style={{
            fontSize: "70px",
            margin: "15px 0px 0px 50px",
            color: "#3f51b5",
          }}
        >
          {" "}
        </i>
        <br />
      </div>
    </div>
  );
};

export default CurrentWeather;
