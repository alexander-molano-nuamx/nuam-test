import { useState } from "react";
import {
  NuamThemeWrapper,
  Alert,
  Button,
  Card,
  Typography,
  TextField,
  Checkbox,
  Switch,
  DatePicker,
  DataGrid,
  Modal,
  Divider,
  Autocomplete,
  type GridColDef,
} from "@nuam/common-fe-lib-components";
import { Save, Cancel, Delete } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";

export interface SerieItemOpa {
  id: number;
  name: string;
  duration: string;
  type: string;
  color: string;
  hourlyData: {
    [hour: string]: number;
  };
}

const seriesDataOpa: SerieItemOpa[] = [
  {
    id: 1,
    name: "Serie A",
    duration: "A18 - 18 meses en ",
    type: "Tasa Fija E.A.",
    color: "#b22a09",
    hourlyData: {
      "8:00": 6200000,
      "9:00": 1350000,
      "10:00": 1500000,
      "11:00": 4680000,
      "12:00": 1850000,
      "13:00": 2000000,
      "14:00": 2180000,
      "15:00": 6350000,
      "16:00": 500000,
    },
  },
  {
    id: 2,
    name: "Serie B",
    duration: "B24 - 24 meses en ",
    type: "Tasa Fija E.A.",
    color: "#ff411c",
    hourlyData: {
      "8:00": 1500000,
      "9:00": 8700000,
      "10:00": 1900000,
      "11:00": 2100000,
      "12:00": 2300000,
      "13:00": 2500000,
      "14:00": 2700000,
      "15:00": 2900000,
      "16:00": 3100000,
    },
  },
  {
    id: 3,
    name: "Serie B",
    duration: "B72 - 72 meses en ",
    type: "IBR + Margen N.M.V.",
    color: "#ffa47f",
    hourlyData: {
      "8:00": 2000000,
      "9:00": 2250000,
      "10:00": 2500000,
      "11:00": 2750000,
      "12:00": 13000000,
      "13:00": 3250000,
      "14:00": 3500000,
      "15:00": 3750000,
      "16:00": 4000000,
    },
  },
  {
    id: 4,
    name: "Serie B",
    duration: "B96 - 96 meses en ",
    type: "Tasa Fija E.A.",
    color: "#FF8F00",
    hourlyData: {
      "8:00": 2500000,
      "9:00": 2800000,
      "10:00": 3100000,
      "11:00": 7400000,
      "12:00": 3700000,
      "13:00": 4000000,
      "14:00": 14300000,
      "15:00": 4600000,
      "16:00": 4900000,
    },
  },
  {
    id: 5,
    name: "Serie C",
    duration: "C24 - 24 meses en ",
    type: "Tasa Fija E.A.",
    color: "#3D3D3D",
    hourlyData: {
      "8:00": 3000000,
      "9:00": 4350000,
      "10:00": 6700000,
      "11:00": 2050000,
      "12:00": 5500000,
      "13:00": 2750000,
      "14:00": 8100000,
      "15:00": 5450000,
      "16:00": 9800000,
    },
  },
  {
    id: 6,
    name: "Serie C",
    duration: "B32 - 32 meses en ",
    type: "IPC + Margen E.A.",
    color: "#8F8F8F",
    hourlyData: {
      "8:00": 500000,
      "9:00": 7900000,
      "10:00": 2300000,
      "11:00": 8700000,
      "12:00": 5100000,
      "13:00": 5500000,
      "14:00": 5900000,
      "15:00": 9300000,
      "16:00": 16700000,
    },
  },
  {
    id: 7,
    name: "Serie C",
    duration: "A48 - 48 meses en ",
    type: "Tasa Fija E.A.",
    color: "#4dd0e1",
    hourlyData: {
      "8:00": 4000000,
      "9:00": 7450000,
      "10:00": 3900000,
      "11:00": 5350000,
      "12:00": 5800000,
      "13:00": 9250000,
      "14:00": 12700000,
      "15:00": 7150000,
      "16:00": 7600000,
    },
  },
];
export default function AppComplete() {
  const [textValue, setTextValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [dateValue, setDateValue] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [autocompleteValue, setAutocompleteValue] =
    useState<SerieItemOpa | null>(null);

  // Datos para DataGrid
  const dataGridColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "city", headerName: "Ciudad", width: 130 },
  ];

  const dataGridRows = [
    { id: 1, name: "Juan Pérez", email: "juan@example.com", city: "Madrid" },
    {
      id: 2,
      name: "María García",
      email: "maria@example.com",
      city: "Barcelona",
    },
    {
      id: 3,
      name: "Pedro López",
      email: "pedro@example.com",
      city: "Valencia",
    },
    { id: 4, name: "Ana Martínez", email: "ana@example.com", city: "Sevilla" },
    { id: 5, name: "Carlos Ruiz", email: "carlos@example.com", city: "Bilbao" },
  ];

  return (
    <NuamThemeWrapper>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h3" color="primary" gutterBottom>
          NUAM Component Library - Playground
        </Typography>

        {/* Alert */}
        {showAlert && (
          <Alert
            severity="info"
            onClose={() => setShowAlert(false)}
            sx={{ mb: 3 }}
          >
            Este es un playground mostrando los componentes principales de la
            librería NUAM.
          </Alert>
        )}

        {/* SECCIÓN 1: FORMULARIOS */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            1. Componentes de Formulario
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Stack spacing={3}>
            {/* TextField */}
            <Box>
              <Typography variant="h6" gutterBottom>
                TextField
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Texto simple"
                  value={textValue}
                  onChange={(value) => setTextValue(value as string)}
                  placeholder="Escribe algo..."
                  helperText="Campo de texto básico"
                />
                <TextField
                  label="Email"
                  value={emailValue}
                  onChange={(value) => setEmailValue(value as string)}
                  type="email"
                  helperText="Campo de email"
                />
                <TextField
                  label="Campo requerido"
                  required
                  error={textValue === ""}
                  helperText={
                    textValue === "" ? "Este campo es obligatorio" : "Correcto"
                  }
                />
                <TextField
                  label="Campo deshabilitado"
                  disabled
                  value="No editable"
                />
              </Stack>
            </Box>

            {/* Checkbox */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Checkbox
              </Typography>
              <Checkbox
                label="Acepto los términos y condiciones"
                checked={checkboxValue}
                onChange={(checked) => setCheckboxValue(checked)}
              />
            </Box>

            {/* Switch */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Switch
              </Typography>
              <Switch
                label="Activar notificaciones"
                checked={switchValue}
                onChange={(e) => setSwitchValue(e.target.checked)}
              />
            </Box>
            {/* Autocomplete */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Autocomplete
              </Typography>
              <Autocomplete
                showClearIndicator={true}
                options={seriesDataOpa}
                value={autocompleteValue?.id}
                onChange={(value) =>
                  setAutocompleteValue(value as SerieItemOpa | null)
                }
                label="Filtrar por Títulos Ofertados"
                labelKey="name"
                valueKey="id"
                searchKeys={["name", "duration", "type"]}
              />
              {autocompleteValue && (
                <Box
                  mt={2}
                  p={2}
                  sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
                >
                  <Typography variant="body2">
                    <strong>Seleccionado:</strong> {autocompleteValue.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Duración:</strong> {autocompleteValue.duration}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Tipo:</strong> {autocompleteValue.type}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Color:</strong>{" "}
                    <span style={{ color: autocompleteValue.color }}>●</span>{" "}
                    {autocompleteValue.color}
                  </Typography>
                </Box>
              )}
            </Box>
            {/* DatePicker */}
            <Box>
              <Typography variant="h6" gutterBottom>
                DatePicker
              </Typography>
              <DatePicker
                label="Selecciona una fecha"
                showClearIndicator={true}
                value={dateValue}
                onChange={(value) => setDateValue(value)}
              />
            </Box>
          </Stack>
        </Card>

        {/* SECCIÓN 2: BOTONES */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            2. Botones
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Button variant="contained" color="primary">
              Contained
            </Button>
            <Button variant="outlined" color="primary">
              Outlined
            </Button>
            <Button variant="text" color="primary">
              Text
            </Button>
            <Button variant="contained" color="secondary">
              Secondary
            </Button>
            <Button variant="contained" startIcon={<Save />}>
              Guardar
            </Button>
            <Button variant="outlined" startIcon={<Cancel />}>
              Cancelar
            </Button>
            <Button variant="contained" startIcon={<Delete />} color="primary">
              Eliminar
            </Button>
            <Button variant="contained" disabled>
              Disabled
            </Button>
            <Button variant="contained" size="small">
              Small
            </Button>
            <Button variant="contained" size="large">
              Large
            </Button>
          </Stack>
        </Card>

        {/* SECCIÓN 3: DATAGRID */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            3. DataGrid
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={dataGridRows}
              columns={dataGridColumns}
              pagination
              onRefresh={() => {
                console.log("Refresh clicked");
                alert("Datos actualizados");
              }}
              language="es"
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5, page: 0 },
                },
                filter: {
                  filterModel: {
                    items: [],
                    logicOperator: "and",
                  },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              enableColumnMenu={true}
              useNativeToolbar={true}
              filterMode="client"
              showToolbar={true}
            />
          </Box>
        </Card>

        {/* SECCIÓN 4: MODAL */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            4. Modal
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Button variant="contained" onClick={() => setShowModal(true)}>
            Abrir Modal
          </Button>

          <Modal
            open={showModal}
            onClose={() => setShowModal(false)}
            title="Modal de ejemplo"
            boxProps={{}}
          >
            <Box p={2}>
              <Typography gutterBottom>
                Este es un modal con contenido personalizado.
              </Typography>
              <TextField label="Campo en modal" sx={{ mt: 2, width: "100%" }} />
              <Stack direction="row" spacing={2} mt={3}>
                <Button variant="contained" onClick={() => setShowModal(false)}>
                  Aceptar
                </Button>
                <Button variant="outlined" onClick={() => setShowModal(false)}>
                  Cancelar
                </Button>
              </Stack>
            </Box>
          </Modal>
        </Card>

        {/* SECCIÓN 5: TIPOGRAFÍA */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            5. Tipografía
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Stack spacing={2}>
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
            <Typography variant="subtitle1">Subtitle 1</Typography>
            <Typography variant="subtitle2">Subtitle 2</Typography>
            <Typography variant="body1">Body 1 - Texto normal</Typography>
            <Typography variant="body2">Body 2 - Texto secundario</Typography>
            <Typography variant="caption">Caption - Texto pequeño</Typography>
            <Typography variant="overline">OVERLINE</Typography>
            <Typography color="primary">Texto primario</Typography>
            <Typography color="secondary">Texto secundario</Typography>
          </Stack>
        </Card>

        {/* SECCIÓN 6: CARDS */}
        <Card sx={{ mb: 3, p: 3 }} elevation={3}>
          <Typography variant="h5" color="primary" gutterBottom>
            6. Cards
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Stack spacing={2}>
            <Card elevation={1}>
              <Box p={2}>
                <Typography variant="h6">Card elevation 1</Typography>
                <Typography variant="body2">
                  Tarjeta con elevación mínima
                </Typography>
              </Box>
            </Card>

            <Card elevation={3}>
              <Box p={2}>
                <Typography variant="h6">Card elevation 3</Typography>
                <Typography variant="body2">
                  Tarjeta con elevación media
                </Typography>
              </Box>
            </Card>

            <Card elevation={8}>
              <Box p={2}>
                <Typography variant="h6">Card elevation 8</Typography>
                <Typography variant="body2">
                  Tarjeta con elevación alta
                </Typography>
              </Box>
            </Card>
          </Stack>
        </Card>

        {/* Footer */}
        <Alert severity="success">
          ¡Componentes principales de NUAM funcionando correctamente! 🎉
        </Alert>
      </Box>
    </NuamThemeWrapper>
  );
}
