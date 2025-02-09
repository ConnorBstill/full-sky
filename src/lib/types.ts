export interface Response<T> {
  data: T;
  msg: string;
  err: boolean;
}

export interface OauthSession {
  did: string;
}