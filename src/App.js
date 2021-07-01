import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import GetData from "./GetData";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={GetData} />
    </BrowserRouter>
  );
}

export default App;
