<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>

  <div v-if="savedCities.length === 0">
    <p class="mt-5 text-center text-lg">
      No cities saved. <br />To start tracking cities please search for them and
      add them to your favourites list.
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CityCard from "@/components/CityCard.vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const openWeatherApiKey = "2ae35285e980ea7eae4daaaf31f5cbbf";
const savedCities = ref(JSON.parse(localStorage.getItem("savedCities")) || []);

const getCities = async () => {
  const requests = [];
  savedCities.value.forEach((city) => {
    requests.push(
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lon}&units=metric&appid=${openWeatherApiKey}`
      )
    );
  });
  const weatherData = await Promise.all(requests);

  // Flicker delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  weatherData.forEach((value, index) => {
    savedCities.value[index].weather = value.data;
  });
};

await getCities();

const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: {
      state: city.state,
      city: city.city,
    },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lon: city.coords.lon,
    },
  });
};
</script>
