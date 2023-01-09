type GetApiGetcountInput = {};

type GetApiGetcountResponse = {
    status: "success";
    data: {
        count: number;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type PostApiIncrementInput = {};

type PostApiIncrementResponse = {
    status: "success";
    data: {
        count: number;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type PostApiSetcountInput = {
    count: number;
};

type PostApiSetcountResponse = {
    status: "success";
    data: {
        ok: boolean;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

export type Path = "/api/getCount" | "/api/increment" | "/api/setCount";

export type Method = "get" | "post" | "put" | "delete" | "patch";

export type MethodPath = `${Method} ${Path}`;

export interface Input extends Record<MethodPath, any> {
    "get /api/getCount": GetApiGetcountInput;
    "post /api/increment": PostApiIncrementInput;
    "post /api/setCount": PostApiSetcountInput;
}

export interface Response extends Record<MethodPath, any> {
    "get /api/getCount": GetApiGetcountResponse;
    "post /api/increment": PostApiIncrementResponse;
    "post /api/setCount": PostApiSetcountResponse;
}

export const jsonEndpoints = { "get /api/getCount": true, "post /api/increment": true, "post /api/setCount": true };

export type Provider = <M extends Method, P extends Path>(method: M, path: P, params: Input[`${M} ${P}`]) => Promise<Response[`${M} ${P}`]>;

export type Implementation = (method: Method, path: string, params: Record<string, any>) => Promise<any>;

/*
export const exampleImplementation: Implementation = async (
  method,
  path,
  params
) => {
  const searchParams =
    method === "get" ? `?${new URLSearchParams(params)}` : "";
  const response = await fetch(`https://example.com${path}${searchParams}`, {
    method: method.toUpperCase(),
    headers:
      method === "get" ? undefined : { "Content-Type": "application/json" },
    body: method === "get" ? undefined : JSON.stringify(params),
  });
  if (`${method} ${path}` in jsonEndpoints) {
    return response.json();
  }
  return response.text();
};

const client = new ExpressZodAPIClient(exampleImplementation);
client.provide("get", "/v1/user/retrieve", { id: "10" });
*/
export class ExpressZodAPIClient {
    constructor(protected readonly implementation: Implementation) { }
    public readonly provide: Provider = (method, path, params) => this.implementation(method, Object.keys(params).reduce((acc, key) => acc.replace(`:${key}`, params[key]), path), Object.keys(params).reduce((acc, key) => path.indexOf(`:${key}`) >= 0 ? acc : { ...acc, [key]: params[key] }, {}));
}