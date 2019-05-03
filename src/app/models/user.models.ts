export interface UserDetailModel {
  _id: string;
  text: string;
  result: Array<{ [t: string]: number }>;
}
