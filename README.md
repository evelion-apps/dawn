# Dawn

> A daily planner optimized for e-ink displays

Built on Next.js. Powered by Puppeteer.

## Setup

- Sign up at [openweathermap.org](https://openweathermap.org) and get an API key
- Configure your settings by creating a `.env.local` file in the root of the application:

	```
	NEXT_PUBLIC_WEATHER_UNITS='<imperial OR metric>'
	NEXT_PUBLIC_WEATHER_LOCATION='<YOUR LOCATION>'
	NEXT_PUBLIC_WEATHER_API_KEY='<YOUR API KEY FROM OPEN WEATHER MAP>'
	```

	For example:

	```
	NEXT_PUBLIC_WEATHER_UNITS='imperial'
	NEXT_PUBLIC_WEATHER_LOCATION='02215'
	NEXT_PUBLIC_WEATHER_API_KEY='383829595962191485923911'
	```

## Acknowledgements

Dawn uses ideas and code gathered from many projects. Thank you to the following sources:

- [denniskigen/react-weather](https://github.com/denniskigen/react-weather)

## Support

Any support for the project is always appreciated!

<a href="https://www.buymeacoffee.com/chrislaskey" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="150" height="40"/></a>
