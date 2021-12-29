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
 * @interface TeamModel
 */
export interface TeamModel {
  /**
   *
   * @type {number}
   * @memberof TeamModel
   */
  teamId: number;
  /**
   *
   * @type {number}
   * @memberof TeamModel
   */
  scoreboardId: number;
  /**
   *
   * @type {string}
   * @memberof TeamModel
   */
  name: string;
  /**
   *
   * @type {Date}
   * @memberof TeamModel
   */
  createdAt: Date;
}

export function TeamModelFromJSON(json: any): TeamModel {
  return TeamModelFromJSONTyped(json, false);
}

export function TeamModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): TeamModel {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    teamId: json['team_id'],
    scoreboardId: json['scoreboard_id'],
    name: json['name'],
    createdAt: new Date(json['created_at']),
  };
}

export function TeamModelToJSON(value?: TeamModel | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    team_id: value.teamId,
    scoreboard_id: value.scoreboardId,
    name: value.name,
    created_at: value.createdAt.toISOString(),
  };
}