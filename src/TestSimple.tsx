import { NuamThemeWrapper, Button, Typography } from "@nuam/common-fe-lib-components";

export default function TestSimple() {
  return (
    <NuamThemeWrapper>
      <div style={{ padding: "20px" }}>
        <Typography variant="h3" color="primary">
          Test Simple - ¿Se ve esto?
        </Typography>
        <Button variant="contained" onClick={() => alert("Funciona!")}>
          Click aquí
        </Button>
      </div>
    </NuamThemeWrapper>
  );
}
