import {Configuration as PlatformConfiguration, DefaultApi as PlatformApi} from './';

// get the base path of the service to all
const getBasePath = (service: string) => {
  return `http://192.168.179.142:6000`;
  // return `https://tallii-platform-cb9d8.ondigitalocean.app`;
};

// define the config for the auth api
const getPlatformConfig = (token?: string): PlatformConfiguration => {
  return new PlatformConfiguration({
    basePath: getBasePath('api'),
    accessToken: token,
  });
};

// return the auth api with the provided config
export function getPlatformApi(token?: string) {
  const config = getPlatformConfig(token);
  return new PlatformApi(config);
}
