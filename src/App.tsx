import { useState } from "react";
import {
  DataGrid,
  NuamThemeWrapper,
  Alert,
  Card,
  Typography,
} from "@nuam/common-fe-lib-components";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Edit, Delete, Visibility, Print } from "@mui/icons-material";
import { IconButton, Chip, Box } from "@mui/material";

// Tipo para las filas del DataGrid
interface UserRow {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  role: string;
  status: "active" | "inactive" | "pending";
  salary: number;
  joinDate: string;
  department: string;
}

// Toolbar personalizado (definido fuera del componente)
const CustomToolbar = ({ userCount }: { userCount: number }) => (
  <Box sx={{ padding: 2, borderBottom: "1px solid #e0e0e0" }}>
    <Typography variant="h6" color="primary">
      Gestión de Usuarios
    </Typography>
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      Total de usuarios: {userCount}
    </Typography>
  </Box>
);

// Footer personalizado (definido fuera del componente)
const CustomFooter = () => (
  <Box sx={{ padding: 1, textAlign: "center" }}>
    <Typography variant="caption" sx={{ color: "text.secondary" }}>
      © 2024 NUAM - Sistema de gestión de empleados
    </Typography>
  </Box>
);

function App() {
  console.log("App component se está renderizando");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [rows, setRows] = useState<UserRow[]>([
    {
      id: 1,
      lastName: "Snow",
      firstName: "Jon",
      email: "jon.snow@winterfell.com",
      age: 35,
      role: "Manager",
      status: "active",
      salary: 75000,
      joinDate: "2020-01-15",
      department: "Operations",
    },
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      email: "cersei@kingslanding.com",
      age: 42,
      role: "Director",
      status: "active",
      salary: 120000,
      joinDate: "2018-03-22",
      department: "Executive",
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      email: "jaime@kingslanding.com",
      age: 45,
      role: "Security",
      status: "inactive",
      salary: 65000,
      joinDate: "2019-06-10",
      department: "Security",
    },
    {
      id: 4,
      lastName: "Stark",
      firstName: "Arya",
      email: "arya@winterfell.com",
      age: 16,
      role: "Intern",
      status: "pending",
      salary: 25000,
      joinDate: "2023-09-01",
      department: "Training",
    },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      email: "daenerys@dragonstone.com",
      age: 28,
      role: "CEO",
      status: "active",
      salary: 200000,
      joinDate: "2017-01-01",
      department: "Executive",
    },
    {
      id: 6,
      lastName: "Stark",
      firstName: "Sansa",
      email: "sansa@winterfell.com",
      age: 24,
      role: "HR Manager",
      status: "active",
      salary: 68000,
      joinDate: "2021-04-12",
      department: "Human Resources",
    },
    {
      id: 7,
      lastName: "Baratheon",
      firstName: "Robert",
      email: "robert@stormlands.com",
      age: 50,
      role: "Consultant",
      status: "inactive",
      salary: 95000,
      joinDate: "2015-11-30",
      department: "Consulting",
    },
    {
      id: 8,
      lastName: "Greyjoy",
      firstName: "Theon",
      email: "theon@ironislands.com",
      age: 32,
      role: "Developer",
      status: "active",
      salary: 72000,
      joinDate: "2020-07-18",
      department: "IT",
    },
  ]);

  // Columnas con diferentes tipos de renderizado
  const columns: GridColDef<UserRow>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      type: "number",
    },
    {
      field: "firstName",
      headerName: "Nombre",
      width: 130,
      editable: false,
    },
    {
      field: "lastName",
      headerName: "Apellido",
      width: 130,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
      editable: false,
    },
    {
      field: "age",
      headerName: "Edad",
      type: "number",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "department",
      headerName: "Departamento",
      width: 150,
    },
    {
      field: "role",
      headerName: "Rol",
      width: 120,
    },
    {
      field: "status",
      headerName: "Estado",
      width: 120,
      renderCell: (params: GridRenderCellParams<UserRow>) => {
        const statusColors = {
          active: "success",
          inactive: "error",
          pending: "warning",
        } as const;

        const statusLabels = {
          active: "Activo",
          inactive: "Inactivo",
          pending: "Pendiente",
        };

        return (
          <Chip
            label={statusLabels[params.value as keyof typeof statusLabels]}
            color={statusColors[params.value as keyof typeof statusColors]}
            size="small"
          />
        );
      },
    },
    {
      field: "salary",
      headerName: "Salario",
      type: "number",
      width: 120,
      valueFormatter: (value: number) => {
        return new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "USD",
        }).format(value);
      },
    },
    {
      field: "joinDate",
      headerName: "Fecha de Ingreso",
      width: 150,
      type: "date",
      valueGetter: (value: string) => new Date(value),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<UserRow>) => (
        <Box>
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleView(params.row)}
            title="Ver"
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="info"
            onClick={() => handleEdit(params.row)}
            title="Editar"
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
            title="Eliminar"
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  // Handlers para las acciones
  const handleView = (row: UserRow) => {
    setAlertMessage(`Ver detalles de: ${row.firstName} ${row.lastName}`);
    setShowAlert(true);
    console.log("Ver:", row);
  };

  const handleEdit = (row: UserRow) => {
    setAlertMessage(`Editando: ${row.firstName} ${row.lastName}`);
    setShowAlert(true);
    console.log("Editar:", row);
  };

  const handleDelete = (id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setAlertMessage(`Usuario con ID ${id} eliminado`);
    setShowAlert(true);
    console.log("Eliminar ID:", id);
  };

  const handleRefresh = () => {
    setAlertMessage("Datos actualizados");
    setShowAlert(true);
    console.log("Refrescando datos...");
  };

  const handleCustomDownload = () => {
    setAlertMessage("Descargando datos personalizados...");
    setShowAlert(true);
    console.log("Descarga personalizada");
  };

  const handleCustomAction = () => {
    setAlertMessage("Acción personalizada ejecutada");
    setShowAlert(true);
    console.log("Acción personalizada");
  };

  return (
    <NuamThemeWrapper>
      <div style={{ padding: "20px" }}>
        <Typography variant="h3" color="primary" gutterBottom>
          DataGrid - Ejemplo Completo con Todas las Funcionalidades
        </Typography>

        {/* Alert */}
        {showAlert && (
          <Alert
            severity="info"
            onClose={() => setShowAlert(false)}
            sx={{ marginBottom: 2 }}
          >
            {alertMessage}
          </Alert>
        )}

        {/* DataGrid Completo */}
        <Card sx={{ padding: 3, height: 700 }}>
          <div style={{ height: 650, width: "100%" }}>
            <DataGrid
              // Datos básicos
              rows={rows}
              columns={columns}
              // Paginación
              pagination
              paginationCounterProps={{
                color: "primary",
                page: 0,
                count: 10,
                onPageChange: () => {},
                onPageChangeCustom: (
                  _event: React.ChangeEvent<unknown>,
                  page: number
                ) => {
                  console.log("Página cambiada a:", page);
                },
              }}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5, page: 0 },
                },
              }}
              pageSizeOptions={[5, 10, 25, 50]}
              // Funciones del toolbar
              onRefresh={handleRefresh}
              handleDownload={handleCustomDownload}
              showDownload={true}
              // Idioma
              language="es"
              // Textos personalizados del toolbar
              toolbarText={{
                filters: "Filtros",
                columns: "Columnas",
                update: "Actualizar",
                autoSize: "Ajustar columnas",
                removeFilters: "Limpiar filtros",
                download: "Descargar CSV",
              }}
              // Menú items adicionales
              addMenuItems={[
                {
                  text: "Imprimir",
                  icon: <Print fontSize="small" />,
                  onClick: handleCustomAction,
                },
                {
                  text: "Acción personalizada",
                  onClick: handleCustomAction,
                },
              ]}
              // Toolbar y Footer personalizados
              customToolbar={<CustomToolbar userCount={rows.length} />}
              customFooter={CustomFooter}
              // Configuraciones adicionales
              checkboxSelection
              disableRowSelectionOnClick={false}
              // Densidad
              density="standard"
              // Columnas autoajustables
              autoHeight={false}
              // Estilos
              sx={{
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
              }}
            />
          </div>
        </Card>

        {/* Información de funcionalidades */}
        <Card sx={{ padding: 3, marginTop: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            Funcionalidades Incluidas en este DataGrid:
          </Typography>
          <Box component="ul" sx={{ lineHeight: 2 }}>
            <li>
              ✅ <strong>Paginación</strong> con contador personalizado
            </li>
            <li>
              ✅ <strong>Filtros</strong> por columna (click en "Filtros")
            </li>
            <li>
              ✅ <strong>Ordenamiento</strong> (click en headers de columnas)
            </li>
            <li>
              ✅ <strong>Mostrar/Ocultar columnas</strong> (click en "Columnas")
            </li>
            <li>
              ✅ <strong>Botón Actualizar/Refresh</strong>
            </li>
            <li>
              ✅ <strong>Descarga CSV</strong> (personalizable)
            </li>
            <li>
              ✅ <strong>Autoajuste de columnas</strong> (menú "...")
            </li>
            <li>
              ✅ <strong>Limpiar filtros</strong> (menú "...")
            </li>
            <li>
              ✅ <strong>Menú items personalizados</strong> (menú "...")
            </li>
            <li>
              ✅ <strong>Toolbar personalizado</strong> (header superior)
            </li>
            <li>
              ✅ <strong>Footer personalizado</strong> (pie de página)
            </li>
            <li>
              ✅ <strong>Selección con checkboxes</strong>
            </li>
            <li>
              ✅ <strong>Columnas con renderizado custom</strong> (Chips de
              estado)
            </li>
            <li>
              ✅ <strong>Formateo de valores</strong> (salario en formato
              moneda)
            </li>
            <li>
              ✅ <strong>Columna de acciones</strong> (Ver, Editar, Eliminar)
            </li>
            <li>
              ✅ <strong>Diferentes tipos de datos</strong> (texto, número,
              fecha)
            </li>
            <li>
              ✅ <strong>Textos traducibles</strong> (español/inglés)
            </li>
            <li>
              ✅ <strong>Tamaños de página configurables</strong> (5, 10, 25,
              50)
            </li>
          </Box>
        </Card>
      </div>
    </NuamThemeWrapper>
  );
}

export default App;
