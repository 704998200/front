export interface TokenStateInterface {
  // 定义类型
  bearerToken: string;
}

function state(): TokenStateInterface {
  return {
    // 字段
    bearerToken: "",
  };
}

export default state;
