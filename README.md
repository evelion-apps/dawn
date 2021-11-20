# Dawn

> A daily planner optimized for e-ink displays

Built on Next.js. Powered by Puppeteer.

Used daily on Remarkable 2.

## Setup

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

### Setup Google Calendar

Dawn supports showing calendar events. Getting data out of Google Calendar is difficult, but possible.
The high-level steps are to create a new application with access to your personal Google Calendar information:

  - Log into `developers.google.com` and create a new project:
    - https://developers.google.com/workspace/guides/create-project
  - Enable the `Google Calendar API`
  - Create credentials
    1. Credential Type
      - Select the `Google Calendar API`
      - Select `User data` to create an OAuth client
    1. OAuth Consent Screen
      - Fill out your email address
    1. Scopes
      - Search for and add `calendar.readonly`
    1. OAuth Client ID
      - Select `Desktop app`
    1. Your Credentials
      - Save `Client ID`
        - Update environmental variables
      - Download credentials
        - Save to the `./priv` directory
        - Update environmental variables with name to file:
          `priv/<YOUR CLIENT SECRET FILE NAME.json>
    1. Add your email as a test user
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

## Usage

To manually generate the PDF:

- Generate a PDF using from a command line using `$ bin/capture`
- Open the file `captures/dawn.pdf`

### Remarkable 2

To automatically generate the PDF and upload to Remarkable:

- Install the latest rMAPI binary ([juruen/rmapi](https://github.com/juruen/rmapi#binary)) to `bin/rmapi`
- From a command line run `$ bin/rm-sync`

## Acknowledgements

Dawn uses ideas and code gathered from many projects. Thank you to the following sources:

- [juruen/rmapi - rMAPI](https://github.com/juruen/rmapi#binary)
- [lelivrescolaire/React Light Calendar](https://github.com/lelivrescolaire/react-light-calendar)
- [nhn/Toast UI - React Calendar](https://github.com/nhn/toast-ui.react-calendar)
- [denniskigen/react-weather](https://github.com/denniskigen/react-weather)

## Support

Any support for the project is always appreciated!

<a href="https://www.buymeacoffee.com/chrislaskey" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="150" height="40"/></a>
