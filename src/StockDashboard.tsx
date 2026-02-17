import { useState, useEffect, useCallback } from "react";
import {
  NuamThemeWrapper,
  DataGridPro,
  Typography,
  Card,
  Alert,
  Button,
} from "@nuam/common-fe-lib-components";
import { Box, Chip } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid-pro";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import RefreshIcon from "@mui/icons-material/Refresh";

// Tipos para los datos de acciones
interface Stock {
  id: number;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  sector: string;
}

// Datos iniciales de acciones
const initialStocks: Stock[] = [
  { id: 1, symbol: "AAPL", name: "Apple Inc.", price: 178.52, change: 2.34, changePercent: 1.33, volume: 52436789, marketCap: "2.8T", sector: "Tecnología" },
  { id: 2, symbol: "GOOGL", name: "Alphabet Inc.", price: 141.80, change: -1.25, changePercent: -0.87, volume: 21345678, marketCap: "1.8T", sector: "Tecnología" },
  { id: 3, symbol: "MSFT", name: "Microsoft Corp.", price: 378.91, change: 5.67, changePercent: 1.52, volume: 18234567, marketCap: "2.9T", sector: "Tecnología" },
  { id: 4, symbol: "AMZN", name: "Amazon.com Inc.", price: 178.25, change: -2.10, changePercent: -1.16, volume: 31234567, marketCap: "1.9T", sector: "Consumo" },
  { id: 5, symbol: "NVDA", name: "NVIDIA Corp.", price: 875.35, change: 15.20, changePercent: 1.77, volume: 41234567, marketCap: "2.2T", sector: "Tecnología" },
  { id: 6, symbol: "META", name: "Meta Platforms", price: 505.75, change: 8.45, changePercent: 1.70, volume: 15234567, marketCap: "1.3T", sector: "Tecnología" },
  { id: 7, symbol: "TSLA", name: "Tesla Inc.", price: 248.50, change: -5.30, changePercent: -2.09, volume: 71234567, marketCap: "790B", sector: "Automotriz" },
  { id: 8, symbol: "JPM", name: "JPMorgan Chase", price: 198.45, change: 1.85, changePercent: 0.94, volume: 8234567, marketCap: "572B", sector: "Finanzas" },
  { id: 9, symbol: "V", name: "Visa Inc.", price: 279.60, change: 3.20, changePercent: 1.16, volume: 6234567, marketCap: "574B", sector: "Finanzas" },
  { id: 10, symbol: "WMT", name: "Walmart Inc.", price: 165.80, change: -0.45, changePercent: -0.27, volume: 5234567, marketCap: "445B", sector: "Consumo" },
  { id: 11, symbol: "PG", name: "Procter & Gamble", price: 158.25, change: 0.95, changePercent: 0.60, volume: 4234567, marketCap: "373B", sector: "Consumo" },
  { id: 12, symbol: "JNJ", name: "Johnson & Johnson", price: 156.40, change: -1.10, changePercent: -0.70, volume: 3234567, marketCap: "377B", sector: "Salud" },
];

// Función para simular cambios de precio
const simulatePriceChange = (stock: Stock): Stock => {
  const changeAmount = (Math.random() - 0.5) * 4; // -2 a +2
  const newPrice = Math.max(1, stock.price + changeAmount);
  const newChange = changeAmount;
  const newChangePercent = (newChange / stock.price) * 100;

  return {
    ...stock,
    price: Number(newPrice.toFixed(2)),
    change: Number(newChange.toFixed(2)),
    changePercent: Number(newChangePercent.toFixed(2)),
    volume: stock.volume + Math.floor(Math.random() * 100000),
  };
};

// Formateador de números
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("es-CO").format(num);
};

// Formateador de moneda
const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
};

export default function StockDashboard() {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);
  const [isLive, setIsLive] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  // Simular actualizaciones en tiempo real
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => simulatePriceChange(stock))
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [isLive]);

  // Refrescar datos manualmente
  const handleRefresh = useCallback(() => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) => simulatePriceChange(stock))
    );
  }, []);

  // Definición de columnas con renderizado personalizado
  const columns: GridColDef<Stock>[] = [
    {
      field: "symbol",
      headerName: "Símbolo",
      width: 100,
      renderCell: (params) => (
        <Typography
          sx={{
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "name",
      headerName: "Empresa",
      width: 180,
      flex: 1,
    },
    {
      field: "sector",
      headerName: "Sector",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          variant="outlined"
          sx={{ fontSize: "0.75rem" }}
        />
      ),
    },
    {
      field: "price",
      headerName: "Precio",
      width: 120,
      type: "number",
      renderCell: (params) => (
        <Box
          sx={{
            fontWeight: "bold",
            fontFamily: "monospace",
            fontSize: "0.95rem",
          }}
        >
          {formatCurrency(params.value)}
        </Box>
      ),
    },
    {
      field: "change",
      headerName: "Cambio",
      width: 110,
      type: "number",
      renderCell: (params) => {
        const isPositive = params.value >= 0;
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: isPositive ? "success.main" : "error.main",
              fontWeight: "bold",
              fontFamily: "monospace",
            }}
          >
            {isPositive ? (
              <TrendingUpIcon fontSize="small" />
            ) : (
              <TrendingDownIcon fontSize="small" />
            )}
            {isPositive ? "+" : ""}
            {params.value.toFixed(2)}
          </Box>
        );
      },
    },
    {
      field: "changePercent",
      headerName: "% Cambio",
      width: 120,
      type: "number",
      renderCell: (params) => {
        const isPositive = params.value >= 0;
        return (
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              bgcolor: isPositive ? "success.light" : "error.light",
              color: isPositive ? "success.dark" : "error.dark",
              fontWeight: "bold",
              fontFamily: "monospace",
              fontSize: "0.85rem",
            }}
          >
            {isPositive ? "+" : ""}
            {params.value.toFixed(2)}%
          </Box>
        );
      },
    },
    {
      field: "volume",
      headerName: "Volumen",
      width: 130,
      type: "number",
      renderCell: (params) => (
        <Box sx={{ fontFamily: "monospace", fontSize: "0.9rem" }}>
          {formatNumber(params.value)}
        </Box>
      ),
    },
    {
      field: "marketCap",
      headerName: "Cap. Mercado",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color="primary"
          variant="outlined"
        />
      ),
    },
  ];

  return (
    <NuamThemeWrapper>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Stock Dashboard - DataGridPro Demo
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          Este ejemplo demuestra las capacidades avanzadas de DataGridPro con
          celdas personalizadas, colores dinámicos y actualización en tiempo
          real.
        </Alert>

        <Card sx={{ p: 3 }}>
          {/* Controles */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 3,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant={isLive ? "contained" : "outlined"}
              color={isLive ? "error" : "primary"}
              onClick={() => setIsLive(!isLive)}
              startIcon={isLive ? <TrendingDownIcon /> : <TrendingUpIcon />}
            >
              {isLive ? "Detener Live" : "Iniciar Live"}
            </Button>
            <Button
              variant="outlined"
              onClick={handleRefresh}
              startIcon={<RefreshIcon />}
            >
              Actualizar
            </Button>
            {isLive && (
              <Chip
                label="● EN VIVO"
                color="error"
                size="small"
                sx={{ animation: "pulse 1.5s infinite" }}
              />
            )}
          </Box>

          {/* Resumen de mercado */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              mb: 3,
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                p: 2,
                bgcolor: "success.light",
                borderRadius: 2,
                minWidth: 150,
              }}
            >
              <Typography variant="body2" sx={{ color: "success.dark" }}>
                Ganadores
              </Typography>
              <Typography variant="h5" sx={{ color: "success.dark" }} fontWeight="bold">
                {stocks.filter((s) => s.change > 0).length}
              </Typography>
            </Box>
            <Box
              sx={{
                p: 2,
                bgcolor: "error.light",
                borderRadius: 2,
                minWidth: 150,
              }}
            >
              <Typography variant="body2" sx={{ color: "error.dark" }}>
                Perdedores
              </Typography>
              <Typography variant="h5" sx={{ color: "error.dark" }} fontWeight="bold">
                {stocks.filter((s) => s.change < 0).length}
              </Typography>
            </Box>
            <Box
              sx={{
                p: 2,
                bgcolor: "grey.200",
                borderRadius: 2,
                minWidth: 150,
              }}
            >
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Sin cambio
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {stocks.filter((s) => s.change === 0).length}
              </Typography>
            </Box>
          </Box>

          {/* DataGridPro */}
          <Box sx={{ height: 600, width: "100%" }}>
            <DataGridPro
              rows={stocks}
              columns={columns}
              pagination
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10, page: 0 },
                },
                sorting: {
                  sortModel: [{ field: "changePercent", sort: "desc" }],
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              language="es"
              onRefresh={handleRefresh}
              showDownload={true}
              enableColumnMenu={true}
              checkboxSelection
              disableRowSelectionOnClick={false}
              onRowClick={(params: { row: Stock }) => setSelectedStock(params.row)}
              sx={{
                "& .MuiDataGrid-row:hover": {
                  bgcolor: "action.hover",
                },
                "& .MuiDataGrid-cell": {
                  display: "flex",
                  alignItems: "center",
                },
              }}
            />
          </Box>

          {/* Panel de detalle al seleccionar */}
          {selectedStock && (
            <Box
              sx={{
                mt: 3,
                p: 3,
                bgcolor: "grey.100",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">
                  {selectedStock.symbol} - {selectedStock.name}
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setSelectedStock(null)}
                >
                  Cerrar
                </Button>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Precio Actual
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {formatCurrency(selectedStock.price)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Cambio
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                      color: selectedStock.change >= 0 ? "success.main" : "error.main",
                    }}
                  >
                    {selectedStock.change >= 0 ? "+" : ""}
                    {selectedStock.change.toFixed(2)} (
                    {selectedStock.changePercent.toFixed(2)}%)
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Volumen
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {formatNumber(selectedStock.volume)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Cap. Mercado
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {selectedStock.marketCap}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Sector
                  </Typography>
                  <Chip label={selectedStock.sector} color="primary" />
                </Box>
              </Box>
            </Box>
          )}
        </Card>

        {/* CSS para animación */}
        <style>
          {`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}
        </style>
      </Box>
    </NuamThemeWrapper>
  );
}
