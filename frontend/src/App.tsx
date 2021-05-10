import { ThemeProvider } from "styled-components";
import Container from "./Components/Container";
import Header from "./Components/Header";
import theme from "./Styles/theme";
import Brand from "./Components/Brand";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Results from "./Pages/Results";
import Index from "./Pages/Index";
import Vote from "./Pages/Vote";
import Error404 from "./Pages/404";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Container>
            <Header>
              <Brand />
            </Header>
            <Switch>
              <Route exact path="/">
                <Index />
              </Route>
              <Route exact path="/poll/:id/">
                <Vote />
              </Route>
              <Route exact path="/poll/:id/results">
                <Results />
              </Route>
              <Route exact path="/error404/">
                <Error404 />
              </Route>
            </Switch>
          </Container>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
