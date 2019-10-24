const giphyRandomEndpoint = `https://api.giphy.com/v1/gifs/random?api_key=2041494ca782403cb6055682a7943c75&tag=&rating=G`;
const giphyTrendingEndpoint = `https://api.giphy.com/v1/gifs/trending?api_key=2041494ca782403cb6055682a7943c75&tag=&rating=G`;
const randomButton = document.querySelector("#getRandomGiphyButton");
const trendingButton = document.querySelector("#getTrendingButton");
const body = document.querySelector("body");
const gif = document.querySelector("#giphyImageTag");
const title = document.querySelector("#giphyTitleDiv");
const trendingDiv = document.getElementById("trendingDiv");
const searchResultsDiv = document.querySelector(".searchResults");
const form = document.querySelector("form");
const searchBar = document.querySelector("input");

const handleSearch = event => {
  event.preventDefault();
  const searchRequest = searchBar.value;
  const giphySearchEndpoint = `https://api.giphy.com/v1/gifs/search?q=${searchRequest}&api_key=2041494ca782403cb6055682a7943c75&tag=&rating=G`;

  axios({
    url: giphySearchEndpoint,
    method: "get"
  }).then(response => {
    const searchResultsArray = response.data.data;
    console.log(searchResultsArray);
    returnSearchImages(searchResultsArray);
    searchBar.innerText = "";
  });
};

const returnSearchImages = searchResultsArray => {
  searchResultsArray.forEach(result => {
    console.log(result);
    let imageURL = result.images.original.url;
    let resultImage = document.createElement("img");
    resultImage.setAttribute("src", imageURL);
    searchResultsDiv.append(resultImage);
  });
};

form.addEventListener("submit", handleSearch);

const handleResponse = url => {
  gif.setAttribute("src", url);
  body.append(gif);
};

const handleClick = () => {
  axios({
    method: "get",
    url: giphyRandomEndpoint
  }).then(response => {
    let url = response.data.data.image_url;
    handleResponse(url);
  });
};

const handleTrending = trendingGifArray => {
  trendingGifArray.forEach(item => {
    let imageURL = item.images.original.url;
    let trendingImage = document.createElement("img");
    trendingImage.setAttribute("src", imageURL);
    trendingDiv.append(trendingImage);
  });
};

const returnTrending = () => {
  axios({
    method: "get",
    url: giphyTrendingEndpoint
  }).then(response => {
    let trendingGifArray = response.data.data;
    handleTrending(trendingGifArray);
  });
};

const handleTrendingClick = () => {
  axios({
    method: "get",
    url: giphyTrendingEndpoint
  }).then(response => {
    let randomNumber = Math.floor(Math.random() * 25);
    let trendingGifURL = response.data.data[randomNumber].images.original.url;
    gif.setAttribute("src", trendingGifURL);
    body.append(gif);
  });
};

randomButton.addEventListener("click", handleClick);
// trendingButton.addEventListener("click", handleTrendingClick);

window.onload = function() {
  returnTrending();
};
