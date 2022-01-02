# tallii

an ios and android application for the tallii platform.

## todo

- Add support for date updated for scoreboard and use that in the app instead
- add character limit to scoreboard name
- fix profile screen
- make line under score closer to text
- truncate team names everywhere, consider adding character limit as well
- edited most recent decending for scoreboards
- add max score
- loading state for each page
- add linting
- add validation on teams
- fix minus button for score when trying to go to 0
- change all buttons but the primary ones to secondary background
- add privacy policy and terms and conditions

## troubleshooting

if you run into errors with hmr, run the following command

```sh
watchman watch-del-all && rm -rf node_modules/ && yarn cache clean && yarn install && yarn start -- --reset-cache
```
