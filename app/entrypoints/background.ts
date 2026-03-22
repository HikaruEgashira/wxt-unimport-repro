import { greet } from "my-lib";

export default defineBackground(() => {
  console.log(greet({ get: (k) => k }));
});
