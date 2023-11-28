import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase'
// import './BedTableEdit.css';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {
    doc,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from 'firebase/firestore';


const BedTableEdit = ({ initialHospitalValue }) => {
    const [open, setOpen] = useState(false);
    const [confirm, setConform] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialHospitalValue.data.name);
    const [category, setCategory] = useState(initialHospitalValue.data.category);
    const [rate, setRate] = useState(initialHospitalValue.data.rate);
    const navigation = useNavigate();
    const editHandler = () => {
        setIsEditing(true);
    };

    const saveHandler = async () => {
        // setIsEditing(false);
        // const docRef = doc(db, "hospital", initialHospitalValue.id);
        // try {
        //     await updateDoc(docRef, {
        //         name,
        //         category,
        //         rate,
        //         updateTime: serverTimestamp()
        //     })
        // }
        // catch (err) {
        //     console.log(err);
        // }
        // setOpen(true);
        // setTimeout(() => {
        //     setOpen(false);
        // }, 2500);
    };

    const deletHandlerConform = () => {
        setConform(true)
    }
    const deletHandler = async () => {
        // const docRef = doc(db, "hospital", initialHospitalValue.id);
        // try {
        //     await deleteDoc(docRef);
        // } catch (err) {
        //     console.log(err);
        // }
        setConform(false);
    }

    const handleClose = () => {
        setOpen(false);
        setConform(false);
    };

    return (
        <>
            <TableRow
                className='hospital-table-edit'
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

            >
                <TableCell component="th" scope="row"

                    onClick={() => {
                        if (!isEditing) {
                            navigation('/bed', { state: initialHospitalValue })
                        }
                    }}
                >

                    {isEditing ? (
                        <Input
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                            value={name}
                        />
                    ) : (
                        name
                    )}
                </TableCell>
                <TableCell
                    onClick={() => {
                        if (!isEditing) {
                            navigation('/bed', { state: initialHospitalValue })
                        }
                    }}
                >
                    {isEditing ? (
                        <Input
                            autoFocus
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    ) : (
                        category
                    )}
                </TableCell>
                <TableCell
                    onClick={() => {
                        if (!isEditing) {
                            navigation('/bed', { state: initialHospitalValue })
                        }
                    }}
                >
                    {isEditing ? (
                        <Input
                            autoFocus
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                        />
                    ) : (
                        rate
                    )}
                </TableCell>
                <TableCell align="right">
                    <Stack direction="row" spacing={1}>

                        {isEditing ? (
                            <Button variant="contained" onClick={saveHandler} >
                                <SaveIcon />
                            </Button>
                        ) : (
                            <Button variant="contained" onClick={editHandler} >
                                <EditIcon />
                            </Button>
                        )}
                        <Button variant="contained" onClick={deletHandlerConform} >
                            <DeleteIcon />
                        </Button>
                    </Stack>
                </TableCell>
                {/*For Save  Dialog Box*/}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Form Saved</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Your form data has been successfully saved.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                {/*For Delete  Dialog Box*/}
                <Dialog open={confirm} onClose={handleClose}>
                    <DialogTitle>Conform Delete </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Conform Delete <b>{name}</b> Hospital Inforamation?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            No
                        </Button>
                        <Button onClick={deletHandler} color="error" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </TableRow>
        </>
    )

}

export default BedTableEdit;

