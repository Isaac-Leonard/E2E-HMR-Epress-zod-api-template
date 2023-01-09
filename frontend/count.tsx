import { Button, NumberInput } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { client } from "./api";

const getCount = () => client.provide("get", "/api/getCount", {});

const updateCount = (count: number) =>
  client.provide("post", "/api/setCount", { count });

export const Counter = () => {
  const [count, setCount] = useState<null | number>(null);
  useEffect(() => {
    getCount().then((res) =>
      res.status === "success" ? setCount(res.data.count) : null
    );
  });
  const [val, setVal] = useState<number>();
  return (
    <div>
      <div>{typeof count === "number" ? count : "loading"}</div>
      <div>
        <NumberInput value={val} onChange={(_, e) => setVal(e)} />
        <Button onClick={() => updateCount(val ?? count ?? 0)}>Update</Button>
      </div>
    </div>
  );
};
