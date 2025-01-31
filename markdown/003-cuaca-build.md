# 003: Building a weather forecast app.

It begins with a bored mind on a one fine afternoon during a holiday.

I got a crave for some coding outta nowhere (I guess after much process of elimination of which hobby I want to indulge in during this particular holiday days), and thus begin the googling process to find some simple idea that I can whip out quickly. And so, I found someone saying "weather app" and I goes "yeah, sound simple. Let's google some more". After stumble upon Malaysia's OpenAPI for weather forecast, my sight is set!

So the goal is to build a simple app of some sort - at first I was wondering if I wan't to jump back to Java and its many framework, but I stopped that thought "wait, I got a website". So that's how the technology used got determine - HTML + JavaScript. It's a good reason to update my website as well, since last time I touched it was on a year and a half ago (bar some small updates). 

So here's the list of what I've used to make this happens
- HTML
- JavaScript
- Bootstrap Icons
- Malaysia's official OpenAPI
- NPM Malaysia Postcodes

While I'm still working as a software developer at the moment, I'm using a different language and tech on my daily basis at work so this also a showcase that I could get back to other language very quickly. I might not have memorize every syntax of every language by heart, but give me that particular language's docs and I'm quite confident I can get it back together within me.

And so begins the building!

## Understanding the API

I played around with the API following the docs they have given, and found out that they using city name for the location. Since I want to do this as simple as can be (for a short project), I quickly thought maybe I could use postcode as the input to get the city name. 

Sample JSON file from the API as below:

```json
{...}
{
    "location": {
      "location_id": "Ds001",
      "location_name": "Langkawi"
    },
    "date": "2025-02-06",
    "morning_forecast": "Tiada hujan",
    "afternoon_forecast": "Tiada hujan",
    "night_forecast": "Hujan di beberapa tempat",
    "summary_forecast": "Hujan di beberapa tempat",
    "summary_when": "Malam",
    "min_temp": 25,
    "max_temp": 34
},
{...}
```

With that postcode idea in mind, it's now time to google about how I can get city name from postcode.

## Using postcode as input

I first found some websites that can look up Malaysia's postcode, but I don't want to scrape some website to get the data that I needed. Because of that, another idea came up to find some kind of API or something that I can quickly implement on my app.

And thank God someone had done that!

And not just a simple data list, they had done the entire NPM package for it! Exactly what I need right now hahaha.

So a shout out to [AsyrafHussin](https://github.com/AsyrafHussin) for your very appreciated [postcode package](https://github.com/AsyrafHussin/npm-malaysia-postcodes). His github page have every technical details on how to use his package so do go check that out.

## Start building

Now that I've got all the thing I needed, let's get coding!

To get the exact API URL call is not that difficult - we can just use our browser to hit up some URL that we wanna test and the JSON response will be displayed back. After some time tinkering about what URL I want to call for the request, testing for a bit, and I got it.

For postcode, we are using that `NPM Malaysia Postcode` package, so this is how it looks like on my usage case:

```js
malaysiaPostcodes.findPostcode("XXXXX");
...
locationExact.city;
```

We call the package using `malaysiaPostcodes`, then use the given function that they have (on my case, I just use `findPostcode()`). It gives me a result like so:

```json
{
    "found": true,
    "state": "Kelantan",
    "city": "Pasir Mas",
    "postcode": "17070",
}
```
But I just want that city value so I just get `.city` is enough.

Next, building the URL to call the weather API.

```js
var apiUrl = 'https://api.data.gov.my/weather/forecast';
...
var city = encodeURIComponent(cityName);
apiUrl += `?contains=${city}@location__location_name&limit=7&sort=date`;
```

Coz some city have more that 1 words, we need to account for the whitespace as well, because URL doesn't like space (I think). Thus, `encodeURIComponent()` will take care of that - for example, `Kuala Lumpur` will become `Kuala%20Lumpur` using that function.

To make API call, I just refer back to this [Make API call in JS](https://www.freecodecamp.org/news/make-api-calls-in-javascript/). They got a very extensive explanation there, so I'm just aabsorbing it all and use which that fits my use case. The code is already there, so no need to reinvent the wheel. And I did understood what's going on line-by-line on the code example they've given there, so that's good for me (if I don't understand it, I try to run and debug it and try to understand it first. You don't wanna put in some random code that you don't know what it doing, ok).

Other than that, all the things left is just front-end and cosmetic. My webpage already used Bootstrap so I just used that for my front-end (the visual of daily forecast, etc). For weather condition's symbol, I saw that fontawesome doesn't provide everything that I want, so I resorted to Bootstrap Icons instead . Thankfully, they got a lot of weather condition covered, even more than what I needed coz yea, Malaysian weather didn't really need much. The only problematic weather is "Jerebu/Haze", but Bootstrap Icons got something almost matched up to what I had in mind, so it's ok.

And finally, I got it all done in 2 days-ish! I think that's pretty good for doing it in a language I'm not regular.

If you're Malaysian (of course, others can too, but you need to know a Malaysian postcode), feel free to use my weather forecast app, with forecast brought to you by the government itself haha - very official indeed 😂.

[Cuaca](http://www.hilmihisham.com/cuaca.html)

I made it in Bahasa Melayu at first because the API response is in that language, but halfway while coding it, I want my code to be universally understood so I switched to English midway.

`hilmihisham - 20250131`
