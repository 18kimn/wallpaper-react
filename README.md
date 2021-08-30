# An interactive, animated, query-incorporating wallpaper

This is a wallpaper I built with scraps from previous projects in an attempt to get myself excited for the upcoming school year. It's essentially a web app built with React (and create-react-app), which can be built and then used inside of Wallpaper Engine.

### Features

- Calendar: Uses the `gapi` library (loaded in a janky way as an HTML script tag) to get the schedule for the upcoming week. Gets all events in the next seven days that are on calendars 'selected' on the Google Calendar UI.
- Notes: Scratch pads for simple notetaking,
- Quotes: A leftist/communist quote, queried from [leftist-quotes.com](https://www.leftist-quotes.com). Clicking the body of the quote reloads it and gets a new quote;clicking the attribution takes you to the resource it was obtained from. See [here](https://github.com/18kimn/leftist-quotes) for the API source code.
- Background: An animated map of New Haven (specifically New Haven blocks), built with d3.js. Also tracks the mouse and pops up little watercolor-like circles.

### Setup and how-to

- Copy the repository by downloading manually or by running `git clone https://github.com/18kimn/wallpaper`
- Edit with `npm start`. Most everything you'd want to edit is `src/components`. Things have been commented fairly regularly but is probably confusing and especially so if you don't know React; contact nathan.kim@yale.edu with any questions on this part.
- Build with `npm run build`
- The build step will produce a folder labeled `build` with a file called `index.html` in it. Point Wallpaper Engine at this file.

### Debugging and general tips

- You can
