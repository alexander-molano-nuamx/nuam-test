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

const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
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
                              onChange={(value) =>
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
                            onChange={(value) =>
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
                            onChange={(value) =>
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
                  renderCell: (params) => (
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
                  onExpandedItemsChange={(_, itemIds) =>
                    setTreeExpandedItems(itemIds)
                  }
                  selectedItems={treeSelectedItems}
                  onSelectedItemsChange={(_, itemIds) =>
                    setTreeSelectedItems(itemIds)
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

        {/* Footer */}
        <Alert severity="success">
          ¡Componentes principales de NUAM funcionando correctamente! 🎉
        </Alert>
      </Box>
    </NuamThemeWrapper>
  );
}
