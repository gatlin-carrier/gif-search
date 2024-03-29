const giphyRandomEndpoint = `https://api.giphy.com/v1/gifs/random?api_key=2041494ca782403cb6055682a7943c75&tag=&rating=G`;
const giphyTrendingEndpoint = `https://api.giphy.com/v1/gifs/trending?api_key=2041494ca782403cb6055682a7943c75&tag=&rating=G`;
const randomButton = document.querySelector("#getRandomGiphyButton");
const trendingButton = document.querySelector("#getTrendingButton");
const gif = document.querySelector("#giphyImageTag");
const title = document.querySelector("#giphyTitleDiv");
const trendingDiv = document.querySelector("#trending");
const searchResultsDiv = document.querySelector("#searchResults");
const randomDiv = document.querySelector("#random");
const form = document.querySelector("form");
const searchBar = document.querySelector("input");
const resultsHeader = document.querySelector(".resultsHeader");
const imagesArray = document.querySelectorAll("img");

const removeImages = (div1, div2) => {
  div1.innerHTML = "";
  div2.innerHTML = "";
};

const handleSearch = event => {
  removeImages(trendingDiv, searchResultsDiv);
  event.preventDefault();
  const searchRequest = searchBar.value;
  const giphySearchEndpoint = `https://api.giphy.com/v1/gifs/search?q=${searchRequest}&api_key=2041494ca782403cb6055682a7943c75&tag=&rating=G`;

  axios({
    url: giphySearchEndpoint,
    method: "get"
  }).then(response => {
    const searchResultsArray = response.data.data;

    returnSearchImages(searchResultsArray, searchRequest);
    form.reset();
  });
};

const returnSearchImages = (searchResultsArray, searchRequest) => {
  searchResultsArray.forEach(result => {
    let imageURL = result.images.original.url;
    let resultImage = document.createElement("img");
    resultImage.setAttribute("src", imageURL);
    resultsHeader.innerText = `${searchRequest} Search Results`;
    searchResultsDiv.append(resultImage);
  });
};

form.addEventListener("submit", handleSearch);

const handleResponse = (url, title) => {
  gif.setAttribute("src", url);
  resultsHeader.innerText = `${title}`;
  randomDiv.append(gif);
};

const handleRandomClick = () => {
  axios({
    method: "get",
    url: giphyRandomEndpoint
  }).then(response => {
    let url = response.data.data.image_url;
    let title = response.data.data.title;
    handleResponse(url, title);
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
    removeImages(trendingDiv, searchResultsDiv);
    let randomNumber = Math.floor(Math.random() * 25);
    let trendingGifURL = response.data.data[randomNumber].images.original.url;
    gif.setAttribute("src", trendingGifURL);
    trendingDiv.append(gif);
  });
};

randomButton.addEventListener("click", handleRandomClick);
// trendingButton.addEventListener("click", handleTrendingClick);

window.onload = function() {
  returnTrending();
};
