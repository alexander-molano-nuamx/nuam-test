import { useState } from "react";
import { Box, Collapse, IconButton, Tooltip } from "@mui/material";
import { Typography } from "@nuam/common-fe-lib-components";
import { ContentCopy, Check, Code, CodeOff } from "@mui/icons-material";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

SyntaxHighlighter.registerLanguage("tsx", tsx);

interface CodeExampleProps {
  title?: string;
  code: string;
  children: React.ReactNode;
}

export const CodeExample: React.FC<CodeExampleProps> = ({
  title,
  code,
  children,
}) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
        mb: 2,
      }}
    >
      {/* Header */}
      {title && (
        <Box
          sx={{
            px: 2,
            py: 1,
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "background.default",
          }}
        >
          <Typography variant="subtitle2">{title}</Typography>
        </Box>
      )}

      {/* Preview */}
      <Box sx={{ p: 3 }}>{children}</Box>

      {/* Toolbar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 0.5,
          px: 1,
          py: 0.5,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "background.default",
        }}
      >
        <Tooltip title={copied ? "¡Copiado!" : "Copiar código"}>
          <IconButton size="small" onClick={handleCopy}>
            {copied ? (
              <Check fontSize="small" color="success" />
            ) : (
              <ContentCopy fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title={showCode ? "Ocultar código" : "Mostrar código"}>
          <IconButton size="small" onClick={() => setShowCode(!showCode)}>
            {showCode ? (
              <CodeOff fontSize="small" />
            ) : (
              <Code fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Code block */}
      <Collapse in={showCode}>
        <Box sx={{ position: "relative", maxHeight: 400, overflow: "auto" }}>
          <SyntaxHighlighter
            language="tsx"
            style={atomOneDark}
            customStyle={{ margin: 0, borderRadius: 0, fontSize: 13 }}
            showLineNumbers
          >
            {code.trim()}
          </SyntaxHighlighter>
        </Box>
      </Collapse>
    </Box>
  );
};
