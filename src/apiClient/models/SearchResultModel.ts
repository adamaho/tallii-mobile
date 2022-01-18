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
import {UserModel, UserModelFromJSON, UserModelFromJSONTyped, UserModelToJSON} from './UserModel';

/**
 *
 * @export
 * @interface SearchResultModel
 */
export interface SearchResultModel {
  /**
   *
   * @type {Array<UserModel>}
   * @memberof SearchResultModel
   */
  users: Array<UserModel>;
}

export function SearchResultModelFromJSON(json: any): SearchResultModel {
  return SearchResultModelFromJSONTyped(json, false);
}

export function SearchResultModelFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): SearchResultModel {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    users: (json['users'] as Array<any>).map(UserModelFromJSON),
  };
}

export function SearchResultModelToJSON(value?: SearchResultModel | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    users: (value.users as Array<any>).map(UserModelToJSON),
  };
}
