import "./muiLicense"; // Inicializa la licencia MUI X antes de cualquier componente
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppComplete from "./AppComplete.tsx";
import StockDashboard from "./StockDashboard.tsx";
import { NuamThemeWrapper, Button } from "@nuam/common-fe-lib-components";
import { Box } from "@mui/material";

function App() {
  const [view, setView] = useState<"playground" | "stock">("playground");

  return (
    <NuamThemeWrapper>
      {/* Selector de vista — oculto en mobile (aparece en sidebar) */}
      <Box
        sx={{
          position: "fixed",
          top: 60,
          right: 16,
          zIndex: 9999,
          display: { xs: "none", md: "flex" },
          gap: 1,
          bgcolor: "background.paper",
          p: 1,
          borderRadius: 1,
          boxShadow: 2,
        }}
      >
        <Button
          size="small"
          variant={view === "playground" ? "contained" : "outlined"}
          onClick={() => setView("playground")}
        >
          Playground
        </Button>
        <Button
          size="small"
          variant={view === "stock" ? "contained" : "outlined"}
          onClick={() => setView("stock")}
        >
          Stock Dashboard
        </Button>
      </Box>

      {/* Contenido */}
      {view === "playground" ? (
        <AppComplete view={view} setView={setView} />
      ) : (
        <StockDashboard onBack={() => setView("playground")} />
      )}
    </NuamThemeWrapper>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
