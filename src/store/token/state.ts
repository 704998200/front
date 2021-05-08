export interface TokenStateInterface {
  bearerToken: string;
}

function state(): TokenStateInterface {
  return {
    bearerToken: "",
  };
}

export default state;
