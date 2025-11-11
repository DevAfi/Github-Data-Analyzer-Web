import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Hero({ onAnalyze, loading }) {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (owner && repo && !loading) {
      onAnalyze(owner, repo);
    }
  };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <GitHubIcon sx={{ fontSize: "3rem", color: "primary.main" }} />
          </Box>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "center",
              fontSize: "clamp(2.5rem, 8vw, 4rem)",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            Analyze&nbsp;any&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: "inherit",
                color: "primary.main",
                fontWeight: "inherit",
                ...theme.applyStyles("dark", {
                  color: "primary.light",
                }),
              })}
            >
              GitHub
            </Typography>
            &nbsp;repository
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              width: { sm: "100%", md: "80%" },
              fontWeight: 400,
              mt: 1,
            }}
          >
            Get deep insights into repository health, commit activity, contributors, and language distribution
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              pt: 4,
              width: { xs: "100%", sm: "600px" },
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              useFlexGap
              sx={{ alignItems: "stretch" }}
            >
              <TextField
                label="Owner"
                placeholder="facebook"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                disabled={loading}
                fullWidth
                size="large"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.paper",
                  },
                }}
              />
              <TextField
                label="Repository"
                placeholder="react"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                disabled={loading}
                fullWidth
                size="large"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.paper",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={loading || !owner || !repo}
                startIcon={<SearchIcon />}
                sx={{
                  minWidth: { xs: "100%", sm: "150px" },
                  py: 1.5,
                  fontSize: "1rem",
                }}
              >
                {loading ? "Analyzing..." : "Analyze"}
              </Button>
            </Stack>
          </Box>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mt: 2,
              fontStyle: "italic",
            }}
          >
            Enter any public GitHub repository to get started
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
