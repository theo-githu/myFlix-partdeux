import { createRoot } from 'react-dom/client';

import { MainView } from "./components/main-view/main-view";
import Container from 'react-bootstrap/Container';
import { createRoot } from "react-dom/client";
import "./index.scss";

const App = () => {
  return (
    <div className="bg-main">
      <Container>
              <MainView />
      </Container>
    </div>
  )
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<App />);
