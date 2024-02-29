import React from "react";
import "./App.css";
import Router from "./components/config/Router";
import { store, persistor } from "./components/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
  
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Router />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
