/* tslint:disable */
/* eslint-disable */
/**
 * Tallii Platform
 * Platform Service for tallii.io
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: adam.aho@hey.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import {exists, mapValues} from '../runtime';
/**
 *
 * @export
 * @interface CreateScoreboardRequestModelTeams
 */
export interface CreateScoreboardRequestModelTeams {
  /**
   *
   * @type {string}
   * @memberof CreateScoreboardRequestModelTeams
   */
  name: string;
}

export function CreateScoreboardRequestModelTeamsFromJSON(
  json: any,
): CreateScoreboardRequestModelTeams {
  return CreateScoreboardRequestModelTeamsFromJSONTyped(json, false);
}

export function CreateScoreboardRequestModelTeamsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CreateScoreboardRequestModelTeams {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: json['name'],
  };
}

export function CreateScoreboardRequestModelTeamsToJSON(
  value?: CreateScoreboardRequestModelTeams | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
  };
}
