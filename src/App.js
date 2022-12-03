import MiteEradication from "./mite-eradication";
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
  background: #181818;
  height: 100vh;
`;
