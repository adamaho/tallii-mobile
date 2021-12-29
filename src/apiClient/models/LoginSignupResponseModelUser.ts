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
 * @interface LoginSignupResponseModelUser
 */
export interface LoginSignupResponseModelUser {
  /**
   *
   * @type {number}
   * @memberof LoginSignupResponseModelUser
   */
  userId: number;
  /**
   *
   * @type {string}
   * @memberof LoginSignupResponseModelUser
   */
  username: string;
  /**
   *
   * @type {string}
   * @memberof LoginSignupResponseModelUser
   */
  email: string;
  /**
   *
   * @type {Date}
   * @memberof LoginSignupResponseModelUser
   */
  createdAt: Date;
}

export function LoginSignupResponseModelUserFromJSON(json: any): LoginSignupResponseModelUser {
  return LoginSignupResponseModelUserFromJSONTyped(json, false);
}

export function LoginSignupResponseModelUserFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): LoginSignupResponseModelUser {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    userId: json['user_id'],
    username: json['username'],
    email: json['email'],
    createdAt: new Date(json['created_at']),
  };
}

export function LoginSignupResponseModelUserToJSON(
  value?: LoginSignupResponseModelUser | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    user_id: value.userId,
    username: value.username,
    email: value.email,
    created_at: value.createdAt.toISOString(),
  };
}