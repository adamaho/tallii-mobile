# tallii-mobile

Currently only supporting iOS.

## Development

### Prerequisite

- React Native: [Install](https://reactnative.dev/docs/environment-setup)

### Running the app

1. Install the deps
```
yarn install
```
2. Start the dev server
```
yarn start
```
3. Start the simulator
```
yarn ios
```

### Troubleshooting

if you run into errors with hmr, run the following command

```sh
watchman watch-del-all && rm -rf node_modules/ && yarn cache clean && yarn install && yarn start -- --reset-cache
```
