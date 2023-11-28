import React, { useState } from 'react';
import './HospitalForm.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { db } from '../../../firebase';
import {
    collection,
    addDoc,
    serverTimestamp
} from 'firebase/firestore';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const HospitalForm = () => {
    const [hospital, setHospital] = useState(
        {
            name: '',
            address: '',
            pincode: ''
        }
    );
    const [open, setOpen] = useState(false);
    
    const handleChange = (e) => {
        setHospital({ ...hospital, [e.target.name]: e.target.value });
    };

    const submitHandler = async (event) => {
        console.log("Saved Data is : ", hospital, serverTimestamp());
        event.preventDefault();
        try {
            await addDoc(collection(db, 'hospital'), {
                ...hospital,
                createTime: serverTimestamp()
            })

        } catch (err) {
            alert(err)
        }
        setHospital({
            name: '',
            address: '',
            pincode: ''
        });
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 2500);
    }
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='hospital-form'>
            <Box align='center'
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '65ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Typography variant="h4" color="#555" gutterBottom mt={5}>
                    Hospital Information
                </Typography>
                <div>
                    <TextField
                        label="Hospital Name"
                        placeholder="Enter Hospital Name"
                        value={hospital.name}
                        name="name"
                        id="name"
                        onChange={handleChange}
                        multiline

                    />
                </div>
                <div>
                    <TextField
                        label="Hospital Address"
                        placeholder="Enter Hospital Address"
                        value={hospital.address}
                        name="address"
                        id="address"
                        onChange={handleChange}
                        multiline
                    />
                </div>
                <div>
                    <TextField
                        label="Hospital Pincode"
                        placeholder="Enter Hospital Pincode"
                        value={hospital.pincode}
                        name="pincode"
                        id="pincode"
                        onChange={handleChange}
                        multiline
                    />
                </div>
                <div align='center'>
                    <Button variant="contained" onClick={submitHandler}>
                        Save
                    </Button>
                </div>
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
            </Box>
        </div>
    )
}

export default HospitalForm