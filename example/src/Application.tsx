import React from "react";
import useResolver, { mutate } from "../../dist/core";

const Application: React.FC = () => {
  const request = useResolver("example", function () {
    return new Promise((resolve) => {
      setTimeout(() => resolve("Hello World!"), 3000);
    });
  });

  console.log(request);

  return (
    <div>
      <button onClick={() => mutate("example", () => "Hello!")}>
        Click me
      </button>
    </div>
  );
}

export default Application;