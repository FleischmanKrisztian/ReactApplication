import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {variables} from '../../Variables';

const TypeEdit = () => {
    const { typeid } = useParams();

    useEffect(() => {
        fetch(variables.API_URL+"jewelrytype/edit/" + typeid).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp[0].Id);
            namechange(resp[0].Name);
            pricechange(resp[0].PricePerG);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const[Id,idchange]=useState("");
    const[Name,namechange]=useState("");
    const[PricePerG,pricechange]=useState("");
    const[validation,valchange]=useState(false);
    const[validationPrice,valchange2]=useState(false);

    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const typedata={Id,Name,PricePerG};
      
      fetch(variables.API_URL+"jewelrytype",{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(typedata)
      }).then((res)=>{
        if(res.status === 400) {
            navigate('/jewelrytypes?success=false');
        }
        else{
            navigate('/jewelrytypes?success=true');
        }
      }).catch((err)=>{
        console.log(err.message)
      })
    }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>Editează Tip de bijuterie</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Nume</label>
                                            <input required value={Name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                        {Name.length===0 && validation && <span className="text-danger">Introduceţi Numele</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Preţ per Gram</label>
                                            <input type={"number"} required min={0} step={0.00001} value={PricePerG} onBlur={e=>valchange2(true)} onChange={e=>pricechange(e.target.value)} className="form-control"></input>
                                        {PricePerG.length===0 && validationPrice && <span className="text-danger">Introduceţi Preţul per Gram</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Salvaţi</button>
                                            <Link to="/JewelryTypes" className="btn btn-danger">Înapoi</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TypeEdit;