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
 * @interface UpdateTeamRequestModel
 */
export interface UpdateTeamRequestModel {
  /**
   *
   * @type {string}
   * @memberof UpdateTeamRequestModel
   */
  name?: string;
  /**
   *
   * @type {number}
   * @memberof UpdateTeamRequestModel
   */
  score?: number;
}

export function UpdateTeamRequestModelFromJSON(json: any): UpdateTeamRequestModel {
  return UpdateTeamRequestModelFromJSONTyped(json, false);
}

export function UpdateTeamRequestModelFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): UpdateTeamRequestModel {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: !exists(json, 'name') ? undefined : json['name'],
    score: !exists(json, 'score') ? undefined : json['score'],
  };
}

export function UpdateTeamRequestModelToJSON(value?: UpdateTeamRequestModel | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    score: value.score,
  };
}
