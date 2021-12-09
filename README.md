# Dawn

> ### A daily planner optimized for e-ink displays

![Dawn on reMarkable 2](/docs/Dawn.jpg?raw=true "Dawn on reMarkable 2")

Dawn is a daily planner optimized for e-ink displays. It's a great way to
display important but "slow moving" information about the day.

Although it could be updated more frequently, the original goal was to build
something that could be updated once in the morning and display data that's
valuable throughout the day.

The idea of updating once in the morning is where the project got it's name "Dawn".

## Available Sections

The current release of Dawn supports the following sections:

- Monthly calendar
- Daily calendar (via Google Calendar)
- To Do (handwritten or from [Things 3](https://culturedcode.com/things/))
- Notes (handwritten)
- Weather Now (via [Open Weather Map](https://openweathermap.org/))
- Weather Forecast (via [Open Weather Map](https://openweathermap.org/))
- Quotes (via [`dwyl/quotes`](https://github.com/dwyl/quotes))

Have an idea for a new section or improvements on an existing one? Use the [Github Discussions Ideas board](https://github.com/evelion-apps/dawn/discussions/categories/ideas).

## Technical Details

Built on Next.js. Powered by Puppeteer. Styled by Tailwind CSS. Code released
under GPLv3.

## Setup

Dawn is currently developed in a environments:

- Ubuntu Budgie
- MacOS

In theory, it should work in any unix environment.

- Clone the repository locally
- Install the version of NodeJS specified in the `.tool-versions` file
- Install packages `$ bin/install`
- Start the server `$ bin/dev`
- Open a web browser `http://localhost:3000`

### Setup Section - Weather Map

- Sign up at [openweathermap.org](https://openweathermap.org) and get an API key
- Configure your settings by creating a `.env.local` file in the root of the application:

  ```
  NEXT_PUBLIC_WEATHER_UNITS='<imperial OR metric>'
  NEXT_PUBLIC_WEATHER_LOCATION='<YOUR LOCATION>'
  NEXT_PUBLIC_WEATHER_LATITUDE='<YOUR LATITUDE>'
  NEXT_PUBLIC_WEATHER_LONGITUDE='<YOUR LONGITUDE>'
  NEXT_PUBLIC_WEATHER_API_KEY='<YOUR API KEY FROM OPEN WEATHER MAP>'
  ```

  For example:

  ```
  NEXT_PUBLIC_WEATHER_UNITS='imperial'
  NEXT_PUBLIC_WEATHER_LOCATION='Boston, MA'
  NEXT_PUBLIC_WEATHER_LATITUDE='42.361145'
  NEXT_PUBLIC_WEATHER_LONGITUDE='-71.057083'
  NEXT_PUBLIC_WEATHER_API_KEY='383829595962191485923911'
  ```

### Setup Section - Google Calendar

Dawn supports showing calendar events. Getting data out of Google Calendar is difficult, but possible.

<details>
<summary>Google Calendar integration steps</summary>
<br>
The high-level steps are to create a new application with access to your personal Google Calendar information:

  - Log into `developers.google.com` and create a new project:
    - https://developers.google.com/workspace/guides/create-project
  - Enable the `Google Calendar API`
  - Create credentials
    - Credential Type
      - Select the `Google Calendar API`
      - Select `User data` to create an OAuth client
    - OAuth Consent Screen
      - Fill out your email address
    - Scopes
      - Search for and add `calendar.readonly`
    - OAuth Client ID
      - Select `Desktop app`
    - Your Credentials
      - Save `Client ID`
        - Update environmental variables
      - Download credentials
        - Save to the `./priv` directory
        - Update environmental variables with name to file:
          `priv/<YOUR CLIENT SECRET FILE NAME.json>
    - Add your email as a test user
      - Navigate to the `OAuth consent screen`
      - Click `Add Users` in the `Test users` section
      - Add your email address(es)
  - Validate Google Calendar
    - From a command line, run `$ bin/auth-google-api` and follow the OAuth2 directions. You will:
      - Be given a URL to open a web browser
      - Log into your Google Account
      - Approve your application to read your Google Calendar data
      - Press `Continue` when prompted that Google hasn't verified the app yet
      - Copy the code into the command line
</details>

## Usage

To manually generate the PDF:

- Generate a PDF using from a command line using `$ bin/capture`
- Open the file `captures/dawn.pdf`

### reMarkable 2

Dawn is built, tested, optimized, and used daily on a standard reMarkable 2.

It requires no additional software or changes to reMarkable. It can be pushed to the device through reMarkable Cloud thanks to the excellent [`juruen/rmapi`](https://github.com/juruen/rmapi) project. Or if you prefer, pushed manually over SSH.

To automatically generate the PDF and upload to reMarkable:

- Install the latest rMAPI binary ([juruen/rmapi](https://github.com/juruen/rmapi#binary)) to `bin/rmapi`
- From a command line run `$ bin/rm-sync`

## License

This project is released under the `GPLv3` license. For more license details see the included `LICENSE.md` file.

## Acknowledgements

Dawn uses ideas and code gathered from many projects. Thank you to the following sources:

- [juruen/rmapi - rMAPI](https://github.com/juruen/rmapi#binary)
- [lelivrescolaire/React Light Calendar](https://github.com/lelivrescolaire/react-light-calendar)
- [nhn/Toast UI - React Calendar](https://github.com/nhn/toast-ui.react-calendar)
- [denniskigen/react-weather](https://github.com/denniskigen/react-weather)
- [dwyl/quotes](https://github.com/dwyl/quotes)
- [evelion-apps/things-api](https://github.com/evelion-apps/things-api)

## Donations

Any support for the project is always appreciated!

<a href="https://www.buymeacoffee.com/evelion" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="150" height="40"/></a>

## Support

This project uses **GitHub Discussions**. Ask for help, request new features, or show what you've built with it!

> ### Join [GitHub Discussions](https://github.com/evelion-apps/dawn/discussions)
