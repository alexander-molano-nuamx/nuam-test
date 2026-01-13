import { NuamThemeWrapper, Typography } from "@nuam/common-fe-lib-components";

function App() {
  return (
    <NuamThemeWrapper>
      <div style={{ padding: "20px" }}>
        <Typography variant="h3" color="primary" gutterBottom>
          NUAM Components Library
        </Typography>
        <Typography variant="body1">
          Componentes de la librería NUAM listos para usar.
        </Typography>
      </div>
    </NuamThemeWrapper>
  );
}

export default App;
