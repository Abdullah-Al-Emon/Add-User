import { RouterProvider } from "react-router-dom";
// import Tabs from "./Component/Tabs/Tabs";
import { router } from "./Routes/router";


function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
