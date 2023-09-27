import React from "react";
import useResolver from "@sirwacheski/use-resolver";

const Application: React.FC = () => {
  const request = useResolver("example", function () {
    return new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  });

  console.log(request);

  return (
    <div>
    </div>
  );
}

export default Application;