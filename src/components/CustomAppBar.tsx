import React from "react";
import AppBar from "@mui/material/AppBar";
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Link,
} from "@mui/material";

const settings = [
  "Dagens Ledtråd",
  "Packlista",
  "Aktiviteter",
  "Tidigare Ledtrådar",
  "Karta",
];

function CustomAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link
              href={"/"}
              sx={{
                textDecoration: "none",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Daria 29 år
              </Typography>
            </Link>
            <Tooltip title="Navigering">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Daria"
                  src="https://media.licdn.com/dms/image/D4D03AQENBydqElgDag/profile-displayphoto-shrink_400_400/0/1672908317324?e=1709769600&v=beta&t=tSC-p461Z7qEfsAwmpC3cYEZNDwzHq74qcZ3Pr5_KVs"
                />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting}>
                <Link
                  href={setting.toLowerCase().replace(" ", "-")}
                  sx={{
                    textDecoration: "none",
                    color: (theme) => theme.palette.text.primary,
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default CustomAppBar;
