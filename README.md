# tallii

an ios and android application for the tallii platform.

## todo

- implement ability to delete scoreboard
- implement +1 -1 for the score
- add privacy policy and terms and conditions

## troubleshooting

if you run into errors with hmr, run the following command

```sh
watchman watch-del-all && rm -rf node_modules/ && yarn cache clean && yarn install && yarn start -- --reset-cache
```
