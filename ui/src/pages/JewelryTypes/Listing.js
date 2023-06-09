import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import {variables} from '../../Variables';

const Listing = () => {
    const [typedata, typedatachange] = useState(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const LoadEdit = (id) => {
        navigate("/jewelrytypes/edit/" + id);
    }

    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch(variables.API_URL+"jewelrytype/" + id, {
                method: "DELETE"
            }).then((res) => {
                if(res.status === 400) {
                    navigate('/jewelrytypes?success=false');
                }
                else{
                    navigate('/jewelrytypes?success=true');
                }
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    const toastHandler = (success) => {
        if(success === null)
        {
            return;
        }
        if(success === "true"){
            toast.success("Salvat cu Succes!");
        }
        else{
            toast.error("A aparut o eroare!");
        }
    }

    const SoldAs = (value) => {
        if(value){
            return "Per Gram";
        }
        else{
            return "Per Bucata";
        }
    }
    const PriceAs = (value) => {
        if(value.IsUnique){
            return (value.Total_Weight * value.PricePerG).toFixed(2) ?? '-';
        }
        else{
            if(value.Price==null)
                return parseFloat("0").toFixed(2);
            return value.Price.toFixed(2);
        }
    }    

    const renderButton = (item) => {
        if(item.IsUnique){
            return <button onClick={() => { LoadEdit(item.Id) }} className="btn btn-primary">Editează</button>;    
        }
        else{
            return <button disabled onClick={() => { LoadEdit(item.Id) }} className="btn btn-primary">Editează</button>; 
        }
    }

    useEffect(() => {
        toastHandler(searchParams.get("success"));
        fetch(variables.API_URL+"jewelrytype").then((res) => {
            return res.json();
        }).then((resp) => {
            typedatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Tipuri de Bijuterii</h2>
                </div>
                <Toaster/>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="/jewelryTypes/create" className="btn btn-success">Adaugă (+)</Link>
                    </div>
                    <table className="table table-bordered table-align">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Nume</td>
                                <td>Preţ per Gram</td>
                                <td>Cantitate totală</td>
                                <td>Greutate totală</td>
                                <td>Preţ total</td>
                                <td>Se vinde per Gram</td>
                                <td>Opţiuni</td>
                            </tr>
                        </thead>
                        <tbody>

                            {typedata &&
                                typedata.map(item => (
                                    <tr key={item.Id}>
                                        <td>{item.Name}</td>
                                        <td>{item.PricePerG ?? '-'}</td>
                                        <td>{item.Total_Quantity ?? '-'}</td>
                                        <td>{item.Total_Weight?.toFixed(2) ?? '-'}</td>
                                        <td>{PriceAs(item)}</td>
                                        <td>{SoldAs(item.IsUnique)}</td>
                                        <td>
                                            {renderButton(item)}
                                            {/* <button onClick={() => { Removefunction(item.Id) }} className="btn btn-danger">Remove</button> */}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Listing;