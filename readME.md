# Challenge Yourself

In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1

1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name.
   Use this API to do reverse geocoding: https://geocode.xyz/api.
   The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json.
   Use the fetch API and promises to get the data.

3. Chain a .catch method to the end of the promise chain and log errors to the console

4. Render the country and catch any errors.

# NB

    This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403.
    This is an error with the request. Remember, fetch() does NOT reject the promise in this case.
    So create an error to reject the promise yourself, with a meaningful error message.

Motivation from CompleteJS by Jonas Schmedtman 😎😎
