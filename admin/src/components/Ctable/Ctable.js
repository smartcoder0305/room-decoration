import React, { useEffect } from 'react'
import $ from 'jquery';
import dt from 'datatables.net';
import './style.css'

function Ctable({ myData, header }) {
    useEffect(() => {
        setTimeout(() => {
            $(document).ready(function () {
                $('#myTable').DataTable();
            });
        }, 500);

    }, [])
    return (
        <>

            <table id="myTable" className="display my-table-style">
                <thead>
                    <tr>
                        {header.map((head,index) => {
                            return (<th key={index}>{head.name}</th>)
                        })}

                    </tr>
                </thead>
                <tbody>
                    {myData.map((data,index) => {
                        return (
                            <tr key={index}>
                            <td>{data.paymentdetails_id}</td>
                                <td>{data.fullName}</td>
                                <td>{data.email}</td>
                                <td>{data.phone}</td>
                                <td>{data.address}</td>
                                <td>{data.city}</td>
                                <td>{data.postalCode}</td>
                                <td>{data.action}</td>
                                <td>{data.linkTo}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </>

    )
}

export default Ctable