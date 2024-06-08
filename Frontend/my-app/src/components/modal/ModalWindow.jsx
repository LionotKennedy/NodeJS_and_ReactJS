import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Stack, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModalWindow = ({ open, onClose, onSubmit, refresh }) => {
  const [name, setName] = useState('');
  const [solde, setSolde] = useState('');
  var status;
  const navigate = useNavigate();

  const [clients, setClient] = useState([]);
    const [total, setTotal] = useState([]);
    const [maxi, setMaxi] = useState([]);
    const [mini, setMini] = useState([]);

  // ************ ACTUALISER  ***********//
  const refreshc = () => {
    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:4321/");
            console.log(res);
            setClient(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    fetchData()

    const fetchTotal = async () => {
        try {
            const res = await axios.get("http://localhost:4321/total");
            console.log(res);
            setTotal(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    fetchTotal()

    const fetchMax = async () => {
        try {
            const res = await axios.get("http://localhost:4321/maximal");
            console.log(res);
            setMaxi(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    fetchMax()

    const fetchMin = async () => {
        try {
            const res = await axios.get("http://localhost:4321/minimal");
            console.log(res);
            setMini(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    fetchMin()

}

  const handleSubmit = (event) => {
    event.preventDefault();

    // Vérifiez si les champs sont vides
    if (!name || !solde) {
      // Affichez un message d'erreur avec Toastify
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    // ccondition pour la status
    if (solde < 1000) {
      status = "insuffisant";
      console.log(status);
    } else if (solde <= 1000 || solde <= 5000) {
      status = "moyen";
      console.log(status);

    } else {
      status = "éléve";
      console.log(status);
    }

    // Soumettez les données
    onSubmit({ name, solde });
    console.log(name);
    console.log(solde);

    event.preventDefault();
        axios.post("http://localhost:4321/create", {name, solde, status})
        .then(res => {
            console.log(res);
            navigate('/admin/operation');
            // location.reload();
            toast.success("Ajout avec succes");
            refresh();
        }).catch(err => console.log(err));

    // Réinitialisez les champs à une chaîne vide après la soumission
    setName('');
    setSolde('');
    refresh();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Ajouter des Clients Modal
        <IconButton onClick={onClose} style={{ float: 'right' }}>
          <CloseIcon color="primary" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} margin={2}>
          <TextField
            variant="outlined"
            label="Nom"
            name="name"
            onChange={(e) => setName(e.target.value)}
            style={{ borderColor: 'purple' }}
          />
          <TextField
            variant="outlined"
            label="Solde"
            name="solde"
            onChange={(e) => setSolde(e.target.value)}
            style={{ borderColor: 'purple' }}
          />
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Valider
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>{/* Ajoutez des boutons d'actions ici si nécessaire */}</DialogActions>
    </Dialog>
  );
};

export default ModalWindow;
