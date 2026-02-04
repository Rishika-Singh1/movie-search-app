const API_KEY = "e9b04ea6";  
const resultDiv = document.getElementById("result");

async function searchMovie() {
  const movieName = document.getElementById("movieInput").value.trim();

  if (movieName === "") {
    alert("Please enter a movie name");
    return;
  }

  resultDiv.innerHTML = "Loading...";

  try {
    const response = await fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Response === "False") {
      resultDiv.innerHTML = "<p>Movie not found! Please check the spelling.</p>";
      return;
    }

    resultDiv.innerHTML = `
      <img src="${data.Poster}" alt="Poster">
      <h2>${data.Title}</h2>
      <p><b>Year:</b> ${data.Year}</p>
      <p><b>Duration:</b> ${data.Runtime}</p>
      <p><b>Genre:</b> ${data.Genre}</p>
      <p><b>IMDb Rating:</b> ${data.imdbRating}</p>
      <p><b>Plot:</b> ${data.Plot}</p>
      <p>
        <a href="https://www.imdb.com/title/${data.imdbID}" target="_blank">
          🔗 View on IMDb (Check where to watch)
        </a>
      </p>
      ${data.Website && data.Website !== "N/A" ? 
        `<p>
           <a href="${data.Website}" target="_blank">
             🌐 Official Website
           </a>
         </p>` 
        : ""
      }
    `;
  } catch (error) {
    resultDiv.innerHTML = "<p>Error fetching movie data. Please try again.</p>";
  }
}
