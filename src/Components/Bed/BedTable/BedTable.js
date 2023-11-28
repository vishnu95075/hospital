import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import './BedTable.css';
import BedTableEdit from './BedTableEdit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
    collection,
    query,
    onSnapshot
} from 'firebase/firestore';

const BedTable = ({ hospital }) => {
    const [hostInfo, setHostInfo] = useState([]);
    useEffect(() => {
        const hospitalRef = collection(db, 'hospital');
        const q = query(collection(hospitalRef, hospital.id, hospital.data.name));
        onSnapshot(q, (querySnapshot) => {
            setHostInfo(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])
    console.log(" BedTable hostInfo ",hostInfo);
    return (
        
        <div className='hospital-info-list'>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead style={{ background: "#e0e0e0" }}>
                        <TableRow >
                            <TableCell >
                                <Typography variant="button" >Name</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="button" >Address</Typography>
                            </TableCell>
                            <TableCell >
                                <Typography variant="button" >Pincode</Typography>
                            </TableCell>
                            <TableCell >
                                <Typography variant="button" >Action</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {hostInfo.map((doc) => (
                            <BedTableEdit key={doc.id} initialHospitalValue={doc} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

}

export default BedTable;