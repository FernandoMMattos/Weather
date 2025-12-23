"use client";

import { useState } from "react";
import { getWeather } from "./api";

export default function Home() {
  const [place, setPlace] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!place) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getWeather(place);
      setWeather(data);
    } catch (err) {
      setError("Could not fetch");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="w-full max-w-xl mt-12 flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Weather App</h1>
        <p className="text-sm text-(--text-muted)">
          Search the weather for any place!
        </p>
        <div className="mt-6 flex gap-3 w-full">
          <input
            placeholder="City name"
            className="flex-1
              rounded-xl
              px-4
              py-3
              bg-(--bg-light)
              backdrop-blur
              border border-(--border)
              shadow-sm
              focus:outline-none
              focus:ring-2
              focus:ring-(--highlight)/50
              transition"
            onChange={(e) => setPlace(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <button
            onClick={handleSearch}
            className="
              px-6
              py-3
              rounded-xl
              bg-(--highlight)
              text-(--text)
              font-medium
              shadow-md
              hover:shadow-lg
              hover:-translate-y-0.5
              active:translate-y-0
              transition-all
              hover:cursor-pointer
            "
          >
            Search
          </button>
        </div>
      </header>

      <main className="h-full w-full items-center flex flex-col gap-2">
        {loading && (
          <p className="mt-8 text-sm text-(--text-muted) animate-pulse">
            Fetching weather...
          </p>
        )}

        {error && <p className="mt-8 text-sm text-red-500">{error}</p>}

        {weather && (
          <section
            className="
              mt-10
              w-full
              max-w-md
              rounded-2xl
              bg-(--bg-light)
              backdrop-blur-xl
              border border-(--border)
              shadow-xl
              hover:shadow-2xl
              hover:-translate-y-1
              transition-all
              p-6
            "
          >
            <h2 className="text-center text-xl font-semibold">
              {weather.location.name}
              <span className="text-sm text-(--text-muted)">
                {" "}
                • {weather.location.country}
              </span>
            </h2>

            <h3 className="text-center text-sm text-(--text-muted)">
              {weather.location.localtime}
            </h3>

            <div className="flex flex-col items-center gap-2 mt-4">
              <img
                src={weather.current.condition.icon}
                alt={weather.current.condition.text}
              />

              <p className="text-5xl font-bold mt-4">
                {weather.current.temp_c}°
                <span className="text-xl font-medium text-(--text-muted)">
                  C
                </span>
              </p>

              <p className="text-sm text-(--text-muted)">
                {weather.current.condition.text}
              </p>

              <p>Humidity: {weather.current.humidity}%</p>
              <p>Wind: {weather.current.wind_kph} km/h</p>
            </div>
          </section>
        )}
      </main>

      <footer className="mt-auto py-6 text-sm text-(--text-muted)">
        Created by{" "}
        <a
          href="https://github.com/FernandoMMattos"
          className="text-(--highlight) hover:underline"
        >
          FernandoMMattos
        </a>
      </footer>
    </>
  );
}
