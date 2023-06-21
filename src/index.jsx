import { createRoot } from 'react-dom/client';

import { MainView } from '../components/main-view/main-view';
import { MovieCard } from '../components/main-view/movie-card/movie-card';
import { MovieView } from '../components/main-view/movie-view/movie-view';

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const App = () => {
  return <MainView />;
 };

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);
