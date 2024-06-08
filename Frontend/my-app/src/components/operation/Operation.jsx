import './operation.css'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModalWindow from "../modal/ModalWindow";
import ReactPaginate from 'react-paginate';

// coucou
import img1 from "../../assets/add.png";
import img2 from "../../assets/delete.png";
import img3 from "../../assets/edit.png";




const Operation = () => {
    const navigate = useNavigate();
    const [clients, setClient] = useState([]);
    const [total, setTotal] = useState([]);
    const [maxi, setMaxi] = useState([]);
    const [mini, setMini] = useState([]);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [deletionId, setDeletionId] = useState(null);
    const [openUpdate, setOpenUpdate] = useState(null);
    const [updateId, setUpdateId] = useState(null);
    const [update, setUpdate] = useState([]);
    const [solde, setSolde] = useState('')
    var status

    // ************* PAGINATE ***************//
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 7; // Nombre d'éléments par page
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = clients.slice(indexOfFirstItem, indexOfLastItem);
    // ************* ENDING ***************//


    // ************* REFRESH DATA FROM SERVER ***************//
    const refresh = () => {
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
    // ************* ENDING ***************//



    // ************* FETCH DATA FROM SERVER ***************//
    useEffect(() => {
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

    }, [])
    // ************* ENDING ***************//



    // ************* DELETE DATA FROM SERVER ***************//
    const handleDelete = (id) => {
        setDeletionId(id);
        setOpenConfirmationDialog(true);
        refresh();
    }

    const handleConfirmationDialogClose = () => {
        setOpenConfirmationDialog(false);
        refresh();
    }

    const handleConfirmDelete = async () => {
        try {
            await axios.delete("http://localhost:4321/delete/" + deletionId);
            setClient(clients.filter(data => data.idclient !== deletionId));
            setOpenConfirmationDialog(false);

            // Ajoutez la notification Toastify ici
            toast.success("Client supprimé avec succès!");
            refresh();
        } catch (err) {
            console.log(err);
            toast.error("Erreur lors de la suppression du client");
            refresh();
        }
    }
    // ************* ENDING ***************//




    // ************* PAGINATION ***************//
    useEffect(() => {
        refresh();
    }, [currentPage]); // Rafraîchir lorsque la page change
    // ************* ENDING ***************//



    // *************** SHOW MODAL ADD ******************//
    const [open, setOpen] = useState(false);
    const handleOpenPopup = () => {
        setOpen(true);
        refresh();
    }
    const handleClosePopup = () => {
        setOpen(false);
        refresh();
    }
    const handleSubmitModal = async ({ name, solde }) => {
        // Code pour traiter la soumission du formulaire modal
        // ...

        // Fermer la fenêtre modale après la soumission
        handleClosePopup();
        refresh();
    };
    // ************* ENDING ***************//



    // *************** SHOW MODAL UPDATE ******************// 
    const [values, setValues] = useState({
        name: '',
        solde: ''
    });

    const UpdateMadalOpen = async (id) => {
        setUpdateId(id);
        console.log(id);
        try {
            const res = await axios.get("http://localhost:4321/read/" + id)
            console.log(res);
            setUpdate(res.data);
            setValues({ ...values, name: res.data[0].nameclient, solde: res.data[0].soldeclient })
            refresh();
        } catch (err) {
            console.log(err)
        }
        const teste = id;
        console.log("Coucou " + teste);
        setOpenUpdate(true);
        refresh();
    }


    const UpdateModalClose = () => {
        setOpenUpdate(false);
        refresh();
    }

    const UpdateValue = (id) => {
        setUpdateId(id);
        const soldes = values.solde
        const names = values.name
        console.log("Coucou id = " + id);
        console.log("Coucou" + soldes);
        console.log("Coucou_2" + names);
        if (soldes < 1000) {
            status = "insuffisant";
            console.log("Coucou_3" + status);
            console.log("Coucou_4" + solde);
        } else if (soldes <= 1000 || soldes <= 5000) {
            status = "moyen";
            console.log(status);

        } else {
            status = "éléve";
            console.log(status);
        }

        // event.preventDefault();
        axios.put("http://localhost:4321/update/" + id, { names, soldes, status })
            .then(res => {
                console.log(res);
                toast.success("Client Modifier avec succès!");
                refresh();
            }).catch(err => console.log(err));

        UpdateModalClose();
        refresh();

    }
    // ************* ENDING ***************//


    return (
        <>
            <div>
                <div>
                    <div className='titleCom'>Gestion Client Bancaire</div> 
                    <div className='btnAdd'>
                        <span>
                        {/* <Button onClick={handleOpenPopup} color="primary" variant="contained">Ajoter</Button> */}
                        {/* <Button onClick={handleOpenPopup} color="primary" variant="contained" startIcon={<AddIcon />}></Button> */}
                        {/* <Button
                            onClick={handleOpenPopup}
                            variant="contained"
                            color="primary"
                            style={{ backgroundColor: '#00FF00', color: '#FFFFFF' }}
                            startIcon={<AddIcon />}
                        /> */}
                        </span>
                        <img src={img1} alt="" onClick={handleOpenPopup} className='img1' />


                        {/* Utilisez le composant ModalComponent */}
                        <ModalWindow open={open} onClose={handleClosePopup} onSubmit={handleSubmitModal} refresh={refresh} />

                    </div>
                    <table className='table'>
                        <thead className="headerTable">
                            <tr className='colorBG'>
                                <th scope="col"># </th>
                                <th scope="col">Nom </th>
                                <th scope="col">Solde </th>
                                <th scope="col">Status </th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {currentItems.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.idclient}</td>
                                    <td>{data.nameclient}</td>
                                    <td>{data.soldeclient}</td>
                                    <td>{data.soldestatus}</td>
                                    <td>
                                        <span>

                                        {/* <Button onClick={() => UpdateMadalOpen(data.idclient)} color="primary" variant="contained">Modification</Button><span> </span> */}
                                        {/* <Button onClick={() => handleDelete(data.idclient)} color="primary" variant="contained">Delete</Button> */}
                                        {/* <Button onClick={() => UpdateMadalOpen(data.idclient)} color="primary" variant="contained" startIcon={<EditIcon />}></Button><span> </span> */}
                                        {/* <Button
                                                onClick={() => UpdateMadalOpen(data.idclient)}
                                                variant="contained"
                                                color="primary"
                                                style={{ backgroundColor: '#0000FF', color: '#FFFFFF' }}
                                                startIcon={<EditIcon />}
                                                /><span> </span>
                                                
                                                <Button
                                                onClick={() => handleDelete(data.idclient)}
                                                variant="contained"
                                                color="primary"
                                                style={{ backgroundColor: '#FF0000', color: '#FFFFFF' }}
                                                startIcon={<DeleteIcon />}
                                            /> */}
                                         </span>
                                        <img src={img3} alt="" onClick={() => UpdateMadalOpen(data.idclient)} className='img2' /><span className='espace'></span>
                                        <img src={img2} alt="" onClick={() => handleDelete(data.idclient)} className='img3' />

                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                    <div className="posission">
                        <ReactPaginate
                            previousLabel={"<< Précédent"}
                            nextLabel={"Suivant >>"}
                            pageCount={Math.ceil(clients.length / itemsPerPage)}
                            onPageChange={({ selected }) => setCurrentPage(selected)}
                            containerClassName={"pagination"}
                            previousLinkClassName={"pagination__link"}
                            nextLinkClassName={"pagination__link"}
                            disabledClassName={"pagination__link--disabled"}
                            previousClassName={currentPage === 0 ? "pagination__link--disabled pagination__link" : "pagination__link"}
                            nextClassName={currentPage === Math.ceil(clients.length / itemsPerPage) - 1 ? "pagination__link--disabled pagination__link" : "pagination__link"}
                        />
                    </div>
                </div>

            </div>
            <div className='footer'>
                <div className='spanFooter'>
                    {
                        total.map((datas, i) => (
                            <div key={i}>
                                <span>Total = {datas.total} Ariary</span>
                            </div>
                        ))
                    }
                </div>
                <div className='spanFooter'>
                    {
                        maxi.map((resul, i) => (
                            <div key={i}>
                                <span>Maximal = {resul.max} Ariary</span>
                            </div>
                        ))
                    }
                </div>
                <div className='spanFooter'>
                    {
                        mini.map((results, i) => (
                            <div key={i}>
                                <span>Minimal = {results.min} Ariary</span>
                            </div>
                        ))
                    }
                </div>
            </div>

            <Dialog
                open={openConfirmationDialog}
                onClose={handleConfirmationDialogClose}
            >
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    Êtes-vous sûr de vouloir supprimer ce client ?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmationDialogClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary">
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>

            <ToastContainer position='top-center' theme='dark' transition={Zoom} />

            {/* UPDATE MODAL */}


            <Dialog open={openUpdate} onClose={UpdateModalClose} fullWidth maxWidth="sm">
                <DialogTitle>Modifiaction des Clients <p onClick={UpdateModalClose} style={{ float: 'right' }}><CloseIcon color="primary"></CloseIcon></p> </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} margin={2}>
                        <TextField
                            variant="outlined"
                            label="Nom"
                            name="name"
                            onChange={e => setValues({ ...values, name: e.target.value })}
                            value={values.name}
                        />

                        <TextField
                            variant="outlined"
                            label="Solde"
                            name="solde"
                            onChange={e => setValues({ ...values, solde: e.target.value })}
                            value={values.solde}
                        />
                        {
                            update.map((data, i) => (
                                <span key={i}>
                                    <Button color="primary" variant="contained" onClick={() => UpdateValue(data.idclient)}>Valider</Button>
                                </span>
                            ))
                        }

                    </Stack>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default Operation;
