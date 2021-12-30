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

import * as runtime from '../runtime';
import {
  CreateScoreboardRequestModel,
  CreateScoreboardRequestModelFromJSON,
  CreateScoreboardRequestModelToJSON,
  ErrorModel,
  ErrorModelFromJSON,
  ErrorModelToJSON,
  LoginRequestModel,
  LoginRequestModelFromJSON,
  LoginRequestModelToJSON,
  LoginSignupResponseModel,
  LoginSignupResponseModelFromJSON,
  LoginSignupResponseModelToJSON,
  ScoreboardModel,
  ScoreboardModelFromJSON,
  ScoreboardModelToJSON,
  SignupRequestModel,
  SignupRequestModelFromJSON,
  SignupRequestModelToJSON,
  TeamModel,
  TeamModelFromJSON,
  TeamModelToJSON,
  UpdateTeamRequestModel,
  UpdateTeamRequestModelFromJSON,
  UpdateTeamRequestModelToJSON,
} from '../models';

export interface CreateScoreboardRequest {
  createScoreboardRequestModel: CreateScoreboardRequestModel;
}

export interface DeleteScoreboardRequest {
  scoreboardId: number;
}

export interface GetScoreboardRequest {
  scoreboardId: number;
}

export interface GetTeamRequest {
  teamId: number;
}

export interface PostLoginRequest {
  loginRequestModel: LoginRequestModel;
}

export interface PostSignupRequest {
  signupRequestModel: SignupRequestModel;
}

export interface UpdateTeamRequest {
  teamId: number;
  updateTeamRequestModel: UpdateTeamRequestModel;
}

/**
 *
 */
export class DefaultApi extends runtime.BaseAPI {
  /**
   * creates a scoreboard
   */
  async createScoreboardRaw(
    requestParameters: CreateScoreboardRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<ScoreboardModel>> {
    if (
      requestParameters.createScoreboardRequestModel === null ||
      requestParameters.createScoreboardRequestModel === undefined
    ) {
      throw new runtime.RequiredError(
        'createScoreboardRequestModel',
        'Required parameter requestParameters.createScoreboardRequestModel was null or undefined when calling createScoreboard.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token('bearerAuth', []);

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/v1/scoreboards`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: CreateScoreboardRequestModelToJSON(requestParameters.createScoreboardRequestModel),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, jsonValue => ScoreboardModelFromJSON(jsonValue));
  }

  /**
   * creates a scoreboard
   */
  async createScoreboard(
    requestParameters: CreateScoreboardRequest,
    initOverrides?: RequestInit,
  ): Promise<ScoreboardModel> {
    const response = await this.createScoreboardRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * deletes a specific scoreboard
   */
  async deleteScoreboardRaw(
    requestParameters: DeleteScoreboardRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.scoreboardId === null || requestParameters.scoreboardId === undefined) {
      throw new runtime.RequiredError(
        'scoreboardId',
        'Required parameter requestParameters.scoreboardId was null or undefined when calling deleteScoreboard.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token('bearerAuth', []);

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/v1/scoreboards/{scoreboard_id}`.replace(
          `{${'scoreboard_id'}}`,
          encodeURIComponent(String(requestParameters.scoreboardId)),
        ),
        method: 'DELETE',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * deletes a specific scoreboard
   */
  async deleteScoreboard(
    requestParameters: DeleteScoreboardRequest,
    initOverrides?: RequestInit,
  ): Promise<void> {
    await this.deleteScoreboardRaw(requestParameters, initOverrides);
  }

  /**
   * authorizes the jwt token to make sure it hasnt expired
   */
  async getAuthorizeRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<void>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token('bearerAuth', []);

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/v1/authorize`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * authorizes the jwt token to make sure it hasnt expired
   */
  async getAuthorize(initOverrides?: RequestInit): Promise<void> {
    await this.getAuthorizeRaw(initOverrides);
  }

  /**
   * gets the scoreboards of the currently logged in user
   */
  async getMyScoreboardsRaw(
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<Array<ScoreboardModel>>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token('bearerAuth', []);

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/v1/me/scoreboards`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, jsonValue =>
      jsonValue.map(ScoreboardModelFromJSON),
    );
  }

  /**
   * gets the scoreboards of the currently logged in user
   */
  async getMyScoreboards(initOverrides?: RequestInit): Promise<Array<ScoreboardModel>> {
    const response = await this.getMyScoreboardsRaw(initOverrides);
    return await response.value();
  }

  /**
   * gets a specific scoreboard
   */
  async getScoreboardRaw(
    requestParameters: GetScoreboardRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<ScoreboardModel>> {
    if (requestParameters.scoreboardId === null || requestParameters.scoreboardId === undefined) {
      throw new runtime.RequiredError(
        'scoreboardId',
        'Required parameter requestParameters.scoreboardId was null or undefined when calling getScoreboard.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token('bearerAuth', []);

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/v1/scoreboards/{scoreboard_id}`.replace(
          `{${'scoreboard_id'}}`,
          encodeURIComponent(String(requestParameters.scoreboardId)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, jsonValue => ScoreboardModelFromJSON(jsonValue));
  }

  /**
   * gets a specific scoreboard
   */
  async getScoreboard(
    requestParameters: GetScoreboardRequest,
    initOverrides?: RequestInit,
  ): Promise<ScoreboardModel> {
    const response = await this.getScoreboardRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * gets a specific team
   */
  async getTeamRaw(
    requestParameters: GetTeamRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<TeamModel>> {
    if (requestParameters.teamId === null || requestParameters.teamId === undefined) {
      throw new runtime.RequiredError(
        'teamId',
        'Required parameter requestParameters.teamId was null or undefined when calling getTeam.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token('bearerAuth', []);

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/v1/teams/{team_id}`.replace(
          `{${'team_id'}}`,
          encodeURIComponent(String(requestParameters.teamId)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, jsonValue => TeamModelFromJSON(jsonValue));
  }

  /**
   * gets a specific team
   */
  async getTeam(
    requestParameters: GetTeamRequest,
    initOverrides?: RequestInit,
  ): Promise<TeamModel> {
    const response = await this.getTeamRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * accepts an email and password and returns an access token and the user info.
   */
  async postLoginRaw(
    requestParameters: PostLoginRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<LoginSignupResponseModel>> {
    if (
      requestParameters.loginRequestModel === null ||
      requestParameters.loginRequestModel === undefined
    ) {
      throw new runtime.RequiredError(
        'loginRequestModel',
        'Required parameter requestParameters.loginRequestModel was null or undefined when calling postLogin.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/v1/login`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: LoginRequestModelToJSON(requestParameters.loginRequestModel),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, jsonValue =>
      LoginSignupResponseModelFromJSON(jsonValue),
    );
  }

  /**
   * accepts an email and password and returns an access token and the user info.
   */
  async postLogin(
    requestParameters: PostLoginRequest,
    initOverrides?: RequestInit,
  ): Promise<LoginSignupResponseModel> {
    const response = await this.postLoginRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * accepts an email, password and username and returns an access token and the user info.
   */
  async postSignupRaw(
    requestParameters: PostSignupRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<LoginSignupResponseModel>> {
    if (
      requestParameters.signupRequestModel === null ||
      requestParameters.signupRequestModel === undefined
    ) {
      throw new runtime.RequiredError(
        'signupRequestModel',
        'Required parameter requestParameters.signupRequestModel was null or undefined when calling postSignup.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/v1/signup`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: SignupRequestModelToJSON(requestParameters.signupRequestModel),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, jsonValue =>
      LoginSignupResponseModelFromJSON(jsonValue),
    );
  }

  /**
   * accepts an email, password and username and returns an access token and the user info.
   */
  async postSignup(
    requestParameters: PostSignupRequest,
    initOverrides?: RequestInit,
  ): Promise<LoginSignupResponseModel> {
    const response = await this.postSignupRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * updates the specific team
   */
  async updateTeamRaw(
    requestParameters: UpdateTeamRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<TeamModel>> {
    if (requestParameters.teamId === null || requestParameters.teamId === undefined) {
      throw new runtime.RequiredError(
        'teamId',
        'Required parameter requestParameters.teamId was null or undefined when calling updateTeam.',
      );
    }

    if (
      requestParameters.updateTeamRequestModel === null ||
      requestParameters.updateTeamRequestModel === undefined
    ) {
      throw new runtime.RequiredError(
        'updateTeamRequestModel',
        'Required parameter requestParameters.updateTeamRequestModel was null or undefined when calling updateTeam.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token('bearerAuth', []);

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/v1/teams/{team_id}`.replace(
          `{${'team_id'}}`,
          encodeURIComponent(String(requestParameters.teamId)),
        ),
        method: 'PUT',
        headers: headerParameters,
        query: queryParameters,
        body: UpdateTeamRequestModelToJSON(requestParameters.updateTeamRequestModel),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, jsonValue => TeamModelFromJSON(jsonValue));
  }

  /**
   * updates the specific team
   */
  async updateTeam(
    requestParameters: UpdateTeamRequest,
    initOverrides?: RequestInit,
  ): Promise<TeamModel> {
    const response = await this.updateTeamRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
