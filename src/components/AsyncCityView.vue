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

    <!-- Weather Overview -->
    <div class="flex flex-col items-center py-12 text-white">
      <h1 class="mb-2 text-4xl capitalize">
        {{ route.params.city }},
        {{ route.params.state }}
      </h1>
      <p class="text-small mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("en-GB", {
            weekday: "short",
            month: "long",
            day: "numeric",
          })
        }}
        @
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("en-GB", {
            timeStyle: "short",
          })
        }}
      </p>
      <p class="mb-8 text-8xl">
        {{ Math.round(weatherData.current.temp) }}&deg;
      </p>
      <p>Feels like {{ Math.round(weatherData.current.feels_like) }} &deg;</p>
      <p class="capitalize">{{ weatherData.current.weather[0].description }}</p>
      <img
        class="h-auto w-[150px]"
        :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        alt="Current Weather Icon"
      />
    </div>

    <hr class="w-full border-white border-opacity-10" />

    <!-- Hourly Weather -->
    <div class="w-full max-w-screen-md py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="flex flex-col items-center gap-4"
          >
            <p class="text-md whitespace-nowrap">
              {{
                new Date(hourData.currentTime).toLocaleTimeString("en-GB", {
                  hour: "numeric",
                  hour12: true,
                })
              }}
            </p>
            <img
              class="h-[50px] w-auto object-cover"
              :src="`https://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt="Weather icon"
            />
            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <hr class="w-full border-white border-opacity-10" />

    <!-- Weekly Weather -->

    <div class="w-full max-w-screen-md items-center py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">7 Day Forecast</h2>
        <div
          v-for="day in weatherData.daily"
          :key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString("en-gb", {
                weekday: "long",
              })
            }}
          </p>
          <img
            class="object-over h-[50px] w-[50px]"
            :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt="Daily Weather"
          />
          <div class="flex flex-1 justify-end gap-2">
            <p class="text-right">
              {{ Math.round(day.temp.max) }}&deg; /
              {{ Math.round(day.temp.min) }}
              &deg;
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!route.query.preview"
      @click="removeCity"
      class="flex cursor-pointer items-center gap-2 py-12 text-white duration-150 hover:text-red-500"
    >
      <font-awesome-icon icon="fa-solid fa-trash-alt" size="2x" />
      <p>Remove City</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const openWeatherApiKey = "2ae35285e980ea7eae4daaaf31f5cbbf";

const route = useRoute();
const router = useRouter();

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lon}&units=metric&appid=${openWeatherApiKey}`
    );

    // calculate the current date and time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // calculate hourly date offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });

    // add delay to simulate loading
    await new Promise((resolve) => setTimeout(resolve, 500));

    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();

const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = cities.filter((city) => city.id !== route.query.id);
  localStorage.setItem("savedCities", JSON.stringify(updatedCities));
  router.push({ name: "home" });
};
</script>
