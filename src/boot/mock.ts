// eslint-disable-next-line @typescript-eslint/require-await
export default async (/* { app, router, Vue ... } */) => {
  if (process.env.NODE_ENV === "production") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment
    const { mockXHR } = require("../../mock");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    mockXHR();
  }
};
