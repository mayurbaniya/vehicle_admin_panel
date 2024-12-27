import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { BASE_URL } from "../../../URL";
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';

const ManageBrand = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [newBrand, setNewBrand] = useState({ name: "" });
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    fetch(BASE_URL + '/admin/brand/all')
      .then((response) => response.json())
      .then((data) => {
        const brandsData = data.data.content;
        if (Array.isArray(brandsData)) {
          setBrands(brandsData);
        } else {
          setBrands([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setBrands([]);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredBrands = brands.filter((brand) => {
    if (filter === "enable") return brand.status === 1; 
    if (filter === "disable") return brand.status === 99; 
    return true; 
  });

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setResponseMessage("");
    setNewBrand({ name: "" });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBrand({ ...newBrand, [name]: value });
  };

  const handleFormSubmit = () => {
    const baseURL = BASE_URL + '/admin/brand/add';
    const queryParam = "?brandName=" + newBrand.name;
    const fullURL = baseURL + queryParam;

    axios
      .post(fullURL)
      .then(response => {
        const message = response.data.msg || "Brand added successfully!";
        setResponseMessage(message);
      })
      .catch(error => {
        if (error.response) {
          setResponseMessage(`Error: ${error.response.data.msg || "Something went wrong."}`);
        } else if (error.request) {
          setResponseMessage("Error: No response from server.");
        } else {
          setResponseMessage(`Error: ${error.message}`);
        }
      });
  };

  const deleteBrand = (brandID) => {
    axios
      .delete(`${BASE_URL}/admin/brand/delete?brandID=${brandID}`)
      .then((response) => {
        setBrands(brands.filter((brand) => brand.id !== brandID));
      })
      .catch((error) => {
        console.error("Error deleting brand:", error);
      });
  };

  const handleStatusChange = (brandID, status) => {
    const updatedStatus = status === 1 ? 99 : 1;
    axios
      .put(`${BASE_URL}/admin/brand/status?brandID=${brandID}&status=${updatedStatus}`)
      .then((response) => {
        setBrands(brands.map((brand) => 
          brand.id === brandID ? { ...brand, status: updatedStatus } : brand
        ));
      })
      .catch((error) => {
        console.error("Error updating brand status:", error);
      });
  };

  const handleDetails = (brandID) => {
    console.log("View details for brand:", brandID);
    // Implement the details view functionality here
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ padding: "10px" }}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex" role="search">
              <select
                className="form-select me-2"
                aria-label="Search Options"
                onChange={handleFilterChange}
                value={filter}
                style={{ maxWidth: "200px" }}
              >
                <option value="all">All</option>
                <option value="enable">Enable</option>
                <option value="disable">Disable</option>
              </select>
              <button
                className="btn btn-outline-success"
                onClick={(e) => {
                  e.preventDefault();
                  handleDialogOpen();
                }}
                type="button"
              >
                ADD
              </button>
            </form>
          </div>
        </div>
      </nav>

      <Grid container spacing={1} justifyContent="center" sx={{ padding: "15px" }}>
        {loading ? (
          <Typography variant="h6" align="center" sx={{ width: '100%' }}>Loading Brands...</Typography>
        ) : (
          filteredBrands.map((brand) => (
            <Grid item xs={6} sm={6} md={4} lg={2.4} key={brand.id}>
              <Card
                sx={{
                  maxWidth: 200,
                  height: 330,
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: `0px 2px 6px ${brand.status === 1 ? 'green' : '#e74c3c'}`,
                  border: brand.status === 1 ? '2px solid green' : '2px solid #e74c3c',
                  backgroundColor: brand.status === 1 ? '#e8f5e9' : '#fbe9e7',
                  position: 'relative',
                   transition: 'all 0.3s ease',
                  '&:hover': {
      transform: 'scale(1.05)', // Slightly enlarge the card on hover
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Apply stronger shadow
      borderColor: '#3498db', // Change border color on hover
    }
                }}
              >
                <CardActionArea sx={{ display: 'flex', flexDirection: 'column', height: '160' }}>
                  <CardMedia
                    component="img"
                    height="120"
                    image={brand.imageURL || "https://via.placeholder.com/150"}
                    alt={brand.name}
                    sx={{
                      objectFit: 'contain',
                      width: '100%',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: '#34495e', fontWeight: 'bold' }}>
                      {brand.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      {brand.status === 1 ? "Active" : "Inactive"}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Grid container spacing={1} justifyContent="center" sx={{ padding: "5px", backgroundColor: '#ecf0f1', height: '100px' }}>
                  <Grid item xs={6}>
                    <FormControlLabel
                      sx={{ display: 'block', margin: '1px' }}
                      control={
                        <Switch
                          checked={brand.status === 1}
                          onChange={() => handleStatusChange(brand.id, brand.status)}
                          name="loading"
                          color="primary"
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      //style={{ backgroundColor: "#3498db", color: 'white' }}
                      style={{ backgroundColor: "#e74c3c", color: 'white' }}
                      variant="outlined"
                      fullWidth
                      //onClick={() => handleDetails(brand.id)}
                      onClick={() => deleteBrand(brand.id)}
                      sx={{ width: '10px', height: '22px', fontSize: '12px' }}
                    >
                      <DeleteIcon/>
                    </Button>
                  </Grid>

                  <Grid item xs={6}>
                    <Button
                     style={{ backgroundColor: "#3498db", color: 'white' }}
                      variant="outlined"
                      fullWidth
                      //onClick={() => deleteBrand(brand.id)}
                      sx={{ width: '10px', height: '22px', fontSize: '12px' }}
                    >
                      <AddPhotoAlternateIcon/>
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      style={{ backgroundColor: "#e74c3c", color: 'white' }}
                      variant="outlined"
                      fullWidth
                     // onClick={() => deleteBrand(brand.id)}
                      sx={{ width: '10px', height: '25px', fontSize: '12px' }}
                    >
                      <FolderDeleteIcon/>
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Brand</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to add a new brand.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Brand Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newBrand.name}
            onChange={handleInputChange}
          />
          {responseMessage && typeof responseMessage === 'string' && (
            <Typography
              variant="body2"
              color={responseMessage.startsWith("Error") ? "error" : "primary"}
              sx={{ marginTop: 2 }}
            >
              {responseMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleFormSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageBrand;
