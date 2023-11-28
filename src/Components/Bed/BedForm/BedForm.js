import React, { useState } from 'react';
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


const BedForm = ({hospital}) => {
    const [bed, setBed] = useState(
        {
            name: '',
            category: '',
            rate: ''
        }
    );
    const [open, setOpen] = useState(false);
    
    const handleChange = (e) => {
        setBed({ ...bed, [e.target.name]: e.target.value });
    };

    const submitHandler = async (event) => {
        console.log("Saved Data is : ", bed, serverTimestamp());
        const hospitalRef = collection(db, 'hospital');
        event.preventDefault();
        try {
            await addDoc(collection(hospitalRef,hospital.id , hospital.data.name), {
                ...bed,
                createTime: serverTimestamp()
            })

        } catch (err) {
            alert(err)
        }
        setBed({
            name: '',
            category: '',
            rate: ''
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
        <div className='bed-form'>
            <Box align='center'
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '65ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Typography variant="h4" gutterBottom mt={5}>
                    Bed Information
                </Typography>
                <div>
                    <TextField
                        label="Bed Name"
                        placeholder="Enter Bed Name"
                        value={bed.name}
                        name="name"
                        id="name"
                        onChange={handleChange}
                        multiline

                    />
                </div>
                <div>
                    <TextField
                        label="Bed Category"
                        placeholder="Enter Bed Category"
                        value={bed.category}
                        name="category"
                        id="category"
                        onChange={handleChange}
                        multiline
                    />
                </div>
                <div>
                    <TextField
                        label="Bed Rate in INR/Day"
                        placeholder="Enter Bed Rate in INR/Day"
                        value={bed.rate}
                        name="rate"
                        id="rate"
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

export default BedForm;