<template>
  <!-- Banner -->
  <div class="flex flex-1 flex-col items-center">
    <div
      v-if="route.query.preview"
      class="w-full bg-weather-secondary p-4 text-center text-white"
    >
      <p>
        You are currently previewing this city. Click the "+" icon if you'd like
        to start tracking this city.
      </p>
    </div>
  </div>

  <!-- Weather Overview -->
  <div class="flex flex-col items-center py-12 text-white">
    <h1 class="mb-2 text-4xl">
      {{ route.params.city }}, {{ route.params.state }}
    </h1>
    <p class="text-small mb-12">
      {{
        new Date(weatherData.current.dt).toLocaleDateString("en-GB", {
          weekday: "short",
          month: "long",
          day: "numeric",
        })
      }}
      @
      {{
        new Date(weatherData.current.dt).toLocaleTimeString("en-GB", {
          timeStyle: "short",
        })
      }}
    </p>
    <p class="text-8xl">{{ Math.round(weatherData.current.temp) }}&deg;</p>
    <p>Feels like {{ Math.round(weatherData.current.feels_like) }} &deg;</p>
    <p class="capitalize">{{ weatherData.current.weather[0].description }}</p>
    <img
      class="h-auto w-[150px]"
      :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
      alt="Current Weather Icon"
    />
  </div>

  <hr class="w-full border border-white border-opacity-10" />

  <!-- Hourly Weather -->
  <div class="w-full max-w-screen-md py-12">
    <div class="mx-8 text-white">
      <h2 class="mb-4">Hourly Weather</h2>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

const openWeatherApiKey = "2ae35285e980ea7eae4daaaf31f5cbbf";
const route = useRoute();
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lon}&units=metric&appid=${openWeatherApiKey}`
    );

    // calculate the current date and time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.currentTime = utc + 1000 * weatherData.data.timezone_offset;

    // calculate hourly date offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();
</script>

<style scoped></style>
