import StarBurst from "./starburst";
import MiteEradication from "./Mite Eradication/Index";
import styled from "styled-components";
function App() {
  return (
    <AppContainer>
      <MiteEradication />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  background: #14466b;
  height: 100vh;
`;
