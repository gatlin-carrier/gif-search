const giphyRandomEndpoint = `https://api.giphy.com/v1/gifs/random?api_key=2041494ca782403cb6055682a7943c75&tag=&rating=G`;
const giphyTrendingEndpoint = `https://api.giphy.com/v1/gifs/trending?api_key=2041494ca782403cb6055682a7943c75&tag=&rating=G`;
const randomButton = document.querySelector("#getRandomGiphyButton");
const trendingButton = document.querySelector("#getTrendingButton");
const body = document.querySelector("body");
const gif = document.querySelector("#giphyImageTag");
const title = document.querySelector("#giphyTitleDiv");
const trendingDiv = document.getElementById("trendingDiv");
const searchResultsDiv = document.querySelector(".searchResults");
const searchBar = document.querySelector("input");

let searchRequest = "";

const handleSearch = event => {
  const giphySearchEndpoint = `https://api.giphy.com/v1/gifs/search?q=${searchRequest}&api_key=2041494ca782403cb6055682a7943c75&tag=&rating=G`;

  console.log(event.target.value);
};

const returnSearchImages = () => {};

searchBar.addEventListener("submit", handleSearch);

const handleResponse = (url, titleText) => {
  title.innerText = titleText;
  gif.setAttribute("src", url);
  body.append(gif);
  body.append(title);
};

const handleClick = () => {
  axios({
    method: "get",
    url: giphyRandomEndpoint
  }).then(response => {
    let url = response.data.data.image_url;
    let titleText = response.data.data.title;
    handleResponse(url, titleText);
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
