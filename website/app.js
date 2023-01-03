/* Global Variables */
const urlOfWeatherApi = "https://api.openweathermap.org/data/2.5/weather?zip=";
const myApiKey = "&appid=5927b07103f84379c3295daa938b6e54&units=imperial";

// Create a new date instance dynamically with JS
let theDate = new Date();
let newDate = theDate.getMonth() + 1 + "." + theDate.getDate() + "." +  theDate.getFullYear();

// the post req to send data to the server
const postDataToServer = async (url = "", data = {}) => {
  console.log("post to server is working");
  const theReceivedData = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await theReceivedData.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
//to get the weather object from the website
const getWeatherObject = async (baseURL, zip, key) => {
  console.log(" get weather data from website is working");
  const theReceivedData = await fetch(baseURL + zip + key);
  try {
    const data = await theReceivedData.json();
    return data;
  } catch (error) {
    //handle the error
    console.log("###  Error in getWeatherObject ===> ", error);
  }
};
//to update the user interface by the data we get it form the server
const updateUserInterface = async () => {
  console.log(" update User Interface is working");
  const theReceivedData = await fetch("/get_weather");
  try {
    const dataObject = await theReceivedData.json();
    document.getElementById(
      "date"
    ).innerHTML = `The Date --> ${dataObject.date}`;
    document.getElementById(
      "temp"
    ).innerHTML = `The Temperature --> ${dataObject.theTemperature} degrees Fahrenheit `;
    document.getElementById(
      "content"
    ).innerHTML = `Your Feelings --> ${dataObject.feelings}`;
  } catch (error) {
    console.log(" it is error in updateUserInterface --> " + error);
  }
};
//when the user click on the button the app make its work
document.getElementById("generate").addEventListener("click", function () {
  let theZip = document.getElementById("zip").value;
  let theFeelings = document.getElementById("feelings").value;
  //when the user dont enter data
  if (theZip.length == 0) {
    alert("## Enter the ZIP ##");
  } else if (theFeelings.length == 0) {
    alert("## Enter the Feelings ##");
  }
  //when the user enter data
  else {
    getWeatherObject(urlOfWeatherApi, theZip, myApiKey)
      .then(function (data) {
        let theAllData = {
          date: newDate,
          theTemperature: data.main.temp,
          feelings: theFeelings,
        };
        postDataToServer("/add_weather", theAllData);
      })
      .then(() => {
        updateUserInterface();
      });
  }
});
