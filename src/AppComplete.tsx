import { useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
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
  DateRangePicker,
  DateTimeRangePicker,
  TimeRangePicker,
  StaticDateRangePicker,
  SingleInputDateRangeField,
  MultiInputDateRangeField,
  DateRangeCalendar,
  SingleInputTimeRangeField,
  MultiInputTimeRangeField,
  DataGrid,
  Modal,
  Divider,
  Autocomplete,
  AppBar,
  CalendarButton,
  NotificationButton,
  LanguageButton,
  UserButton,
  SwitchThemeButton,
  type ICustomFilterOperator,
  SideBar,
  type IPage,
  DRAWER_WIDTH,
  DataGridPro,
  IsotypeName,
  DataGridProX,
  RichTreeView,
  RichTreeViewPro,
  TabsWrapper,
  TabItem,
  Select,
  LineChart,
  PieChart,
  SparkLineChart,
  BarChart,
  ScatterChart,
  Gauge,
  RadarChart,
  Heatmap,
  FunnelChart,
  SankeyChart,
  AreaChart,
  type GridRenderCellParams,
} from "@nuam/common-fe-lib-components";
import isotypeLogoSrc from "./assets/isotype.svg";

import {
  Save,
  Cancel,
  Delete,
  AdminPanelSettings,
  TrendingUp,
  Security,
  Folder,
  FolderOpen,
  InsertDriveFile,
  Image,
  Description,
  Code,
} from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import type { Location, NavigateFunction } from "react-router";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

// ✨ v1.31.0: Filtros personalizados con interfaz correcta
const customFilterOperators: ICustomFilterOperator[] = [
  { value: "contains", label: "Contiene", columnTypes: ["string"] },
  { value: ">", label: "Mayor que", columnTypes: ["number"] },
  { value: "<", label: "Menor que", columnTypes: ["number"] },
  { value: "isEmpty", label: "Está vacío" },
];

const columnsCustom: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Producto", width: 200 },
  { field: "price", headerName: "Precio", width: 150, type: "number" },
  { field: "stock", headerName: "Stock", width: 150, type: "number" },
  { field: "category", headerName: "Categoría", width: 150 },
];

const rowsCustom: Product[] = [
  { id: 1, name: "Laptop", price: 1200, stock: 15, category: "Electrónica" },
  { id: 2, name: "Mouse", price: 25, stock: 100, category: "Accesorios" },
  { id: 3, name: "Teclado", price: 80, stock: 50, category: "Accesorios" },
  { id: 4, name: "Monitor", price: 350, stock: 30, category: "Electrónica" },
  { id: 5, name: "Webcam", price: 120, stock: 45, category: "Accesorios" },
];

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

// Estructura de menú para el SideBar
const sidebarPages: IPage[] = [
  {
    name: "Administrativo",
    path: "/administrativo",
    icon: <AdminPanelSettings />,
    children: [
      {
        name: "Gestión de usuarios",
        path: "/usuarios",
      },
      {
        name: "Gestión de usuarios 2",
        path: "/usuarios-2",
      },
      {
        name: "Gestión de usuarios 3",
        path: "/usuarios-3",
      },
    ],
  },
  {
    name: "Operaciones Rentable Variable",
    path: "/operaciones",
    icon: <TrendingUp />,
    children: [
      {
        name: "Operaciones contado y repo",
        path: "/contado-repo",
      },
    ],
  },
  {
    name: "Garantías",
    path: "/garantias",
    icon: <Security />,
  },
];

const shortcutsItems = [
  {
    label: "Esta Semana",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("week"), today.endOf("week")];
    },
  },
  {
    label: "Semana Pasada",
    getValue: () => {
      const today = dayjs();
      const prevWeek = today.subtract(7, "day");
      return [prevWeek.startOf("week"), prevWeek.endOf("week")];
    },
  },
  {
    label: "Últimos 7 días",
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, "day"), today];
    },
  },
  {
    label: "Mes Actual",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("month"), today.endOf("month")];
    },
  },
  {
    label: "Próximo Mes",
    getValue: () => {
      const today = dayjs();
      const startOfNextMonth = today.endOf("month").add(1, "day");
      return [startOfNextMonth, startOfNextMonth.endOf("month")];
    },
  },
  { label: "Reestablecer", getValue: () => [null, null] },
];

export default function AppComplete() {
  const [textValue, setTextValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [dateRangeValue, setDateRangeValue] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [dateTimeRangeValue, setDateTimeRangeValue] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [timeRangeValue, setTimeRangeValue] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [staticDateRangeValue, setStaticDateRangeValue] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [singleInputDateRange, setSingleInputDateRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [multiInputDateRange, setMultiInputDateRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [dateRangeCalendarValue, setDateRangeCalendarValue] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [singleInputTimeRange, setSingleInputTimeRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [multiInputTimeRange, setMultiInputTimeRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [autocompleteValue, setAutocompleteValue] =
    useState<SerieItemOpa | null>(null);
  const [openSideBar, setOpenSideBar] = useState(true);

  // RichTreeView state
  const [treeExpandedItems, setTreeExpandedItems] = useState<string[]>([
    "documents",
    "images",
  ]);
  const [treeSelectedItems, setTreeSelectedItems] = useState<string[]>([]);

  // Master-detail panel state
  const [detailPanelTab, setDetailPanelTab] = useState(0);
  const [detailFormData, setDetailFormData] = useState({
    paisNuam: null as { value: string; label: string } | null,
    codigo: "",
    nombreCorto: "",
    nombre: "",
    tipoParticipante: null as { value: string; label: string } | null,
    paisOrigen: null as { value: string; label: string } | null,
    tipoEntidad: null as { value: string; label: string } | null,
    codigoFiscal: "",
    fechaIngreso: null as Date | null,
    estado: null as { value: string; label: string } | null,
    calidadTributaria: null as { value: string; label: string } | null,
    moneda: null as { value: string; label: string } | null,
    patrimonio: "",
    formadorMercado: false,
    direccionOficina: "",
    codigoTelefono: null as { value: string; label: string } | null,
    telefono: "",
    paginaWeb: "",
    correoElectronico: "",
  });

  // Options for detail panel selects
  const paisNuamOptions = [
    { value: "CO", label: "Colombia" },
    { value: "PE", label: "Perú" },
    { value: "CL", label: "Chile" },
  ];
  const tipoParticipanteOptions = [
    { value: "broker", label: "Broker" },
    { value: "banco", label: "Banco" },
    { value: "fondo", label: "Fondo de Inversión" },
  ];
  const paisOrigenOptions = [
    { value: "CO", label: "Colombia" },
    { value: "US", label: "Estados Unidos" },
    { value: "ES", label: "España" },
  ];
  const tipoEntidadOptions = [
    { value: "privada", label: "Privada" },
    { value: "publica", label: "Pública" },
    { value: "mixta", label: "Mixta" },
  ];
  const estadoOptions = [
    { value: "activo", label: "Activo" },
    { value: "inactivo", label: "Inactivo" },
    { value: "suspendido", label: "Suspendido" },
  ];
  const calidadTributariaOptions = [
    { value: "gran_contribuyente", label: "Gran Contribuyente" },
    { value: "regimen_comun", label: "Régimen Común" },
  ];
  const monedaOptions = [
    { value: "COP", label: "COP" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
  ];
  const codigoTelefonoOptions = [
    { value: "+57", label: "+57" },
    { value: "+1", label: "+1" },
    { value: "+34", label: "+34" },
  ];

  const handleDetailFormChange = (
    field: keyof typeof detailFormData,
    value: unknown,
  ) => {
    setDetailFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Mock de location y navigation para SideBar (sin react-router)
  const mockLocation = {
    pathname: "/administrativo/usuarios",
  } as unknown as Location;
  const mockNavigation = ((path: string) => {
    console.log("Navegando a:", path);
  }) as unknown as NavigateFunction;

  // Datos para DataGrid básico
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

  // Handlers
  const handleRefresh = () => console.log("Refrescando datos...");
  const handleDownload = () => console.log("Descargando CSV personalizado...");

  // RichTreeView data
  const treeItems = [
    {
      id: "documents",
      label: "Documentos",
      children: [
        {
          id: "doc-1",
          label: "Informe Anual 2024.pdf",
        },
        {
          id: "doc-2",
          label: "Contrato de Servicios.docx",
        },
        {
          id: "reports",
          label: "Reportes",
          children: [
            { id: "report-1", label: "Q1-2024.xlsx" },
            { id: "report-2", label: "Q2-2024.xlsx" },
            { id: "report-3", label: "Q3-2024.xlsx" },
          ],
        },
      ],
    },
    {
      id: "images",
      label: "Imágenes",
      children: [
        { id: "img-1", label: "logo.png" },
        { id: "img-2", label: "banner.jpg" },
        { id: "img-3", label: "icon.svg" },
      ],
    },
    {
      id: "source",
      label: "Código Fuente",
      children: [
        {
          id: "src-components",
          label: "components",
          children: [
            { id: "src-1", label: "Button.tsx" },
            { id: "src-2", label: "Card.tsx" },
            { id: "src-3", label: "Modal.tsx" },
          ],
        },
        {
          id: "src-utils",
          label: "utils",
          children: [
            { id: "util-1", label: "helpers.ts" },
            { id: "util-2", label: "constants.ts" },
          ],
        },
        { id: "src-main", label: "main.tsx" },
        { id: "src-app", label: "App.tsx" },
      ],
    },
  ];

  return (
    <NuamThemeWrapper>
      {/* Header Bar */}
      <AppBar
        appTitle="nuam Playground"
        toggleSidebar={() => setOpenSideBar(!openSideBar)}
        useIsotypeName={true}
        isotypeNameProps={{
          projectName: "nuam",
          logoSrc: isotypeLogoSrc,
          variant: "horizontal",
          showText: true,
        }}
        rightSideComponents={
          <>
            <CalendarButton />
            <NotificationButton onClick={() => alert("Notificaciones")} />
            <LanguageButton onClick={() => alert("Cambiar idioma")} />
            <SwitchThemeButton />
            <UserButton onClick={() => alert("Perfil de usuario")} />
          </>
        }
      />

      {/* SideBar */}
      <SideBar
        openSideBar={openSideBar}
        pages={sidebarPages}
        location={mockLocation}
        navigation={mockNavigation}
      />

      {/* Main content with top margin to avoid header overlap and left margin for sidebar */}
      <Box
        sx={{
          marginTop: "49px",
          marginLeft: openSideBar ? `${DRAWER_WIDTH}px` : 0,
          padding: 3,
          transition: "margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
        }}
      >
        <Typography variant="h4" color="primary" gutterBottom>
          nuam component library - Playground
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
                onChange={(_, checked) => setCheckboxValue(checked)}
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
                onChange={(_, checked) => setSwitchValue(checked)}
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
                sx={{ width: "40%" }}
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
                sx={{ width: "40%" }}
              />
            </Box>
            {/* DateRangePicker */}
            <Box>
              <Typography variant="h6" gutterBottom>
                DateRangePicker
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Selector de rango de fechas con botón para limpiar
              </Typography>
              <DateRangePicker
                localeText={{ start: "Fecha inicio", end: "Fecha fin" }}
                value={dateRangeValue}
                onChange={(newValue) => setDateRangeValue(newValue)}
                sx={{ width: "40%" }}
              />
              {dateRangeValue[0] && dateRangeValue[1] && (
                <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                  <Typography variant="body2">
                    <strong>Inicio:</strong>{" "}
                    {dateRangeValue[0].format("DD/MM/YYYY")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Fin:</strong>{" "}
                    {dateRangeValue[1].format("DD/MM/YYYY")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Días:</strong>{" "}
                    {dateRangeValue[1].diff(dateRangeValue[0], "day")} días
                  </Typography>
                </Box>
              )}
            </Box>
            {/* DateTimeRangePicker */}
            <Box>
              <Typography variant="h6" gutterBottom>
                DateTimeRangePicker
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Selector de rango de fecha y hora con todas las funcionalidades
              </Typography>
              <DateTimeRangePicker
                localeText={{
                  start: "Fecha/hora inicio",
                  end: "Fecha/hora fin",
                }}
                value={dateTimeRangeValue}
                onChange={(newValue) => setDateTimeRangeValue(newValue)}
                sx={{
                  width: "40%",
                }}
              />
              {dateTimeRangeValue[0] && dateTimeRangeValue[1] && (
                <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                  <Typography variant="body2">
                    <strong>Inicio:</strong>{" "}
                    {dateTimeRangeValue[0].format("DD/MM/YYYY HH:mm")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Fin:</strong>{" "}
                    {dateTimeRangeValue[1].format("DD/MM/YYYY HH:mm")}
                  </Typography>
                </Box>
              )}
            </Box>
            {/* TimeRangePicker */}
            <Box>
              <Typography variant="h6" gutterBottom>
                TimeRangePicker
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Selector de rango de horas (sin fecha)
              </Typography>
              <TimeRangePicker
                localeText={{
                  start: "Hora inicio",
                  end: "Hora fin",
                }}
                value={timeRangeValue}
                onChange={(newValue) => setTimeRangeValue(newValue)}
                sx={{ width: "40%" }}
              />
              {timeRangeValue[0] && timeRangeValue[1] && (
                <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                  <Typography variant="body2">
                    <strong>Inicio:</strong> {timeRangeValue[0].format("HH:mm")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Fin:</strong> {timeRangeValue[1].format("HH:mm")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Duración:</strong>{" "}
                    {timeRangeValue[1].diff(timeRangeValue[0], "minute")}{" "}
                    minutos
                  </Typography>
                </Box>
              )}
            </Box>
            {/* StaticDateRangePicker */}
            <Box>
              <Typography variant="h6" gutterBottom>
                StaticDateRangePicker
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Calendario estático para selección de rango de fechas (siempre
                visible)
              </Typography>
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  overflow: "hidden",
                  width: "fit-content",
                }}
              >
                <StaticDateRangePicker
                  slotProps={{
                    shortcuts: {
                      items: shortcutsItems,
                    },
                    actionBar: { actions: [] },
                  }}
                  value={staticDateRangeValue}
                  onChange={(newValue) => setStaticDateRangeValue(newValue)}
                  displayStaticWrapperAs="desktop"
                  calendars={3}
                  sx={{ width: "fit-content", padding: 1 }}
                />
              </Box>
              {staticDateRangeValue[0] && staticDateRangeValue[1] && (
                <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                  <Typography variant="body2">
                    <strong>Inicio:</strong>{" "}
                    {staticDateRangeValue[0].format("DD/MM/YYYY")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Fin:</strong>{" "}
                    {staticDateRangeValue[1].format("DD/MM/YYYY")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Días:</strong>{" "}
                    {staticDateRangeValue[1].diff(
                      staticDateRangeValue[0],
                      "day",
                    )}{" "}
                    días
                  </Typography>
                </Box>
              )}
            </Box>
            {/* SingleInputDateRangeField */}
            <Box>
              <Typography variant="h6" gutterBottom>
                SingleInputDateRangeField
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Campo de rango de fechas en un solo input (formato: fecha inicio
                - fecha fin)
              </Typography>
              <SingleInputDateRangeField
                label="Rango de fechas"
                value={singleInputDateRange}
                onChange={(newValue) => setSingleInputDateRange(newValue)}
                sx={{ width: "40%" }}
              />
              {singleInputDateRange[0] && singleInputDateRange[1] && (
                <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                  <Typography variant="body2">
                    <strong>Inicio:</strong>{" "}
                    {singleInputDateRange[0].format("DD/MM/YYYY")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Fin:</strong>{" "}
                    {singleInputDateRange[1].format("DD/MM/YYYY")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Días:</strong>{" "}
                    {singleInputDateRange[1].diff(
                      singleInputDateRange[0],
                      "day",
                    )}{" "}
                    días
                  </Typography>
                </Box>
              )}
            </Box>
            {/* MultiInputDateRangeField */}
            <Box>
              <Typography variant="h6" gutterBottom>
                MultiInputDateRangeField
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Campo de rango de fechas con inputs separados para inicio y fin
              </Typography>
              <MultiInputDateRangeField
                slotProps={{
                  textField: ({ position }) => ({
                    label: position === "start" ? "Fecha inicio" : "Fecha fin",
                  }),
                }}
                value={multiInputDateRange}
                onChange={(newValue) => setMultiInputDateRange(newValue)}
                sx={{ width: "40%" }}
              />
              {multiInputDateRange[0] && multiInputDateRange[1] && (
                <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                  <Typography variant="body2">
                    <strong>Inicio:</strong>{" "}
                    {multiInputDateRange[0].format("DD/MM/YYYY")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Fin:</strong>{" "}
                    {multiInputDateRange[1].format("DD/MM/YYYY")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Días:</strong>{" "}
                    {multiInputDateRange[1].diff(multiInputDateRange[0], "day")}{" "}
                    días
                  </Typography>
                </Box>
              )}
            </Box>
            {/* DateRangeCalendar */}
            <Box>
              <Typography variant="h6" gutterBottom>
                DateRangeCalendar
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Calendario para selección de rango de fechas (sin inputs, solo
                calendario visual)
              </Typography>
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  overflow: "hidden",
                  width: "fit-content",
                }}
              >
                <DateRangeCalendar
                  value={dateRangeCalendarValue}
                  onChange={(newValue) => setDateRangeCalendarValue(newValue)}
                  calendars={2}
                  disablePast
                />
              </Box>
              {dateRangeCalendarValue[0] && dateRangeCalendarValue[1] && (
                <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                  <Typography variant="body2">
                    <strong>Inicio:</strong>{" "}
                    {dateRangeCalendarValue[0].format("DD/MM/YYYY")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Fin:</strong>{" "}
                    {dateRangeCalendarValue[1].format("DD/MM/YYYY")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Días:</strong>{" "}
                    {dateRangeCalendarValue[1].diff(
                      dateRangeCalendarValue[0],
                      "day",
                    )}{" "}
                    días
                  </Typography>
                </Box>
              )}
            </Box>
            {/* SingleInputTimeRangeField */}
            <Box>
              <Typography variant="h6" gutterBottom>
                SingleInputTimeRangeField
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Campo de rango de horas en un solo input (formato: hora inicio -
                hora fin)
              </Typography>
              <SingleInputTimeRangeField
                label="Rango de horas"
                value={singleInputTimeRange}
                onChange={(newValue) => setSingleInputTimeRange(newValue)}
                sx={{ width: "40%" }}
              />
              {singleInputTimeRange[0] && singleInputTimeRange[1] && (
                <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                  <Typography variant="body2">
                    <strong>Inicio:</strong>{" "}
                    {singleInputTimeRange[0].format("HH:mm")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Fin:</strong>{" "}
                    {singleInputTimeRange[1].format("HH:mm")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Duración:</strong>{" "}
                    {singleInputTimeRange[1].diff(
                      singleInputTimeRange[0],
                      "minute",
                    )}{" "}
                    minutos
                  </Typography>
                </Box>
              )}
            </Box>
            {/* MultiInputTimeRangeField */}
            <Box>
              <Typography variant="h6" gutterBottom>
                MultiInputTimeRangeField
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Campo de rango de horas con inputs separados para inicio y fin
              </Typography>
              <MultiInputTimeRangeField
                slotProps={{
                  textField: ({ position }) => ({
                    label: position === "start" ? "Hora inicio" : "Hora fin",
                  }),
                }}
                value={multiInputTimeRange}
                onChange={(newValue) => setMultiInputTimeRange(newValue)}
                sx={{ width: "40%" }}
              />
              {multiInputTimeRange[0] && multiInputTimeRange[1] && (
                <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                  <Typography variant="body2">
                    <strong>Inicio:</strong>{" "}
                    {multiInputTimeRange[0].format("HH:mm")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Fin:</strong>{" "}
                    {multiInputTimeRange[1].format("HH:mm")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Duración:</strong>{" "}
                    {multiInputTimeRange[1].diff(
                      multiInputTimeRange[0],
                      "minute",
                    )}{" "}
                    minutos
                  </Typography>
                </Box>
              )}
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

        {/* SECCIÓN 3: DATAGRID BÁSICO */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            3. DataGrid Básico
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert severity="info" sx={{ mb: 2 }}>
            ✨ Pasa el cursor sobre los títulos de las columnas para ver el
            icono de menú (⋮)
          </Alert>

          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={dataGridRows}
              columns={dataGridColumns}
              pagination
              onRefresh={handleRefresh}
              language="es"
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5, page: 0 },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              disableColumnMenu={false}
              showToolbar={true}
              showDownload={true}
            />
          </Box>
        </Card>

        {/* SECCIÓN 4: DATAGRID CON FILTROS PERSONALIZADOS (v1.31.0) */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            4. DataGrid con Filtros Personalizados
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert severity="success" sx={{ mb: 2 }}>
            🆕 <strong>v1.31.0:</strong> customFilterOperators permite definir
            operadores de filtro personalizados por columna
          </Alert>

          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rowsCustom}
              columns={columnsCustom}
              onRefresh={handleRefresh}
              pagination
              language="es"
              showDownload={true}
              handleDownload={handleDownload}
              showToolbar={true}
              disableColumnMenu={true}
              customFilterOperators={customFilterOperators} // ✨ NUEVO
              addMenuItems={[
                {
                  text: "Exportar a Excel",
                  onClick: () => console.log("Exportar Excel"),
                },
              ]}
            />
          </Box>
        </Card>

        {/* SECCIÓN 5: DATAGRID PRO (v1.33.0) */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            5. DataGridPro - Funcionalidades Avanzadas
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert severity="success" sx={{ mb: 2 }}>
            🆕 <strong>v1.33.0:</strong> DataGridPro con licencia MUI X
            integrada, incluye todas las características Pro
          </Alert>

          <Box sx={{ height: 500, width: "100%" }}>
            <DataGridPro
              rows={[
                {
                  id: 1,
                  name: "Juan Pérez",
                  email: "juan@example.com",
                  role: "Admin",
                  age: 32,
                  active: true,
                  department: "IT",
                },
                {
                  id: 2,
                  name: "María García",
                  email: "maria@example.com",
                  role: "Usuario",
                  age: 28,
                  active: true,
                  department: "Ventas",
                },
                {
                  id: 3,
                  name: "Pedro López",
                  email: "pedro@example.com",
                  role: "Editor",
                  age: 35,
                  active: false,
                  department: "Marketing",
                },
                {
                  id: 4,
                  name: "Ana Martínez",
                  email: "ana@example.com",
                  role: "Usuario",
                  age: 26,
                  active: true,
                  department: "IT",
                },
                {
                  id: 5,
                  name: "Carlos Rodríguez",
                  email: "carlos@example.com",
                  role: "Admin",
                  age: 40,
                  active: true,
                  department: "Finanzas",
                },
                {
                  id: 6,
                  name: "Laura Sánchez",
                  email: "laura@example.com",
                  role: "Editor",
                  age: 31,
                  active: true,
                  department: "IT",
                },
                {
                  id: 7,
                  name: "Miguel Torres",
                  email: "miguel@example.com",
                  role: "Usuario",
                  age: 29,
                  active: false,
                  department: "Ventas",
                },
                {
                  id: 8,
                  name: "Sofía Ramírez",
                  email: "sofia@example.com",
                  role: "Editor",
                  age: 27,
                  active: true,
                  department: "Marketing",
                },
                {
                  id: 9,
                  name: "Diego Fernández",
                  email: "diego@example.com",
                  role: "Admin",
                  age: 38,
                  active: true,
                  department: "IT",
                },
                {
                  id: 10,
                  name: "Carmen Ruiz",
                  email: "carmen@example.com",
                  role: "Usuario",
                  age: 30,
                  active: true,
                  department: "Ventas",
                },
              ]}
              columns={[
                { field: "id", headerName: "ID", width: 70, type: "number" },
                { field: "name", headerName: "Nombre", width: 180 },
                { field: "email", headerName: "Email", width: 220 },
                { field: "role", headerName: "Rol", width: 120 },
                { field: "age", headerName: "Edad", width: 90, type: "number" },
                { field: "department", headerName: "Departamento", width: 150 },
                {
                  field: "active",
                  headerName: "Activo",
                  width: 100,
                  type: "boolean",
                },
              ]}
              pagination
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5, page: 0 },
                },
              }}
              rowReordering
              pageSizeOptions={[5, 10, 25]}
              disableColumnMenu={false}
              showToolbar={true}
              language="es"
              onRefresh={handleRefresh}
              showDownload={true}
              handleDownload={handleDownload}
              checkboxSelection
              customFilterOperators={customFilterOperators}
              addMenuItems={[
                {
                  text: "Exportar a Excel",
                  onClick: () => console.log("Exportar Excel Pro"),
                },
                {
                  text: "Configuración avanzada",
                  onClick: () => console.log("Configuración Pro"),
                },
              ]}
            />
          </Box>
          <Alert severity="info" sx={{ mt: 2 }}>
            💡 DataGridProX incluye: Column Pinning, Row Grouping, Tree Data,
            Excel Export y más características avanzadas de MUI X Pro
          </Alert>
        </Card>
        {/* SECCIÓN 6: DATAGRID PRO-X con Master-Detail */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            6. DataGridProX - Master-Detail Panel
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert severity="success" sx={{ mb: 2 }}>
            🆕 <strong>Master-Detail:</strong> Haz clic en el icono (+) de una
            fila para expandir el panel de detalle con formulario completo
          </Alert>

          <Box sx={{ width: "100%" }}>
            <DataGridProX
              rows={[
                {
                  id: 1,
                  name: "Juan Pérez",
                  email: "juan@example.com",
                  role: "Admin",
                  age: 32,
                  active: true,
                  department: "IT",
                },
                {
                  id: 2,
                  name: "María García",
                  email: "maria@example.com",
                  role: "Usuario",
                  age: 28,
                  active: true,
                  department: "Ventas",
                },
                {
                  id: 3,
                  name: "Pedro López",
                  email: "pedro@example.com",
                  role: "Editor",
                  age: 35,
                  active: false,
                  department: "Marketing",
                },
              ]}
              columns={[
                { field: "id", headerName: "ID", width: 70, type: "number" },
                { field: "name", headerName: "Nombre", width: 180 },
                { field: "email", headerName: "Email", width: 220 },
                { field: "role", headerName: "Rol", width: 120 },
                { field: "age", headerName: "Edad", width: 90, type: "number" },
                { field: "department", headerName: "Departamento", width: 150 },
                {
                  field: "active",
                  headerName: "Activo",
                  width: 100,
                  type: "boolean",
                },
              ]}
              getDetailPanelHeight={() => 600}
              getDetailPanelContent={(params) => (
                <Box sx={{ p: 3, bgcolor: "background.paper" }}>
                  {/* Header */}
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 400 }}>
                      Editar Participante: {params.row.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Los campos marcados con{" "}
                      <span style={{ color: "red" }}>*</span> son obligatorios
                    </Typography>
                  </Box>

                  {/* Tabs */}
                  <TabsWrapper
                    currentTab={detailPanelTab}
                    setCurrentTab={setDetailPanelTab}
                  >
                    <TabItem id={0} title="GENERAL">
                      <Box sx={{ pt: 3 }}>
                        {/* Información Básica */}
                        <Box sx={{ mb: 3 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ mb: 2, fontWeight: 600 }}
                          >
                            Información Básica
                          </Typography>

                          {/* Grid 3 columnas x 4 filas */}
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "repeat(3, 1fr)",
                              gap: 2,
                            }}
                          >
                            {/* Fila 1: País nuam, CO Código, Nombre Corto */}
                            <Select
                              label="País nuam"
                              value={detailFormData.paisNuam}
                              onChange={(value) =>
                                handleDetailFormChange("paisNuam", value)
                              }
                              options={paisNuamOptions}
                              size="small"
                              fullWidth
                              showClearIndicator
                              formControlProps={{ fullWidth: true }}
                            />
                            <TextField
                              label="CO Código *"
                              value={detailFormData.codigo || params.row.id}
                              onChange={(value) =>
                                handleDetailFormChange("codigo", value)
                              }
                              size="small"
                              fullWidth
                            />
                            <TextField
                              label="Nombre Corto *"
                              value={
                                detailFormData.nombreCorto ||
                                params.row.name.split(" ")[0]
                              }
                              onChange={(value) =>
                                handleDetailFormChange("nombreCorto", value)
                              }
                              size="small"
                              fullWidth
                            />

                            {/* Fila 2: Nombre, Tipo de Participante, País de Origen */}
                            <TextField
                              label="Nombre *"
                              value={detailFormData.nombre || params.row.name}
                              onChange={(value) =>
                                handleDetailFormChange("nombre", value)
                              }
                              size="small"
                              fullWidth
                            />
                            <Box sx={{ width: "100%" }}>
                              <Select
                                label="Tipo de Participante *"
                                value={detailFormData.tipoParticipante}
                                onChange={(value) =>
                                  handleDetailFormChange(
                                    "tipoParticipante",
                                    value,
                                  )
                                }
                                options={tipoParticipanteOptions}
                                size="small"
                                fullWidth
                                showClearIndicator
                                formControlProps={{ fullWidth: true }}
                              />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ mt: 0.5, ml: 1, display: "block" }}
                              >
                                Máximo 5 opciones
                              </Typography>
                            </Box>
                            <Select
                              label="País de Origen *"
                              value={detailFormData.paisOrigen}
                              onChange={(value) =>
                                handleDetailFormChange("paisOrigen", value)
                              }
                              options={paisOrigenOptions}
                              size="small"
                              fullWidth
                              showClearIndicator
                              formControlProps={{ fullWidth: true }}
                            />

                            {/* Fila 3: Tipo de Entidad, Código Fiscal, Fecha de Ingreso */}
                            <Select
                              label="Tipo de Entidad *"
                              value={detailFormData.tipoEntidad}
                              onChange={(value) =>
                                handleDetailFormChange("tipoEntidad", value)
                              }
                              options={tipoEntidadOptions}
                              size="small"
                              fullWidth
                              showClearIndicator
                              formControlProps={{ fullWidth: true }}
                            />
                            <TextField
                              label="Código Fiscal *"
                              value={detailFormData.codigoFiscal}
                              onChange={(value) =>
                                handleDetailFormChange("codigoFiscal", value)
                              }
                              size="small"
                              fullWidth
                            />
                            <DatePicker
                              label="Fecha de Ingreso *"
                              value={detailFormData.fechaIngreso}
                              onChange={(value) =>
                                handleDetailFormChange("fechaIngreso", value)
                              }
                              slotProps={{
                                textField: { size: "small", fullWidth: true },
                              }}
                              showClearIndicator
                            />

                            {/* Fila 4: Estado */}
                            <Select
                              label="Estado *"
                              value={detailFormData.estado}
                              onChange={(value) =>
                                handleDetailFormChange("estado", value)
                              }
                              options={estadoOptions}
                              size="small"
                              fullWidth
                              showClearIndicator
                              formControlProps={{ fullWidth: true }}
                            />
                          </Box>
                        </Box>

                        {/* Financiero */}
                        <Typography
                          variant="subtitle1"
                          sx={{ mb: 2, fontWeight: 600 }}
                        >
                          Financiero
                        </Typography>

                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 3,
                            mb: 3,
                            alignItems: "start",
                          }}
                        >
                          {/* Calidad Tributaria */}
                          <Box sx={{ width: "100%" }}>
                            <Select
                              label="Calidad Tributaria *"
                              value={detailFormData.calidadTributaria}
                              onChange={(value) =>
                                handleDetailFormChange(
                                  "calidadTributaria",
                                  value,
                                )
                              }
                              options={calidadTributariaOptions}
                              size="small"
                              fullWidth
                              showClearIndicator
                              formControlProps={{ fullWidth: true }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ mt: 0.5, ml: 1, display: "block" }}
                            >
                              Máximo 2 opciones
                            </Typography>
                          </Box>

                          {/* Patrimonio (Moneda + Valor) */}
                          <Box
                            sx={{
                              position: "relative",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                position: "absolute",
                                top: -8,
                                left: 12,
                                bgcolor: "background.paper",
                                px: 0.5,
                                color: "text.secondary",
                                fontSize: "0.75rem",
                                zIndex: 1,
                              }}
                            >
                              Patrimonio *
                            </Typography>
                            <Select
                              value={detailFormData.moneda}
                              onChange={(value) =>
                                handleDetailFormChange("moneda", value)
                              }
                              options={monedaOptions}
                              size="small"
                              sx={{
                                minWidth: 80,
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderRight: "none",
                                  borderTopRightRadius: 0,
                                  borderBottomRightRadius: 0,
                                },
                                "& .MuiSelect-select": {
                                  pr: "24px !important",
                                },
                              }}
                            />
                            <TextField
                              value={detailFormData.patrimonio}
                              onChange={(value) =>
                                handleDetailFormChange("patrimonio", value)
                              }
                              placeholder="$ 0"
                              size="small"
                              sx={{
                                flex: 1,
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderLeft: "none",
                                  borderTopLeftRadius: 0,
                                  borderBottomLeftRadius: 0,
                                },
                              }}
                            />
                          </Box>

                          {/* Formador de Mercado */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              height: 40,
                            }}
                          >
                            <Switch
                              label="Formador de Mercado"
                              checked={detailFormData.formadorMercado}
                              onChange={(e) =>
                                handleDetailFormChange(
                                  "formadorMercado",
                                  e.target.checked,
                                )
                              }
                            />
                          </Box>
                        </Box>

                        {/* Contacto */}
                        <Typography
                          variant="subtitle1"
                          sx={{ mb: 2, fontWeight: 600 }}
                        >
                          Contacto
                        </Typography>

                        {/* Fila 1 Contacto */}
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 3,
                            mb: 2,
                          }}
                        >
                          <TextField
                            label="Dirección Oficina Principal *"
                            value={detailFormData.direccionOficina}
                            onChange={(value) =>
                              handleDetailFormChange("direccionOficina", value)
                            }
                            size="small"
                            fullWidth
                          />
                          <Box
                            sx={{
                              position: "relative",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                position: "absolute",
                                top: -8,
                                left: 12,
                                bgcolor: "background.paper",
                                px: 0.5,
                                color: "text.secondary",
                                fontSize: "0.75rem",
                                zIndex: 1,
                              }}
                            >
                              Teléfono *
                            </Typography>
                            <Select
                              value={detailFormData.codigoTelefono}
                              onChange={(value) =>
                                handleDetailFormChange("codigoTelefono", value)
                              }
                              options={codigoTelefonoOptions}
                              size="small"
                              sx={{
                                minWidth: 80,
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderRight: "none",
                                  borderTopRightRadius: 0,
                                  borderBottomRightRadius: 0,
                                },
                                "& .MuiSelect-select": {
                                  pr: "24px !important",
                                },
                              }}
                            />
                            <TextField
                              value={detailFormData.telefono}
                              onChange={(value: string) =>
                                handleDetailFormChange("telefono", value)
                              }
                              placeholder="000 000 0000"
                              size="small"
                              sx={{
                                flex: 1,
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderLeft: "none",
                                  borderTopLeftRadius: 0,
                                  borderBottomLeftRadius: 0,
                                },
                              }}
                            />
                          </Box>
                          <Box />
                        </Box>

                        {/* Fila 2 Contacto */}
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 3,
                            mb: 3,
                          }}
                        >
                          <TextField
                            label="Página web"
                            value={detailFormData.paginaWeb}
                            onChange={(value: string) =>
                              handleDetailFormChange("paginaWeb", value)
                            }
                            size="small"
                            fullWidth
                          />
                          <TextField
                            label="Correo Electrónico"
                            value={
                              detailFormData.correoElectronico ||
                              params.row.email
                            }
                            onChange={(value: string) =>
                              handleDetailFormChange("correoElectronico", value)
                            }
                            size="small"
                            fullWidth
                          />
                          <Box />
                        </Box>
                      </Box>
                    </TabItem>

                    <TabItem id={1} title="EQUIVALENCIAS">
                      <Box sx={{ pt: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          Configuración de equivalencias del participante.
                        </Typography>
                        <Box
                          sx={{
                            mt: 2,
                            p: 3,
                            bgcolor: "#f5f5f5",
                            borderRadius: 1,
                          }}
                        >
                          <Typography variant="body1">
                            Aquí se configuran las equivalencias de códigos
                            entre diferentes sistemas para el participante{" "}
                            <strong>{params.row.name}</strong>.
                          </Typography>
                        </Box>
                      </Box>
                    </TabItem>

                    <TabItem id={2} title="CONVENIOS">
                      <Box sx={{ pt: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          Configuración de convenios del participante.
                        </Typography>
                        <Box
                          sx={{
                            mt: 2,
                            p: 3,
                            bgcolor: "#f5f5f5",
                            borderRadius: 1,
                          }}
                        >
                          <Typography variant="body1">
                            Listado de convenios activos para{" "}
                            <strong>{params.row.name}</strong> del departamento{" "}
                            <strong>{params.row.department}</strong>.
                          </Typography>
                        </Box>
                      </Box>
                    </TabItem>
                  </TabsWrapper>

                  {/* Botones de acción */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 2,
                      mt: 3,
                    }}
                  >
                    <Button variant="outlined">CANCELAR</Button>
                    <Button
                      variant="contained"
                      onClick={() =>
                        console.log("Guardando:", params.row, detailFormData)
                      }
                    >
                      GUARDAR
                    </Button>
                  </Box>
                </Box>
              )}
              pagination
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5, page: 0 },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
            />
          </Box>
          <Alert severity="info" sx={{ mt: 2 }}>
            💡 <strong>Master-Detail:</strong> Expande una fila para ver el
            formulario completo con tabs (General, Equivalencias, Convenios)
          </Alert>
        </Card>

        {/* SECCIÓN 7: DATA GRID HEADER FILTERS */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            7. DataGridProX - Header Filters
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert severity="success" sx={{ mb: 2 }}>
            Filtros directamente en los encabezados de columna para filtrado
            rápido e intuitivo. Soporta filtros de texto, numéricos, selección y
            fechas.
          </Alert>

          <Box sx={{ height: 500, width: "100%" }}>
            <DataGridProX
              rows={[
                {
                  id: 1,
                  producto: "Laptop Dell XPS",
                  categoria: "Electrónica",
                  precio: 1299.99,
                  stock: 25,
                  estado: "Activo",
                  fechaIngreso: "2024-01-15",
                },
                {
                  id: 2,
                  producto: "Mouse Logitech MX",
                  categoria: "Accesorios",
                  precio: 89.99,
                  stock: 150,
                  estado: "Activo",
                  fechaIngreso: "2024-02-20",
                },
                {
                  id: 3,
                  producto: "Teclado Mecánico",
                  categoria: "Accesorios",
                  precio: 149.99,
                  stock: 75,
                  estado: "Activo",
                  fechaIngreso: "2024-01-28",
                },
                {
                  id: 4,
                  producto: "Monitor Samsung 27",
                  categoria: "Electrónica",
                  precio: 399.99,
                  stock: 40,
                  estado: "Inactivo",
                  fechaIngreso: "2023-12-10",
                },
                {
                  id: 5,
                  producto: "Webcam HD Pro",
                  categoria: "Accesorios",
                  precio: 79.99,
                  stock: 200,
                  estado: "Activo",
                  fechaIngreso: "2024-03-05",
                },
                {
                  id: 6,
                  producto: "SSD NVMe 1TB",
                  categoria: "Almacenamiento",
                  precio: 129.99,
                  stock: 80,
                  estado: "Activo",
                  fechaIngreso: "2024-02-14",
                },
                {
                  id: 7,
                  producto: "RAM DDR5 32GB",
                  categoria: "Componentes",
                  precio: 189.99,
                  stock: 60,
                  estado: "Activo",
                  fechaIngreso: "2024-01-22",
                },
                {
                  id: 8,
                  producto: "Tarjeta Gráfica RTX",
                  categoria: "Componentes",
                  precio: 699.99,
                  stock: 15,
                  estado: "Bajo Stock",
                  fechaIngreso: "2024-03-01",
                },
                {
                  id: 9,
                  producto: "Auriculares Gaming",
                  categoria: "Accesorios",
                  precio: 129.99,
                  stock: 90,
                  estado: "Activo",
                  fechaIngreso: "2024-02-28",
                },
                {
                  id: 10,
                  producto: "Cable HDMI 2.1",
                  categoria: "Accesorios",
                  precio: 24.99,
                  stock: 500,
                  estado: "Activo",
                  fechaIngreso: "2024-01-05",
                },
                {
                  id: 11,
                  producto: "Tablet Android",
                  categoria: "Electrónica",
                  precio: 349.99,
                  stock: 35,
                  estado: "Activo",
                  fechaIngreso: "2024-03-10",
                },
                {
                  id: 12,
                  producto: "Impresora Laser",
                  categoria: "Oficina",
                  precio: 299.99,
                  stock: 20,
                  estado: "Inactivo",
                  fechaIngreso: "2023-11-15",
                },
              ]}
              columns={[
                {
                  field: "id",
                  headerName: "ID",
                  width: 80,
                  type: "number",
                },
                {
                  field: "producto",
                  headerName: "Producto",
                  width: 200,
                  type: "string",
                },
                {
                  field: "categoria",
                  headerName: "Categoría",
                  width: 150,
                  type: "singleSelect",
                  valueOptions: [
                    "Electrónica",
                    "Accesorios",
                    "Almacenamiento",
                    "Componentes",
                    "Oficina",
                  ],
                },
                {
                  field: "precio",
                  headerName: "Precio",
                  width: 120,
                  type: "number",
                  valueFormatter: (value: number) => `$${value?.toFixed(2)}`,
                },
                {
                  field: "stock",
                  headerName: "Stock",
                  width: 100,
                  type: "number",
                },
                {
                  field: "estado",
                  headerName: "Estado",
                  width: 130,
                  type: "singleSelect",
                  valueOptions: ["Activo", "Inactivo", "Bajo Stock"],
                  renderCell: (params: GridRenderCellParams) => (
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor:
                          params.value === "Activo"
                            ? "success.light"
                            : params.value === "Inactivo"
                              ? "error.light"
                              : "warning.light",
                        color:
                          params.value === "Activo"
                            ? "success.dark"
                            : params.value === "Inactivo"
                              ? "error.dark"
                              : "warning.dark",
                        fontWeight: 500,
                        fontSize: "0.75rem",
                      }}
                    >
                      {params.value}
                    </Box>
                  ),
                },
                {
                  field: "fechaIngreso",
                  headerName: "Fecha Ingreso",
                  width: 140,
                  type: "date",
                  valueGetter: (value: string) => new Date(value),
                  valueFormatter: (value: Date) =>
                    value?.toLocaleDateString("es-CO"),
                },
              ]}
              headerFilters
              slotProps={{
                headerFilterCell: {
                  showClearIcon: true,
                },
              }}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10, page: 0 },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              disableRowSelectionOnClick
            />
          </Box>

          <Alert severity="info" sx={{ mt: 2 }}>
            💡 <strong>Header Filters:</strong> Usa la prop{" "}
            <code>headerFilters</code> para habilitar filtros en los
            encabezados. Los tipos de columna (<code>string</code>,{" "}
            <code>number</code>, <code>singleSelect</code>, <code>date</code>)
            determinan el tipo de filtro mostrado.
          </Alert>
        </Card>

        {/* SECCIÓN 8: MODAL */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            6. Modal
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

        {/* SECCIÓN 7: TIPOGRAFÍA */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            7. Tipografía
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

        {/* SECCIÓN 8: CARDS */}
        <Card sx={{ mb: 3, p: 3 }} elevation={3}>
          <Typography variant="h5" color="primary" gutterBottom>
            8. Cards
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

        {/* SECCIÓN 9: ISOTYPE NAME */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            9. IsotypeName Component
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert severity="success" sx={{ mb: 2 }}>
            Componente para mostrar el isotipo (logo) + nombre del proyecto con
            borde estilizado
          </Alert>

          <Stack spacing={4}>
            {/* Con logo + texto */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Logo + Texto (showText: true)
              </Typography>
              <Stack direction="row" spacing={4} alignItems="center">
                <Box>
                  <Typography variant="caption" display="block" mb={1}>
                    Size: sm
                  </Typography>
                  <IsotypeName
                    projectName="nuam"
                    logoSrc={isotypeLogoSrc}
                    size="sm"
                    showText={true}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" display="block" mb={1}>
                    Size: md
                  </Typography>
                  <IsotypeName
                    projectName="nuam"
                    logoSrc={isotypeLogoSrc}
                    size="md"
                    showText={true}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" display="block" mb={1}>
                    Size: lg
                  </Typography>
                  <IsotypeName
                    projectName="nuam"
                    logoSrc={isotypeLogoSrc}
                    size="lg"
                    showText={true}
                  />
                </Box>
              </Stack>
            </Box>

            {/* Solo logo (showText: false) */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Solo Logo (showText: false)
              </Typography>
              <Stack direction="row" spacing={4} alignItems="center">
                <Box>
                  <Typography variant="caption" display="block" mb={1}>
                    Size: sm
                  </Typography>
                  <IsotypeName
                    projectName="nuam"
                    logoSrc={isotypeLogoSrc}
                    size="sm"
                    showText={false}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" display="block" mb={1}>
                    Size: md
                  </Typography>
                  <IsotypeName
                    projectName="nuam"
                    logoSrc={isotypeLogoSrc}
                    size="md"
                    showText={false}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" display="block" mb={1}>
                    Size: lg
                  </Typography>
                  <IsotypeName
                    projectName="nuam"
                    logoSrc={isotypeLogoSrc}
                    size="lg"
                    showText={false}
                  />
                </Box>
              </Stack>
            </Box>

            {/* Solo texto (sin logo) */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Solo Texto (sin logoSrc)
              </Typography>
              <Stack direction="row" spacing={4} alignItems="center">
                <Box>
                  <Typography variant="caption" display="block" mb={1}>
                    Size: sm
                  </Typography>
                  <IsotypeName projectName="nuam" size="sm" />
                </Box>
                <Box>
                  <Typography variant="caption" display="block" mb={1}>
                    Size: md
                  </Typography>
                  <IsotypeName projectName="nuam" size="md" />
                </Box>
                <Box>
                  <Typography variant="caption" display="block" mb={1}>
                    Size: lg
                  </Typography>
                  <IsotypeName projectName="nuam" size="lg" />
                </Box>
              </Stack>
            </Box>

            {/* Variantes de layout */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Variantes
              </Typography>
              <Stack direction="row" spacing={4} alignItems="center">
                <Box>
                  <Typography variant="caption" display="block" mb={1}>
                    horizontal
                  </Typography>
                  <IsotypeName
                    projectName="nuam"
                    logoSrc={isotypeLogoSrc}
                    variant="horizontal"
                    size="sm"
                    showText={true}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" display="block" mb={1}>
                    vertical
                  </Typography>
                  <IsotypeName
                    projectName="nuam"
                    logoSrc={isotypeLogoSrc}
                    variant="vertical"
                    size="sm"
                    showText={true}
                  />
                </Box>
              </Stack>
            </Box>

            {/* Dark variant */}
            <Box
              sx={{
                backgroundColor: "#1a1a1a",
                p: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
                Dark Variant
              </Typography>
              <Stack direction="row" spacing={4} alignItems="center">
                <IsotypeName
                  projectName="nuam"
                  logoSrc={isotypeLogoSrc}
                  variant="dark"
                  size="sm"
                  showText={true}
                />
                <IsotypeName
                  projectName="nuam"
                  logoSrc={isotypeLogoSrc}
                  variant="dark"
                  size="md"
                  showText={true}
                />
              </Stack>
            </Box>
          </Stack>
        </Card>

        {/* SECCIÓN 10: RICH TREE VIEW */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            10. RichTreeView
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert severity="success" sx={{ mb: 2 }}>
            Componente de árbol jerárquico con expansión, selección múltiple e
            iconos personalizados
          </Alert>

          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            {/* TreeView básico */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Árbol con selección múltiple
              </Typography>
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  p: 2,
                  minHeight: 300,
                }}
              >
                <RichTreeView
                  items={treeItems}
                  expandedItems={treeExpandedItems}
                  onExpandedItemsChange={(_: React.SyntheticEvent | null, itemIds: string[]) =>
                    setTreeExpandedItems(itemIds)
                  }
                  selectedItems={treeSelectedItems}
                  onSelectedItemsChange={(_: React.SyntheticEvent | null, itemIds: string | string[] | null) =>
                    setTreeSelectedItems(Array.isArray(itemIds) ? itemIds : [])
                  }
                  multiSelect
                  slots={{
                    expandIcon: () => <FolderOpen fontSize="small" />,
                    collapseIcon: () => <Folder fontSize="small" />,
                    endIcon: () => <InsertDriveFile fontSize="small" />,
                  }}
                  sx={{
                    "& .MuiTreeItem-label": {
                      fontSize: "0.95rem",
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Panel de información */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Estado del árbol
              </Typography>
              <Box
                sx={{
                  bgcolor: "#f5f5f5",
                  borderRadius: 1,
                  p: 2,
                  minHeight: 300,
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  <strong>Items expandidos:</strong>
                </Typography>
                <Box
                  sx={{
                    bgcolor: "#fff",
                    p: 1,
                    borderRadius: 1,
                    mb: 2,
                    minHeight: 60,
                  }}
                >
                  {treeExpandedItems.length > 0 ? (
                    treeExpandedItems.map((id) => (
                      <Typography
                        key={id}
                        variant="body2"
                        component="span"
                        sx={{
                          display: "inline-block",
                          bgcolor: "primary.light",
                          color: "primary.contrastText",
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          mr: 0.5,
                          mb: 0.5,
                          fontSize: "0.75rem",
                        }}
                      >
                        <Folder
                          sx={{
                            fontSize: 12,
                            mr: 0.5,
                            verticalAlign: "middle",
                          }}
                        />
                        {id}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Ningún item expandido
                    </Typography>
                  )}
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  <strong>Items seleccionados:</strong>
                </Typography>
                <Box
                  sx={{
                    bgcolor: "#fff",
                    p: 1,
                    borderRadius: 1,
                    minHeight: 60,
                  }}
                >
                  {treeSelectedItems.length > 0 ? (
                    treeSelectedItems.map((id) => (
                      <Typography
                        key={id}
                        variant="body2"
                        component="span"
                        sx={{
                          display: "inline-block",
                          bgcolor: "success.light",
                          color: "success.contrastText",
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          mr: 0.5,
                          mb: 0.5,
                          fontSize: "0.75rem",
                        }}
                      >
                        <InsertDriveFile
                          sx={{
                            fontSize: 12,
                            mr: 0.5,
                            verticalAlign: "middle",
                          }}
                        />
                        {id}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Ningún item seleccionado (Ctrl+Click para multi-selección)
                    </Typography>
                  )}
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        setTreeExpandedItems([
                          "documents",
                          "images",
                          "source",
                          "reports",
                          "src-components",
                          "src-utils",
                        ])
                      }
                    >
                      Expandir todo
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setTreeExpandedItems([])}
                    >
                      Colapsar todo
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setTreeSelectedItems([])}
                    >
                      Limpiar selección
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Stack>

          {/* Variantes adicionales */}
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            Variantes con iconos por tipo de archivo
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Iconos personalizados por extensión
              </Typography>
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  p: 2,
                }}
              >
                <RichTreeView
                  items={[
                    {
                      id: "project",
                      label: "mi-proyecto",
                      children: [
                        { id: "readme", label: "README.md" },
                        { id: "package", label: "package.json" },
                        {
                          id: "src-folder",
                          label: "src",
                          children: [
                            { id: "index", label: "index.tsx" },
                            { id: "styles", label: "styles.css" },
                          ],
                        },
                        {
                          id: "assets-folder",
                          label: "assets",
                          children: [
                            { id: "logo", label: "logo.png" },
                            { id: "icon", label: "icon.svg" },
                          ],
                        },
                      ],
                    },
                  ]}
                  defaultExpandedItems={[
                    "project",
                    "src-folder",
                    "assets-folder",
                  ]}
                  slots={{
                    expandIcon: () => (
                      <FolderOpen fontSize="small" color="warning" />
                    ),
                    collapseIcon: () => (
                      <Folder fontSize="small" color="warning" />
                    ),
                    endIcon: () => (
                      <Description fontSize="small" color="action" />
                    ),
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Árbol con checkboxSelection
              </Typography>
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  p: 2,
                }}
              >
                <RichTreeView
                  items={[
                    {
                      id: "permisos",
                      label: "Permisos de usuario",
                      children: [
                        {
                          id: "lectura",
                          label: "Lectura",
                          children: [
                            { id: "ver-docs", label: "Ver documentos" },
                            { id: "ver-reportes", label: "Ver reportes" },
                          ],
                        },
                        {
                          id: "escritura",
                          label: "Escritura",
                          children: [
                            { id: "crear-docs", label: "Crear documentos" },
                            { id: "editar-docs", label: "Editar documentos" },
                          ],
                        },
                        {
                          id: "admin",
                          label: "Administración",
                          children: [
                            {
                              id: "gestionar-users",
                              label: "Gestionar usuarios",
                            },
                            { id: "config", label: "Configuración" },
                          ],
                        },
                      ],
                    },
                  ]}
                  defaultExpandedItems={[
                    "permisos",
                    "lectura",
                    "escritura",
                    "admin",
                  ]}
                  checkboxSelection
                  multiSelect
                />
              </Box>
            </Box>
          </Stack>

          <Alert severity="info" sx={{ mt: 3 }}>
            <strong>Funcionalidades:</strong> Expansión/colapso de nodos,
            selección múltiple (Ctrl+Click), iconos personalizables,
            checkboxSelection para selección con casillas de verificación
          </Alert>
        </Card>

        {/* SECCIÓN 11: RICH TREE VIEW PRO */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            11. RichTreeViewPro
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert severity="success" sx={{ mb: 2 }}>
            Versión Pro del TreeView con funcionalidades avanzadas: carga
            asíncrona (lazy loading), virtualización, drag & drop y mejor
            rendimiento
          </Alert>

          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            {/* TreeView Pro con lazy loading simulado */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Árbol con carga asíncrona (Lazy Loading)
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Los hijos se cargan dinámicamente al expandir un nodo
              </Typography>
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  p: 2,
                  minHeight: 300,
                }}
              >
                <RichTreeViewPro
                  items={[
                    {
                      id: "database",
                      label: "Base de Datos",
                      children: [
                        {
                          id: "users-table",
                          label: "usuarios",
                          children: [
                            { id: "user-1", label: "id: INT PRIMARY KEY" },
                            { id: "user-2", label: "nombre: VARCHAR(100)" },
                            { id: "user-3", label: "email: VARCHAR(255)" },
                            { id: "user-4", label: "created_at: TIMESTAMP" },
                          ],
                        },
                        {
                          id: "products-table",
                          label: "productos",
                          children: [
                            { id: "prod-1", label: "id: INT PRIMARY KEY" },
                            { id: "prod-2", label: "nombre: VARCHAR(200)" },
                            { id: "prod-3", label: "precio: DECIMAL(10,2)" },
                            { id: "prod-4", label: "stock: INT" },
                          ],
                        },
                        {
                          id: "orders-table",
                          label: "ordenes",
                          children: [
                            { id: "order-1", label: "id: INT PRIMARY KEY" },
                            { id: "order-2", label: "usuario_id: INT FK" },
                            { id: "order-3", label: "total: DECIMAL(12,2)" },
                            { id: "order-4", label: "status: ENUM" },
                          ],
                        },
                      ],
                    },
                    {
                      id: "api",
                      label: "API Endpoints",
                      children: [
                        {
                          id: "api-auth",
                          label: "/auth",
                          children: [
                            { id: "auth-1", label: "POST /login" },
                            { id: "auth-2", label: "POST /register" },
                            { id: "auth-3", label: "POST /logout" },
                          ],
                        },
                        {
                          id: "api-users",
                          label: "/users",
                          children: [
                            { id: "users-1", label: "GET /" },
                            { id: "users-2", label: "GET /:id" },
                            { id: "users-3", label: "PUT /:id" },
                            { id: "users-4", label: "DELETE /:id" },
                          ],
                        },
                      ],
                    },
                  ]}
                  defaultExpandedItems={["database", "api"]}
                  multiSelect
                  checkboxSelection
                  slots={{
                    expandIcon: () => (
                      <FolderOpen fontSize="small" color="primary" />
                    ),
                    collapseIcon: () => (
                      <Folder fontSize="small" color="primary" />
                    ),
                    endIcon: () => <Code fontSize="small" color="action" />,
                  }}
                />
              </Box>
            </Box>

            {/* TreeView Pro con virtualización */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Árbol con Drag & Drop y Reordenamiento
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Estructura jerárquica de componentes React
              </Typography>
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  p: 2,
                  minHeight: 300,
                }}
              >
                <RichTreeViewPro
                  items={[
                    {
                      id: "app-root",
                      label: "<App />",
                      children: [
                        {
                          id: "layout",
                          label: "<Layout />",
                          children: [
                            {
                              id: "header",
                              label: "<Header />",
                              children: [
                                { id: "nav", label: "<Navigation />" },
                                { id: "search", label: "<SearchBar />" },
                                { id: "user-menu", label: "<UserMenu />" },
                              ],
                            },
                            {
                              id: "main",
                              label: "<Main />",
                              children: [
                                { id: "sidebar", label: "<Sidebar />" },
                                {
                                  id: "content",
                                  label: "<Content />",
                                  children: [
                                    { id: "dashboard", label: "<Dashboard />" },
                                    { id: "charts", label: "<Charts />" },
                                    { id: "table", label: "<DataTable />" },
                                  ],
                                },
                              ],
                            },
                            {
                              id: "footer",
                              label: "<Footer />",
                              children: [
                                { id: "links", label: "<FooterLinks />" },
                                { id: "copyright", label: "<Copyright />" },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ]}
                  defaultExpandedItems={[
                    "app-root",
                    "layout",
                    "header",
                    "main",
                    "content",
                  ]}
                  slots={{
                    expandIcon: () => (
                      <FolderOpen
                        fontSize="small"
                        sx={{ color: "primary.main" }}
                      />
                    ),
                    collapseIcon: () => (
                      <Folder fontSize="small" sx={{ color: "primary.main" }} />
                    ),
                    endIcon: () => (
                      <Code fontSize="small" sx={{ color: "primary.main" }} />
                    ),
                  }}
                  sx={{
                    "& .MuiTreeItem-label": {
                      fontFamily: "monospace",
                      fontSize: "0.9rem",
                    },
                  }}
                />
              </Box>
            </Box>
          </Stack>

          {/* Ejemplo adicional: Árbol grande con virtualización */}
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            Árbol con selección múltiple y checkbox (ideal para permisos)
          </Typography>
          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              p: 2,
              maxWidth: 600,
            }}
          >
            <RichTreeViewPro
              items={[
                {
                  id: "modules",
                  label: "Módulos del Sistema",
                  children: [
                    {
                      id: "mod-ventas",
                      label: "Ventas",
                      children: [
                        { id: "ventas-crear", label: "Crear cotización" },
                        { id: "ventas-editar", label: "Editar cotización" },
                        { id: "ventas-aprobar", label: "Aprobar cotización" },
                        { id: "ventas-facturar", label: "Generar factura" },
                      ],
                    },
                    {
                      id: "mod-inventario",
                      label: "Inventario",
                      children: [
                        { id: "inv-ver", label: "Ver inventario" },
                        { id: "inv-entrada", label: "Registrar entrada" },
                        { id: "inv-salida", label: "Registrar salida" },
                        { id: "inv-ajuste", label: "Ajuste de inventario" },
                      ],
                    },
                    {
                      id: "mod-reportes",
                      label: "Reportes",
                      children: [
                        { id: "rep-ventas", label: "Reporte de ventas" },
                        {
                          id: "rep-inventario",
                          label: "Reporte de inventario",
                        },
                        { id: "rep-financiero", label: "Reporte financiero" },
                        { id: "rep-exportar", label: "Exportar datos" },
                      ],
                    },
                    {
                      id: "mod-admin",
                      label: "Administración",
                      children: [
                        { id: "admin-users", label: "Gestión de usuarios" },
                        { id: "admin-roles", label: "Gestión de roles" },
                        { id: "admin-config", label: "Configuración general" },
                        { id: "admin-audit", label: "Auditoría del sistema" },
                      ],
                    },
                  ],
                },
              ]}
              defaultExpandedItems={[
                "modules",
                "mod-ventas",
                "mod-inventario",
                "mod-reportes",
                "mod-admin",
              ]}
              checkboxSelection
              multiSelect
              slots={{
                expandIcon: () => (
                  <FolderOpen fontSize="small" color="secondary" />
                ),
                collapseIcon: () => (
                  <Folder fontSize="small" color="secondary" />
                ),
                endIcon: () => (
                  <InsertDriveFile fontSize="small" color="action" />
                ),
              }}
            />
          </Box>

          <Alert severity="info" sx={{ mt: 3 }}>
            <strong>Funcionalidades Pro:</strong> Lazy loading (carga asíncrona
            de hijos), virtualización para árboles grandes, drag & drop para
            reordenamiento, mejor rendimiento con muchos nodos,
            checkboxSelection con propagación automática
          </Alert>
        </Card>

        {/* SECCIÓN 12: LINE CHARTS */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            12. LineChart - Gráficos de Línea
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert severity="success" sx={{ mb: 3 }}>
            Gráficos de línea con múltiples funcionalidades: áreas, apilado,
            interpolación, marcadores, y más. Basado en MUI X Charts.
          </Alert>

          <Stack spacing={4}>
            {/* 1. Basic Line Chart */}
            <Box>
              <Typography variant="h6" gutterBottom>
                1. Gráfico de Línea Básico
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Gráfico simple con una sola serie de datos.
              </Typography>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5, 3],
                    label: "Ventas",
                  },
                ]}
                height={300}
              />
            </Box>

            <Divider />

            {/* 2. Multiple Series */}
            <Box>
              <Typography variant="h6" gutterBottom>
                2. Múltiples Series
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Comparación de múltiples series en un solo gráfico.
              </Typography>
              <LineChart
                xAxis={[
                  {
                    data: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
                    scaleType: "band",
                  },
                ]}
                series={[
                  { data: [35, 44, 24, 34, 25, 40], label: "2023" },
                  { data: [51, 60, 47, 55, 48, 65], label: "2024" },
                  { data: [15, 25, 30, 22, 35, 28], label: "2025" },
                ]}
                height={300}
              />
            </Box>

            <Divider />

            {/* 3. Area Chart */}
            <Box>
              <Typography variant="h6" gutterBottom>
                3. Gráfico de Área
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Rellena el área bajo la línea con <code>area: true</code>.
              </Typography>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
                series={[
                  {
                    data: [2, 5, 3, 8, 1, 6, 4, 9, 2, 7],
                    area: true,
                    label: "Ingresos",
                  },
                ]}
                height={300}
              />
            </Box>

            <Divider />

            {/* 4. Multiple Area Charts */}
            <Box>
              <Typography variant="h6" gutterBottom>
                4. Múltiples Áreas
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Varias series con área para comparar tendencias.
              </Typography>
              <LineChart
                xAxis={[
                  {
                    data: [
                      "Ene",
                      "Feb",
                      "Mar",
                      "Abr",
                      "May",
                      "Jun",
                      "Jul",
                      "Ago",
                    ],
                    scaleType: "band",
                  },
                ]}
                series={[
                  {
                    data: [40, 35, 50, 45, 60, 55, 70, 65],
                    area: true,
                    label: "Producto A",
                  },
                  {
                    data: [25, 30, 35, 40, 45, 50, 55, 60],
                    area: true,
                    label: "Producto B",
                  },
                ]}
                height={300}
              />
            </Box>

            <Divider />

            {/* 5. Stacked Area Chart */}
            <Box>
              <Typography variant="h6" gutterBottom>
                5. Áreas Apiladas (Stacked)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Series apiladas usando <code>stack: &quot;total&quot;</code>.
              </Typography>
              <LineChart
                xAxis={[
                  {
                    data: ["Q1", "Q2", "Q3", "Q4"],
                    scaleType: "band",
                  },
                ]}
                series={[
                  {
                    data: [120, 150, 180, 200],
                    area: true,
                    stack: "total",
                    label: "Norte",
                  },
                  {
                    data: [80, 100, 120, 140],
                    area: true,
                    stack: "total",
                    label: "Sur",
                  },
                  {
                    data: [60, 70, 90, 100],
                    area: true,
                    stack: "total",
                    label: "Este",
                  },
                ]}
                height={300}
              />
            </Box>

            <Divider />

            {/* 6. Different Curve Types */}
            <Box>
              <Typography variant="h6" gutterBottom>
                6. Tipos de Interpolación (Curve)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Diferentes tipos de curva: linear, catmullRom, step, monotoneX.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>curve: &quot;linear&quot;</code>
                  </Typography>
                  <LineChart
                    xAxis={[{ data: [0, 1, 2, 3, 4, 5] }]}
                    series={[
                      {
                        data: [0, 5, 2, 6, 3, 9],
                        curve: "linear",
                      },
                    ]}
                    height={200}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>curve: &quot;catmullRom&quot;</code>
                  </Typography>
                  <LineChart
                    xAxis={[{ data: [0, 1, 2, 3, 4, 5] }]}
                    series={[
                      {
                        data: [0, 5, 2, 6, 3, 9],
                        curve: "catmullRom",
                      },
                    ]}
                    height={200}
                  />
                </Box>
              </Stack>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2} mt={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>curve: &quot;step&quot;</code>
                  </Typography>
                  <LineChart
                    xAxis={[{ data: [0, 1, 2, 3, 4, 5] }]}
                    series={[
                      {
                        data: [0, 5, 2, 6, 3, 9],
                        curve: "step",
                      },
                    ]}
                    height={200}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>curve: &quot;monotoneX&quot;</code>
                  </Typography>
                  <LineChart
                    xAxis={[{ data: [0, 1, 2, 3, 4, 5] }]}
                    series={[
                      {
                        data: [0, 5, 2, 6, 3, 9],
                        curve: "monotoneX",
                      },
                    ]}
                    height={200}
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 7. With Marks/Points */}
            <Box>
              <Typography variant="h6" gutterBottom>
                7. Con Marcadores (Marks)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Muestra puntos en cada dato con <code>showMark: true</code>.
              </Typography>
              <LineChart
                xAxis={[
                  {
                    data: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
                    scaleType: "band",
                  },
                ]}
                series={[
                  {
                    data: [65, 59, 80, 81, 56, 55, 70],
                    label: "Visitantes",
                    showMark: true,
                  },
                ]}
                height={300}
              />
            </Box>

            <Divider />

            {/* 8. Baseline Variations */}
            <Box>
              <Typography variant="h6" gutterBottom>
                8. Variaciones de Baseline
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Control del baseline del área: default (0), min, max.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>baseline: &quot;min&quot;</code> (rellena hacia abajo)
                  </Typography>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 4, 5] }]}
                    series={[
                      {
                        data: [4, 3, 5, 2, 6],
                        area: true,
                        baseline: "min",
                      },
                    ]}
                    height={200}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>baseline: &quot;max&quot;</code> (rellena hacia
                    arriba)
                  </Typography>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 4, 5] }]}
                    series={[
                      {
                        data: [4, 3, 5, 2, 6],
                        area: true,
                        baseline: "max",
                      },
                    ]}
                    height={200}
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 9. Null Values & Connect Nulls */}
            <Box>
              <Typography variant="h6" gutterBottom>
                9. Valores Nulos y connectNulls
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Manejo de datos faltantes con <code>connectNulls</code>.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Sin connectNulls (gap en datos)
                  </Typography>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8] }]}
                    series={[
                      {
                        data: [2, 5, null, null, 8, 3, 6, 4],
                        connectNulls: false,
                      },
                    ]}
                    height={200}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Con <code>connectNulls: true</code>
                  </Typography>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8] }]}
                    series={[
                      {
                        data: [2, 5, null, null, 8, 3, 6, 4],
                        connectNulls: true,
                      },
                    ]}
                    height={200}
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 10. With Grid */}
            <Box>
              <Typography variant="h6" gutterBottom>
                10. Con Grid de Fondo
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Agrega líneas de referencia con <code>grid</code>.
              </Typography>
              <LineChart
                xAxis={[
                  {
                    data: [
                      "Ene",
                      "Feb",
                      "Mar",
                      "Abr",
                      "May",
                      "Jun",
                      "Jul",
                      "Ago",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dic",
                    ],
                    scaleType: "band",
                  },
                ]}
                series={[
                  {
                    data: [
                      186, 305, 237, 173, 209, 214, 276, 298, 312, 267, 245,
                      289,
                    ],
                    label: "Ventas 2024",
                    area: true,
                  },
                ]}
                grid={{ vertical: true, horizontal: true }}
                height={300}
              />
            </Box>

            <Divider />

            {/* 11. Custom Colors */}
            <Box>
              <Typography variant="h6" gutterBottom>
                11. Colores Personalizados
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Define colores específicos para cada serie.
              </Typography>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
                series={[
                  {
                    data: [3, 4, 1, 6, 5, 2],
                    label: "Serie Roja",
                    color: "#f44336",
                  },
                  {
                    data: [1, 3, 2, 5, 4, 6],
                    label: "Serie Verde",
                    color: "#4caf50",
                  },
                  {
                    data: [2, 1, 4, 3, 6, 5],
                    label: "Serie Azul",
                    color: "#2196f3",
                  },
                ]}
                height={300}
              />
            </Box>

            <Divider />

            {/* 12. Dataset Format */}
            <Box>
              <Typography variant="h6" gutterBottom>
                12. Formato Dataset
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Usa <code>dataset</code> con <code>dataKey</code> para
                estructuras de datos más organizadas.
              </Typography>
              <LineChart
                dataset={[
                  { mes: "Ene", ventas: 65, gastos: 40, margen: 25 },
                  { mes: "Feb", ventas: 78, gastos: 45, margen: 33 },
                  { mes: "Mar", ventas: 90, gastos: 55, margen: 35 },
                  { mes: "Abr", ventas: 81, gastos: 50, margen: 31 },
                  { mes: "May", ventas: 95, gastos: 58, margen: 37 },
                  { mes: "Jun", ventas: 110, gastos: 65, margen: 45 },
                ]}
                xAxis={[{ dataKey: "mes", scaleType: "band" }]}
                series={[
                  { dataKey: "ventas", label: "Ventas" },
                  { dataKey: "gastos", label: "Gastos" },
                  { dataKey: "margen", label: "Margen", area: true },
                ]}
                height={300}
              />
            </Box>

            <Divider />

            {/* 13. Skip Animation */}
            <Box>
              <Typography variant="h6" gutterBottom>
                13. Sin Animación
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Desactiva animaciones con <code>skipAnimation</code>.
              </Typography>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 4, 5] }]}
                series={[
                  {
                    data: [10, 15, 12, 18, 14],
                    label: "Datos estáticos",
                    area: true,
                  },
                ]}
                skipAnimation
                height={250}
              />
            </Box>

            <Divider />

            {/* 14. Step Variations */}
            <Box>
              <Typography variant="h6" gutterBottom>
                14. Variaciones de Step
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Diferentes posiciones del step: step, stepBefore, stepAfter.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>curve: &quot;stepBefore&quot;</code>
                  </Typography>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 4, 5] }]}
                    series={[{ data: [2, 5, 3, 7, 4], curve: "stepBefore" }]}
                    height={180}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>curve: &quot;stepAfter&quot;</code>
                  </Typography>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 4, 5] }]}
                    series={[{ data: [2, 5, 3, 7, 4], curve: "stepAfter" }]}
                    height={180}
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 15. Complete Dashboard Example */}
            <Box>
              <Typography variant="h6" gutterBottom>
                15. Ejemplo Dashboard Completo
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Gráfico completo con todas las funcionalidades combinadas.
              </Typography>
              <LineChart
                dataset={[
                  { month: "Ene", organic: 4000, paid: 2400, referral: 1200 },
                  { month: "Feb", organic: 3000, paid: 1398, referral: 1100 },
                  { month: "Mar", organic: 2000, paid: 9800, referral: 2290 },
                  { month: "Abr", organic: 2780, paid: 3908, referral: 2000 },
                  { month: "May", organic: 1890, paid: 4800, referral: 2181 },
                  { month: "Jun", organic: 2390, paid: 3800, referral: 2500 },
                  { month: "Jul", organic: 3490, paid: 4300, referral: 2100 },
                  { month: "Ago", organic: 4200, paid: 5100, referral: 2800 },
                  { month: "Sep", organic: 3800, paid: 4700, referral: 2400 },
                  { month: "Oct", organic: 4500, paid: 5300, referral: 3000 },
                  { month: "Nov", organic: 5200, paid: 6100, referral: 3200 },
                  { month: "Dic", organic: 6000, paid: 7000, referral: 3500 },
                ]}
                xAxis={[
                  {
                    dataKey: "month",
                    scaleType: "band",
                  },
                ]}
                series={[
                  {
                    dataKey: "organic",
                    label: "Tráfico Orgánico",
                    area: true,
                    stack: "traffic",
                    color: "#4caf50",
                    showMark: true,
                  },
                  {
                    dataKey: "paid",
                    label: "Tráfico Pagado",
                    area: true,
                    stack: "traffic",
                    color: "#2196f3",
                    showMark: true,
                  },
                  {
                    dataKey: "referral",
                    label: "Referidos",
                    area: true,
                    stack: "traffic",
                    color: "#ff9800",
                    showMark: true,
                  },
                ]}
                grid={{ vertical: true, horizontal: true }}
                height={400}
              />
            </Box>
          </Stack>

          <Alert severity="info" sx={{ mt: 3 }}>
            💡 <strong>Props principales:</strong>
            <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
              <li>
                <code>area: true</code> - Rellena el área bajo la línea
              </li>
              <li>
                <code>stack: &quot;nombre&quot;</code> - Apila series con el
                mismo nombre
              </li>
              <li>
                <code>curve</code> - Tipo de interpolación (linear, catmullRom,
                step, monotoneX, etc.)
              </li>
              <li>
                <code>showMark: true</code> - Muestra puntos en cada dato
              </li>
              <li>
                <code>connectNulls: true</code> - Conecta puntos ignorando
                valores null
              </li>
              <li>
                <code>baseline</code> - Control del baseline del área (min, max,
                número)
              </li>
              <li>
                <code>grid</code> - Muestra líneas de referencia
              </li>
              <li>
                <code>dataset + dataKey</code> - Formato estructurado de datos
              </li>
            </ul>
          </Alert>
        </Card>

        {/* SECCIÓN 13: PIE CHARTS */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            13. PieChart - Gráficos Circulares
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert severity="success" sx={{ mb: 3 }}>
            Gráficos circulares con múltiples funcionalidades: donut, etiquetas,
            ángulos, radios personalizados, highlighting y más.
          </Alert>

          <Stack spacing={4}>
            {/* 1. Basic Pie Chart */}
            <Box>
              <Typography variant="h6" gutterBottom>
                1. Gráfico de Pie Básico
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Gráfico circular simple con datos básicos.
              </Typography>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: "Categoría A" },
                      { id: 1, value: 15, label: "Categoría B" },
                      { id: 2, value: 20, label: "Categoría C" },
                    ],
                  },
                ]}
                width={400}
                height={200}
              />
            </Box>

            <Divider />

            {/* 2. Donut Chart */}
            <Box>
              <Typography variant="h6" gutterBottom>
                2. Gráfico Donut (innerRadius)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Usa <code>innerRadius</code> para crear un agujero en el centro.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>innerRadius: 30</code>
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 35, label: "Ventas" },
                          { id: 1, value: 25, label: "Marketing" },
                          { id: 2, value: 20, label: "Desarrollo" },
                          { id: 3, value: 20, label: "Soporte" },
                        ],
                        innerRadius: 30,
                      },
                    ]}
                    width={300}
                    height={200}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>innerRadius: 60</code>
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 35, label: "Ventas" },
                          { id: 1, value: 25, label: "Marketing" },
                          { id: 2, value: 20, label: "Desarrollo" },
                          { id: 3, value: 20, label: "Soporte" },
                        ],
                        innerRadius: 60,
                      },
                    ]}
                    width={300}
                    height={200}
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 3. Padding Angle */}
            <Box>
              <Typography variant="h6" gutterBottom>
                3. Espaciado entre Arcos (paddingAngle)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Agrega espacio angular entre los segmentos.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>paddingAngle: 2</code>
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 30 },
                          { id: 1, value: 25 },
                          { id: 2, value: 20 },
                          { id: 3, value: 15 },
                          { id: 4, value: 10 },
                        ],
                        paddingAngle: 2,
                        innerRadius: 40,
                      },
                    ]}
                    width={250}
                    height={200}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>paddingAngle: 5</code>
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 30 },
                          { id: 1, value: 25 },
                          { id: 2, value: 20 },
                          { id: 3, value: 15 },
                          { id: 4, value: 10 },
                        ],
                        paddingAngle: 5,
                        innerRadius: 40,
                      },
                    ]}
                    width={250}
                    height={200}
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 4. Corner Radius */}
            <Box>
              <Typography variant="h6" gutterBottom>
                4. Bordes Redondeados (cornerRadius)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Similar a CSS border-radius para los arcos.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>cornerRadius: 5</code>
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 40, label: "Norte" },
                          { id: 1, value: 30, label: "Sur" },
                          { id: 2, value: 20, label: "Este" },
                          { id: 3, value: 10, label: "Oeste" },
                        ],
                        cornerRadius: 5,
                        innerRadius: 30,
                        paddingAngle: 2,
                      },
                    ]}
                    width={300}
                    height={200}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>cornerRadius: 10</code>
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 40, label: "Norte" },
                          { id: 1, value: 30, label: "Sur" },
                          { id: 2, value: 20, label: "Este" },
                          { id: 3, value: 10, label: "Oeste" },
                        ],
                        cornerRadius: 10,
                        innerRadius: 30,
                        paddingAngle: 2,
                      },
                    ]}
                    width={300}
                    height={200}
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 5. Start and End Angle */}
            <Box>
              <Typography variant="h6" gutterBottom>
                5. Ángulo Inicial y Final
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Control del rango del arco con <code>startAngle</code> y{" "}
                <code>endAngle</code>.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Semicírculo: <code>startAngle: -90, endAngle: 90</code>
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 50, label: "Completado" },
                          { id: 1, value: 30, label: "En Progreso" },
                          { id: 2, value: 20, label: "Pendiente" },
                        ],
                        startAngle: -90,
                        endAngle: 90,
                        innerRadius: 40,
                      },
                    ]}
                    width={300}
                    height={200}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Gauge: <code>startAngle: -120, endAngle: 120</code>
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 70, label: "Usado" },
                          { id: 1, value: 30, label: "Libre" },
                        ],
                        startAngle: -120,
                        endAngle: 120,
                        innerRadius: 50,
                        cornerRadius: 5,
                      },
                    ]}
                    width={300}
                    height={200}
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 6. Arc Labels */}
            <Box>
              <Typography variant="h6" gutterBottom>
                6. Etiquetas en Arcos (arcLabel)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Muestra etiquetas dentro de los arcos.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>arcLabel: &quot;value&quot;</code>
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 45, label: "Chrome" },
                          { id: 1, value: 25, label: "Firefox" },
                          { id: 2, value: 20, label: "Safari" },
                          { id: 3, value: 10, label: "Edge" },
                        ],
                        arcLabel: "value",
                      },
                    ]}
                    width={300}
                    height={200}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>arcLabel: &quot;label&quot;</code>
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 45, label: "Chrome" },
                          { id: 1, value: 25, label: "Firefox" },
                          { id: 2, value: 20, label: "Safari" },
                          { id: 3, value: 10, label: "Edge" },
                        ],
                        arcLabel: "label",
                      },
                    ]}
                    width={300}
                    height={200}
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 7. Arc Label with Percentage */}
            <Box>
              <Typography variant="h6" gutterBottom>
                7. Etiquetas con Porcentaje
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Función personalizada para mostrar porcentajes.
              </Typography>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 40, label: "Producto A" },
                      { id: 1, value: 35, label: "Producto B" },
                      { id: 2, value: 15, label: "Producto C" },
                      { id: 3, value: 10, label: "Otros" },
                    ],
                    arcLabel: (item: { value: number }) => `${item.value}%`,
                    arcLabelMinAngle: 35,
                    innerRadius: 30,
                  },
                ]}
                width={400}
                height={250}
              />
            </Box>

            <Divider />

            {/* 8. Arc Label Min Angle */}
            <Box>
              <Typography variant="h6" gutterBottom>
                8. Ángulo Mínimo para Etiquetas
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                <code>arcLabelMinAngle</code> oculta etiquetas en arcos
                pequeños.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Sin mínimo (etiquetas en todos)
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 60 },
                          { id: 1, value: 20 },
                          { id: 2, value: 10 },
                          { id: 3, value: 5 },
                          { id: 4, value: 3 },
                          { id: 5, value: 2 },
                        ],
                        arcLabel: "value",
                      },
                    ]}
                    width={250}
                    height={200}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>arcLabelMinAngle: 25</code>
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 60 },
                          { id: 1, value: 20 },
                          { id: 2, value: 10 },
                          { id: 3, value: 5 },
                          { id: 4, value: 3 },
                          { id: 5, value: 2 },
                        ],
                        arcLabel: "value",
                        arcLabelMinAngle: 25,
                      },
                    ]}
                    width={250}
                    height={200}
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 9. Custom Colors */}
            <Box>
              <Typography variant="h6" gutterBottom>
                9. Colores Personalizados
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Define colores por dato o usa una paleta global.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Colores por dato
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          {
                            id: 0,
                            value: 30,
                            label: "Éxito",
                            color: "#4caf50",
                          },
                          {
                            id: 1,
                            value: 20,
                            label: "Advertencia",
                            color: "#ff9800",
                          },
                          {
                            id: 2,
                            value: 10,
                            label: "Error",
                            color: "#f44336",
                          },
                          { id: 3, value: 40, label: "Info", color: "#2196f3" },
                        ],
                      },
                    ]}
                    width={300}
                    height={200}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Paleta global con <code>colors</code>
                  </Typography>
                  <PieChart
                    colors={["#9c27b0", "#e91e63", "#ff5722", "#795548"]}
                    series={[
                      {
                        data: [
                          { id: 0, value: 25, label: "Q1" },
                          { id: 1, value: 30, label: "Q2" },
                          { id: 2, value: 28, label: "Q3" },
                          { id: 3, value: 17, label: "Q4" },
                        ],
                      },
                    ]}
                    width={300}
                    height={200}
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 10. Highlighted State */}
            <Box>
              <Typography variant="h6" gutterBottom>
                10. Estado Highlighted (Resaltado)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Modifica el tamaño al hacer hover con{" "}
                <code>highlighted.additionalRadius</code>.
              </Typography>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 35, label: "Desktop" },
                      { id: 1, value: 45, label: "Mobile" },
                      { id: 2, value: 20, label: "Tablet" },
                    ],
                    innerRadius: 40,
                    paddingAngle: 2,
                    cornerRadius: 5,
                    highlighted: { additionalRadius: 10 },
                  },
                ]}
                width={400}
                height={250}
              />
            </Box>

            <Divider />

            {/* 11. Faded State */}
            <Box>
              <Typography variant="h6" gutterBottom>
                11. Estado Faded (Desvanecido)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Reduce el radio de elementos no seleccionados con{" "}
                <code>faded.additionalRadius</code>.
              </Typography>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 40, label: "Orgánico" },
                      { id: 1, value: 30, label: "Pagado" },
                      { id: 2, value: 20, label: "Social" },
                      { id: 3, value: 10, label: "Directo" },
                    ],
                    innerRadius: 30,
                    faded: { innerRadius: 30, additionalRadius: -10 },
                    highlighted: { additionalRadius: 5 },
                  },
                ]}
                width={400}
                height={250}
              />
            </Box>

            <Divider />

            {/* 12. Center Position */}
            <Box>
              <Typography variant="h6" gutterBottom>
                12. Posición del Centro (cx, cy)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Controla la posición del centro del pie.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>cx: 100</code> (izquierda)
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 50 },
                          { id: 1, value: 30 },
                          { id: 2, value: 20 },
                        ],
                        cx: 100,
                      },
                    ]}
                    width={300}
                    height={200}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>cx: 200</code> (derecha)
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 50 },
                          { id: 1, value: 30 },
                          { id: 2, value: 20 },
                        ],
                        cx: 200,
                      },
                    ]}
                    width={300}
                    height={200}
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 13. Outer Radius */}
            <Box>
              <Typography variant="h6" gutterBottom>
                13. Radio Exterior (outerRadius)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Controla el tamaño máximo del pie.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>outerRadius: 60</code>
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 40 },
                          { id: 1, value: 35 },
                          { id: 2, value: 25 },
                        ],
                        outerRadius: 60,
                      },
                    ]}
                    width={200}
                    height={200}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>outerRadius: 90</code>
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 40 },
                          { id: 1, value: 35 },
                          { id: 2, value: 25 },
                        ],
                        outerRadius: 90,
                      },
                    ]}
                    width={200}
                    height={200}
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 14. Skip Animation */}
            <Box>
              <Typography variant="h6" gutterBottom>
                14. Sin Animación
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Desactiva animaciones con <code>skipAnimation</code>.
              </Typography>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 55, label: "Aprobado" },
                      { id: 1, value: 30, label: "Pendiente" },
                      { id: 2, value: 15, label: "Rechazado" },
                    ],
                    innerRadius: 40,
                    arcLabel: "value",
                  },
                ]}
                skipAnimation
                width={400}
                height={250}
              />
            </Box>

            <Divider />

            {/* 15. Complete Dashboard Example */}
            <Box>
              <Typography variant="h6" gutterBottom>
                15. Ejemplo Dashboard Completo
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Combinación de todas las funcionalidades.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                <Box sx={{ flex: 1, textAlign: "center" }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Distribución de Ventas
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          {
                            id: 0,
                            value: 45,
                            label: "Electrónica",
                            color: "#3f51b5",
                          },
                          {
                            id: 1,
                            value: 25,
                            label: "Ropa",
                            color: "#f50057",
                          },
                          {
                            id: 2,
                            value: 18,
                            label: "Hogar",
                            color: "#00bcd4",
                          },
                          {
                            id: 3,
                            value: 12,
                            label: "Otros",
                            color: "#ff9800",
                          },
                        ],
                        innerRadius: 50,
                        outerRadius: 90,
                        paddingAngle: 3,
                        cornerRadius: 8,
                        arcLabel: (item: { value: number }) => `${item.value}%`,
                        arcLabelMinAngle: 30,
                        highlighted: { additionalRadius: 10 },
                        faded: { additionalRadius: -5, color: "gray" },
                      },
                    ]}
                    width={350}
                    height={250}
                  />
                </Box>
                <Box sx={{ flex: 1, textAlign: "center" }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Estado de Proyectos
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          {
                            id: 0,
                            value: 8,
                            label: "Completados",
                            color: "#4caf50",
                          },
                          {
                            id: 1,
                            value: 5,
                            label: "En Progreso",
                            color: "#2196f3",
                          },
                          {
                            id: 2,
                            value: 3,
                            label: "Pendientes",
                            color: "#ff9800",
                          },
                          {
                            id: 3,
                            value: 2,
                            label: "Cancelados",
                            color: "#f44336",
                          },
                        ],
                        startAngle: -90,
                        endAngle: 270,
                        innerRadius: 60,
                        outerRadius: 85,
                        paddingAngle: 2,
                        cornerRadius: 4,
                        arcLabel: "value",
                        arcLabelMinAngle: 20,
                        highlighted: { additionalRadius: 8 },
                      },
                    ]}
                    width={350}
                    height={250}
                  />
                </Box>
              </Stack>
            </Box>
          </Stack>

          <Alert severity="info" sx={{ mt: 3 }}>
            💡 <strong>Props principales de PieChart:</strong>
            <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
              <li>
                <code>innerRadius</code> - Radio interior (0 = pie sólido, &gt;0
                = donut)
              </li>
              <li>
                <code>outerRadius</code> - Radio exterior del pie
              </li>
              <li>
                <code>paddingAngle</code> - Espacio angular entre arcos (grados)
              </li>
              <li>
                <code>cornerRadius</code> - Bordes redondeados en los arcos
              </li>
              <li>
                <code>startAngle / endAngle</code> - Rango del arco en grados
              </li>
              <li>
                <code>arcLabel</code> - Etiquetas (&quot;value&quot;,
                &quot;label&quot;, o función)
              </li>
              <li>
                <code>arcLabelMinAngle</code> - Ángulo mínimo para mostrar
                etiquetas
              </li>
              <li>
                <code>highlighted / faded</code> - Estados de interacción
              </li>
              <li>
                <code>cx / cy</code> - Posición del centro
              </li>
            </ul>
          </Alert>
        </Card>

        {/* SECCIÓN 14: SPARKLINE CHARTS */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            14. SparkLineChart - Gráficos Compactos
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert severity="success" sx={{ mb: 3 }}>
            Gráficos compactos ideales para mostrar tendencias en espacios
            reducidos: tablas, tarjetas, dashboards. Soporta líneas, barras y
            áreas.
          </Alert>

          <Stack spacing={4}>
            {/* 1. Basic Sparkline */}
            <Box>
              <Typography variant="h6" gutterBottom>
                1. Sparkline Básico
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Gráfico de línea compacto para mostrar tendencias.
              </Typography>
              <SparkLineChart
                data={[1, 4, 2, 5, 7, 2, 4, 6]}
                height={100}
                width={300}
              />
            </Box>

            <Divider />

            {/* 2. Plot Types */}
            <Box>
              <Typography variant="h6" gutterBottom>
                2. Tipos de Gráfico (plotType)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Usa <code>plotType</code> para elegir entre línea y barras.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>plotType: &quot;line&quot;</code> (default)
                  </Typography>
                  <SparkLineChart
                    data={[3, 1, 4, 1, 5, 9, 2, 6, 5, 3]}
                    height={80}
                    width={200}
                    plotType="line"
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>plotType: &quot;bar&quot;</code>
                  </Typography>
                  <SparkLineChart
                    data={[3, 1, 4, 1, 5, 9, 2, 6, 5, 3]}
                    height={80}
                    width={200}
                    plotType="bar"
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 3. Area Sparkline */}
            <Box>
              <Typography variant="h6" gutterBottom>
                3. Sparkline con Área
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Rellena el área bajo la línea con <code>area: true</code>.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Sin área
                  </Typography>
                  <SparkLineChart
                    data={[2, 5, 3, 8, 1, 6, 4, 9, 2, 7]}
                    height={80}
                    width={200}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>area: true</code>
                  </Typography>
                  <SparkLineChart
                    data={[2, 5, 3, 8, 1, 6, 4, 9, 2, 7]}
                    height={80}
                    width={200}
                    area
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 4. With Tooltip */}
            <Box>
              <Typography variant="h6" gutterBottom>
                4. Con Tooltip (showTooltip)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Muestra el valor al pasar el cursor con{" "}
                <code>showTooltip: true</code>.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Línea con tooltip
                  </Typography>
                  <SparkLineChart
                    data={[10, 25, 18, 32, 15, 28, 22, 35, 20, 30]}
                    height={80}
                    width={200}
                    showTooltip
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Barras con tooltip
                  </Typography>
                  <SparkLineChart
                    data={[10, 25, 18, 32, 15, 28, 22, 35, 20, 30]}
                    height={80}
                    width={200}
                    plotType="bar"
                    showTooltip
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 5. With Highlight */}
            <Box>
              <Typography variant="h6" gutterBottom>
                5. Con Resaltado (showHighlight)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Resalta el punto activo con <code>showHighlight: true</code>.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Línea con highlight (punto)
                  </Typography>
                  <SparkLineChart
                    data={[5, 12, 8, 15, 10, 18, 14, 20, 16, 22]}
                    height={80}
                    width={200}
                    showHighlight
                    showTooltip
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Barras con highlight (banda)
                  </Typography>
                  <SparkLineChart
                    data={[5, 12, 8, 15, 10, 18, 14, 20, 16, 22]}
                    height={80}
                    width={200}
                    plotType="bar"
                    showHighlight
                    showTooltip
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 6. Negative Values */}
            <Box>
              <Typography variant="h6" gutterBottom>
                6. Valores Negativos
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Sparklines manejan correctamente valores positivos y negativos.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Línea con negativos
                  </Typography>
                  <SparkLineChart
                    data={[3, -10, -2, 5, 7, -2, 4, 6, -5, 8]}
                    height={80}
                    width={200}
                    area
                    showTooltip
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Barras con negativos
                  </Typography>
                  <SparkLineChart
                    data={[3, -10, -2, 5, 7, -2, 4, 6, -5, 8]}
                    height={80}
                    width={200}
                    plotType="bar"
                    showTooltip
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 7. Custom Colors */}
            <Box>
              <Typography variant="h6" gutterBottom>
                7. Colores Personalizados
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Define colores usando la prop <code>colors</code>.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Verde (tendencia positiva)
                  </Typography>
                  <SparkLineChart
                    data={[10, 15, 12, 18, 20, 25, 22, 30, 28, 35]}
                    height={80}
                    width={200}
                    colors={["#4caf50"]}
                    area
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Rojo (tendencia negativa)
                  </Typography>
                  <SparkLineChart
                    data={[35, 30, 32, 25, 28, 20, 22, 15, 18, 10]}
                    height={80}
                    width={200}
                    colors={["#f44336"]}
                    area
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 8. Value Formatter */}
            <Box>
              <Typography variant="h6" gutterBottom>
                8. Formato de Valores (valueFormatter)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Personaliza el formato del tooltip con{" "}
                <code>valueFormatter</code>.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Formato moneda
                  </Typography>
                  <SparkLineChart
                    data={[1200, 1500, 1350, 1800, 1650, 2000, 1900, 2200]}
                    height={80}
                    width={200}
                    showTooltip
                    showHighlight
                    valueFormatter={(value: number | null) =>
                      value !== null ? `$${value.toLocaleString()}` : ""
                    }
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Formato porcentaje
                  </Typography>
                  <SparkLineChart
                    data={[45, 52, 48, 58, 55, 62, 60, 68]}
                    height={80}
                    width={200}
                    showTooltip
                    showHighlight
                    valueFormatter={(value: number | null) =>
                      value !== null ? `${value}%` : ""
                    }
                    plotType="bar"
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 9. Different Sizes */}
            <Box>
              <Typography variant="h6" gutterBottom>
                9. Diferentes Tamaños
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Ajusta <code>width</code> y <code>height</code> según el
                contexto.
              </Typography>
              <Stack direction="row" spacing={4} alignItems="flex-end">
                <Box>
                  <Typography variant="caption" display="block" gutterBottom>
                    Mini (100x40)
                  </Typography>
                  <SparkLineChart
                    data={[1, 4, 2, 5, 3]}
                    height={40}
                    width={100}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" display="block" gutterBottom>
                    Pequeño (150x60)
                  </Typography>
                  <SparkLineChart
                    data={[1, 4, 2, 5, 3, 6, 4]}
                    height={60}
                    width={150}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" display="block" gutterBottom>
                    Mediano (200x80)
                  </Typography>
                  <SparkLineChart
                    data={[1, 4, 2, 5, 3, 6, 4, 7]}
                    height={80}
                    width={200}
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 10. Curve Types */}
            <Box>
              <Typography variant="h6" gutterBottom>
                10. Tipos de Curva
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Diferentes interpolaciones con la prop <code>curve</code>.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>curve: &quot;linear&quot;</code>
                  </Typography>
                  <SparkLineChart
                    data={[2, 5, 3, 8, 4, 7, 5]}
                    height={70}
                    width={180}
                    curve="linear"
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>curve: &quot;natural&quot;</code>
                  </Typography>
                  <SparkLineChart
                    data={[2, 5, 3, 8, 4, 7, 5]}
                    height={70}
                    width={180}
                    curve="natural"
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <code>curve: &quot;monotoneX&quot;</code>
                  </Typography>
                  <SparkLineChart
                    data={[2, 5, 3, 8, 4, 7, 5]}
                    height={70}
                    width={180}
                    curve="monotoneX"
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* 11. Dashboard Example with Table */}
            <Box>
              <Typography variant="h6" gutterBottom>
                11. Ejemplo en Contexto - KPIs
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Sparklines en tarjetas de métricas estilo dashboard.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Card
                  variant="outlined"
                  sx={{ flex: 1, p: 2, textAlign: "center" }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Ventas Mensuales
                  </Typography>
                  <Typography variant="h5" sx={{ my: 1 }}>
                    $125,430
                  </Typography>
                  <SparkLineChart
                    data={[80, 95, 88, 102, 98, 115, 108, 125]}
                    height={50}
                    width={150}
                    colors={["#4caf50"]}
                    area
                  />
                  <Typography variant="caption" color="success.main">
                    ↑ 12.5% vs mes anterior
                  </Typography>
                </Card>
                <Card
                  variant="outlined"
                  sx={{ flex: 1, p: 2, textAlign: "center" }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Usuarios Activos
                  </Typography>
                  <Typography variant="h5" sx={{ my: 1 }}>
                    8,542
                  </Typography>
                  <SparkLineChart
                    data={[7200, 7500, 7800, 8100, 8000, 8300, 8400, 8542]}
                    height={50}
                    width={150}
                    colors={["#2196f3"]}
                    area
                  />
                  <Typography variant="caption" color="info.main">
                    ↑ 5.2% vs mes anterior
                  </Typography>
                </Card>
                <Card
                  variant="outlined"
                  sx={{ flex: 1, p: 2, textAlign: "center" }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Tasa de Rebote
                  </Typography>
                  <Typography variant="h5" sx={{ my: 1 }}>
                    32.4%
                  </Typography>
                  <SparkLineChart
                    data={[45, 42, 40, 38, 36, 35, 34, 32]}
                    height={50}
                    width={150}
                    colors={["#ff9800"]}
                    area
                  />
                  <Typography variant="caption" color="warning.main">
                    ↓ 8.1% (mejorando)
                  </Typography>
                </Card>
              </Stack>
            </Box>

            <Divider />

            {/* 12. Complete Interactive Example */}
            <Box>
              <Typography variant="h6" gutterBottom>
                12. Ejemplo Interactivo Completo
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Todas las funcionalidades combinadas.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Rendimiento Semanal
                  </Typography>
                  <SparkLineChart
                    data={[65, 72, 68, 85, 78, 92, 88, 95, 90, 102, 98, 110]}
                    height={100}
                    width={250}
                    showTooltip
                    showHighlight
                    area
                    colors={["#673ab7"]}
                    valueFormatter={(value: number | null) =>
                      value !== null ? `${value} unidades` : ""
                    }
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Distribución Diaria
                  </Typography>
                  <SparkLineChart
                    data={[12, 19, 15, 25, 22, 18, 20]}
                    height={100}
                    width={250}
                    plotType="bar"
                    showTooltip
                    showHighlight
                    colors={["#009688"]}
                    valueFormatter={(value: number | null) =>
                      value !== null ? `${value} órdenes` : ""
                    }
                  />
                </Box>
              </Stack>
            </Box>
          </Stack>

          <Alert severity="info" sx={{ mt: 3 }}>
            💡 <strong>Props principales de SparkLineChart:</strong>
            <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
              <li>
                <code>data</code> - Array de números con los valores
              </li>
              <li>
                <code>plotType</code> - Tipo de gráfico (&quot;line&quot; |
                &quot;bar&quot;)
              </li>
              <li>
                <code>area</code> - Rellena el área bajo la línea
              </li>
              <li>
                <code>showTooltip</code> - Muestra tooltip al hacer hover
              </li>
              <li>
                <code>showHighlight</code> - Resalta el punto/barra activo
              </li>
              <li>
                <code>valueFormatter</code> - Función para formatear valores en
                tooltip
              </li>
              <li>
                <code>colors</code> - Array de colores para la serie
              </li>
              <li>
                <code>curve</code> - Tipo de interpolación (linear, natural,
                etc.)
              </li>
              <li>
                <code>width / height</code> - Dimensiones del gráfico
              </li>
            </ul>
          </Alert>
        </Card>

        {/* SECCIÓN 15: BAR CHARTS */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            15. BarChart - Gráficos de Barras
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert severity="success" sx={{ mb: 3 }}>
            Gráficos de barras verticales y horizontales con múltiples series,
            apilado, y personalización completa.
          </Alert>

          <Stack spacing={4}>
            {/* Basic Bar Chart */}
            <Box>
              <Typography variant="h6" gutterBottom>
                1. Barras Básicas
              </Typography>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
                  },
                ]}
                series={[{ data: [4, 3, 5, 2, 6, 4], label: "Ventas" }]}
                height={300}
              />
            </Box>

            <Divider />

            {/* Multiple Series */}
            <Box>
              <Typography variant="h6" gutterBottom>
                2. Múltiples Series
              </Typography>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["Q1", "Q2", "Q3", "Q4"],
                  },
                ]}
                series={[
                  { data: [35, 44, 24, 34], label: "2023" },
                  { data: [51, 60, 47, 55], label: "2024" },
                  { data: [15, 25, 30, 22], label: "2025" },
                ]}
                height={300}
              />
            </Box>

            <Divider />

            {/* Stacked Bars */}
            <Box>
              <Typography variant="h6" gutterBottom>
                3. Barras Apiladas (stack)
              </Typography>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["Norte", "Sur", "Este", "Oeste"],
                  },
                ]}
                series={[
                  {
                    data: [40, 30, 25, 35],
                    label: "Producto A",
                    stack: "total",
                  },
                  {
                    data: [30, 25, 30, 25],
                    label: "Producto B",
                    stack: "total",
                  },
                  {
                    data: [20, 35, 20, 30],
                    label: "Producto C",
                    stack: "total",
                  },
                ]}
                height={300}
              />
            </Box>

            <Divider />

            {/* Horizontal Bars */}
            <Box>
              <Typography variant="h6" gutterBottom>
                4. Barras Horizontales (layout: horizontal)
              </Typography>
              <BarChart
                yAxis={[
                  {
                    scaleType: "band",
                    data: ["Marketing", "Ventas", "IT", "RRHH", "Finanzas"],
                  },
                ]}
                series={[
                  { data: [85, 72, 90, 65, 78], label: "Presupuesto %" },
                ]}
                layout="horizontal"
                height={300}
              />
            </Box>

            <Divider />

            {/* Custom Colors */}
            <Box>
              <Typography variant="h6" gutterBottom>
                5. Colores Personalizados
              </Typography>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["Exitoso", "Pendiente", "Fallido"],
                  },
                ]}
                series={[
                  {
                    data: [85, 12, 3],
                    color: "#4caf50",
                  },
                ]}
                colors={["#4caf50", "#ff9800", "#f44336"]}
                height={250}
              />
            </Box>

            <Divider />

            {/* With Grid */}
            <Box>
              <Typography variant="h6" gutterBottom>
                6. Con Grid y Negative Values
              </Typography>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
                  },
                ]}
                series={[
                  {
                    data: [15, -8, 22, -5, 18, -12],
                    label: "Balance",
                  },
                ]}
                grid={{ horizontal: true }}
                height={300}
              />
            </Box>
          </Stack>

          <Alert severity="info" sx={{ mt: 3 }}>
            💡 <strong>Props principales:</strong> <code>layout</code>{" "}
            (vertical/horizontal), <code>stack</code> para apilar,{" "}
            <code>grid</code> para líneas de referencia.
          </Alert>
        </Card>

        {/* SECCIÓN 16: SCATTER CHART */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            16. ScatterChart - Gráficos de Dispersión
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert severity="success" sx={{ mb: 3 }}>
            Gráficos de dispersión para visualizar correlaciones entre dos
            variables numéricas.
          </Alert>

          <Stack spacing={4}>
            {/* Basic Scatter */}
            <Box>
              <Typography variant="h6" gutterBottom>
                1. Dispersión Básica
              </Typography>
              <ScatterChart
                series={[
                  {
                    data: [
                      { x: 1, y: 2, id: 1 },
                      { x: 2, y: 5, id: 2 },
                      { x: 3, y: 3, id: 3 },
                      { x: 4, y: 8, id: 4 },
                      { x: 5, y: 6, id: 5 },
                      { x: 6, y: 9, id: 6 },
                      { x: 7, y: 4, id: 7 },
                    ],
                    label: "Serie A",
                  },
                ]}
                height={300}
              />
            </Box>

            <Divider />

            {/* Multiple Series */}
            <Box>
              <Typography variant="h6" gutterBottom>
                2. Múltiples Series
              </Typography>
              <ScatterChart
                series={[
                  {
                    data: [
                      { x: 10, y: 20, id: 1 },
                      { x: 25, y: 35, id: 2 },
                      { x: 40, y: 45, id: 3 },
                      { x: 55, y: 60, id: 4 },
                      { x: 70, y: 75, id: 5 },
                    ],
                    label: "Grupo A",
                  },
                  {
                    data: [
                      { x: 15, y: 40, id: 6 },
                      { x: 30, y: 55, id: 7 },
                      { x: 45, y: 30, id: 8 },
                      { x: 60, y: 50, id: 9 },
                      { x: 75, y: 65, id: 10 },
                    ],
                    label: "Grupo B",
                  },
                ]}
                height={300}
              />
            </Box>

            <Divider />

            {/* With Grid */}
            <Box>
              <Typography variant="h6" gutterBottom>
                3. Con Grid y Colores
              </Typography>
              <ScatterChart
                series={[
                  {
                    data: [
                      { x: 100, y: 200, id: 1 },
                      { x: 150, y: 280, id: 2 },
                      { x: 200, y: 350, id: 3 },
                      { x: 250, y: 420, id: 4 },
                      { x: 300, y: 380, id: 5 },
                    ],
                    label: "Ventas vs Clientes",
                    color: "#e91e63",
                  },
                ]}
                grid={{ horizontal: true, vertical: true }}
                height={300}
              />
            </Box>
          </Stack>

          <Alert severity="info" sx={{ mt: 3 }}>
            💡 <strong>Props principales:</strong> Cada punto necesita{" "}
            <code>x</code>, <code>y</code> e <code>id</code>.
          </Alert>
        </Card>

        {/* SECCIÓN 17: GAUGE */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            17. Gauge - Medidores
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert severity="success" sx={{ mb: 3 }}>
            Medidores circulares para mostrar progreso, KPIs y métricas de
            rendimiento.
          </Alert>

          <Stack spacing={4}>
            {/* Basic Gauge */}
            <Box>
              <Typography variant="h6" gutterBottom>
                1. Gauge Básico
              </Typography>
              <Stack direction="row" spacing={4} justifyContent="center">
                <Gauge value={75} height={200} width={200} />
                <Gauge value={45} height={200} width={200} />
                <Gauge value={90} height={200} width={200} />
              </Stack>
            </Box>

            <Divider />

            {/* With Text */}
            <Box>
              <Typography variant="h6" gutterBottom>
                2. Con Texto Personalizado
              </Typography>
              <Stack direction="row" spacing={4} justifyContent="center">
                <Gauge
                  value={68}
                  height={200}
                  width={200}
                  text={({ value }: { value: number }) => `${value}%`}
                />
                <Gauge
                  value={850}
                  valueMax={1000}
                  height={200}
                  width={200}
                  text={({ value }: { value: number }) => `${value}/1000`}
                />
              </Stack>
            </Box>

            <Divider />

            {/* Start/End Angles */}
            <Box>
              <Typography variant="h6" gutterBottom>
                3. Ángulos Personalizados
              </Typography>
              <Stack direction="row" spacing={4} justifyContent="center">
                <Box textAlign="center">
                  <Typography variant="caption">Semicírculo</Typography>
                  <Gauge
                    value={60}
                    startAngle={-90}
                    endAngle={90}
                    height={150}
                    width={200}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography variant="caption">270°</Typography>
                  <Gauge
                    value={80}
                    startAngle={-135}
                    endAngle={135}
                    height={150}
                    width={200}
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* Inner/Outer Radius */}
            <Box>
              <Typography variant="h6" gutterBottom>
                4. Radio Interior/Exterior
              </Typography>
              <Stack direction="row" spacing={4} justifyContent="center">
                <Box textAlign="center">
                  <Typography variant="caption">Delgado</Typography>
                  <Gauge
                    value={70}
                    innerRadius="80%"
                    outerRadius="100%"
                    height={180}
                    width={180}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography variant="caption">Grueso</Typography>
                  <Gauge
                    value={70}
                    innerRadius="50%"
                    outerRadius="100%"
                    height={180}
                    width={180}
                  />
                </Box>
              </Stack>
            </Box>
          </Stack>

          <Alert severity="info" sx={{ mt: 3 }}>
            💡 <strong>Props principales:</strong> <code>value</code>,{" "}
            <code>valueMax</code>, <code>startAngle/endAngle</code>,{" "}
            <code>innerRadius/outerRadius</code>, <code>text</code>.
          </Alert>
        </Card>

        {/* SECCIÓN 18: RADAR CHART */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            18. RadarChart - Gráficos de Radar
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert severity="success" sx={{ mb: 3 }}>
            Gráficos de radar para comparar múltiples variables en formato
            radial.
          </Alert>

          <Stack spacing={4}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Ejemplo de Radar
              </Typography>
              <RadarChart
                height={400}
                series={[{ data: [80, 95, 70, 85, 90] }]}
                radar={{
                  metrics: [
                    "Ventas",
                    "Marketing",
                    "Desarrollo",
                    "Soporte",
                    "RRHH",
                  ],
                }}
              />
            </Box>
          </Stack>
        </Card>

        {/* SECCIÓN 19: HEATMAP */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            19. Heatmap - Mapas de Calor
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert severity="success" sx={{ mb: 3 }}>
            Mapas de calor para visualizar densidad de datos en matrices.
          </Alert>

          <Stack spacing={4}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Ejemplo de Heatmap
              </Typography>
              <Heatmap
                height={300}
                xAxis={[{ data: ["Lun", "Mar", "Mié", "Jue", "Vie"] }]}
                yAxis={[{ data: ["Mañana", "Tarde", "Noche"] }]}
                series={[
                  {
                    data: [
                      [0, 0, 10],
                      [0, 1, 20],
                      [0, 2, 15],
                      [1, 0, 25],
                      [1, 1, 30],
                      [1, 2, 20],
                      [2, 0, 35],
                      [2, 1, 40],
                      [2, 2, 25],
                      [3, 0, 30],
                      [3, 1, 35],
                      [3, 2, 30],
                      [4, 0, 20],
                      [4, 1, 25],
                      [4, 2, 40],
                    ],
                  },
                ]}
              />
            </Box>
          </Stack>
        </Card>

        {/* SECCIÓN 20: FUNNEL CHART */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            20. FunnelChart - Gráficos de Embudo
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert severity="success" sx={{ mb: 3 }}>
            Gráficos de embudo para visualizar procesos de conversión.
          </Alert>

          <Stack spacing={4}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Embudo de Ventas
              </Typography>
              <FunnelChart
                height={350}
                series={[
                  {
                    data: [
                      { value: 1000, label: "Visitantes" },
                      { value: 750, label: "Leads" },
                      { value: 500, label: "Oportunidades" },
                      { value: 250, label: "Propuestas" },
                      { value: 100, label: "Ventas" },
                    ],
                  },
                ]}
              />
            </Box>
          </Stack>
        </Card>

        {/* SECCIÓN 21: SANKEY CHART */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            21. SankeyChart - Diagramas de Flujo
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert severity="success" sx={{ mb: 3 }}>
            Diagramas de Sankey para visualizar flujos entre categorías.
          </Alert>

          <Stack spacing={4}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Flujo de Tráfico
              </Typography>
              {/* <SankeyChart
                height={400}
                series={[
                  {
                    data: {
                      nodes: [
                        { id: "google", label: "Google" },
                        { id: "facebook", label: "Facebook" },
                        { id: "home", label: "Home Page" },
                        { id: "products", label: "Products" },
                        { id: "checkout", label: "Checkout" },
                      ],
                      links: [
                        { source: "google", target: "home", value: 500 },
                        { source: "facebook", target: "home", value: 300 },
                        { source: "home", target: "products", value: 600 },
                        { source: "products", target: "checkout", value: 400 },
                      ],
                    },
                  },
                ]}
              /> */}
            </Box>
          </Stack>
        </Card>

        {/* SECCIÓN 22: AREA CHART */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            22. AreaChart - Gráficos de Área
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert severity="success" sx={{ mb: 3 }}>
            Gráficos de área para mostrar tendencias acumulativas.
          </Alert>

          <Stack spacing={4}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Área Básica
              </Typography>
              <AreaChart
                xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8] }]}
                series={[
                  {
                    data: [2, 5, 3, 8, 1, 6, 4, 7],
                    label: "Ventas",
                    area: true,
                  },
                ]}
                height={300}
              />
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" gutterBottom>
                Áreas Apiladas
              </Typography>
              <AreaChart
                xAxis={[
                  {
                    data: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
                    scaleType: "band",
                  },
                ]}
                series={[
                  {
                    data: [40, 35, 50, 45, 60, 55],
                    label: "Web",
                    stack: "total",
                    area: true,
                  },
                  {
                    data: [30, 40, 35, 50, 45, 55],
                    label: "Mobile",
                    stack: "total",
                    area: true,
                  },
                  {
                    data: [20, 25, 30, 25, 35, 30],
                    label: "Desktop",
                    stack: "total",
                    area: true,
                  },
                ]}
                height={300}
              />
            </Box>
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
