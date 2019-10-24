const giphyRandomEndpoint = `https://api.giphy.com/v1/gifs/random?api_key=2041494ca782403cb6055682a7943c75&tag=&rating=G`;
const giphyTrendingEndpoint = `https://api.giphy.com/v1/gifs/trending?api_key=2041494ca782403cb6055682a7943c75&tag=&rating=G`;
const celebrityEndpoint = ``;
const randomButton = document.querySelector("#getRandomGiphyButton");
const trendingButton = document.querySelector("#getTrendingButton");
const body = document.querySelector("body");
const gif = document.querySelector("#giphyImageTag");
const title = document.querySelector("#giphyTitleDiv");

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
trendingButton.addEventListener("click", handleTrendingClick);
