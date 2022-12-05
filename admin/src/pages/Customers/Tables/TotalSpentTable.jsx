import React, { useEffect } from 'react'
import $ from 'jquery';
import dt from 'datatables.net';
import '../style.css'
import { NavLink } from 'react-router-dom';
function TotalSpentTable({header,myData}) {
    useEffect(() => {
        setTimeout(() => {
            $(document).ready(function () {
                $('#myTable').DataTable();
            });
        }, 1000);

    }, [])
    return (
        <>

            <table id="myTable" className="display my-table-style">
                <thead>
                    <tr>
                        {header.map((head) => {
                            return (<th key={head.name}>{head.name}</th>)
                        })}

                    </tr>
                </thead>
                <tbody>
                    {myData.map((data,index) => {
                        return (
                            <tr key={index}>
                                <td>{(data._id).toString().length<10?(`0${data._id}`):(`${data._id}`)}</td>
                                {/* <td>{data._id}</td> */}
                                <td>{data.totalSpending}</td>
                                <td>
                                {data.allData.map((data,index)=>{
                                    if(data!=null){
                                        return (<><NavLink className='order-stable-orderpage-link' to={`/orders/order/${data.oid}`}>{data.oid}</NavLink> <br /><br /></>)
                                    }
                                }
                                )}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </>

    )
}

export default TotalSpentTable