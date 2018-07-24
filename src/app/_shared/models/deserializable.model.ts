
// TO-DO BILL: try to explain what this is for
export interface Deserializable<T> {
  deserialize(input: any): T;
}
