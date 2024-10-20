import Urheilijatieto from "./components/Urheilijatieto";
import yhteystiedotContext from "../context/YhteystiedotContext";
import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Urheilija() {
    const [urheilija,setUrheilija] = useState([]);    
    useEffect(() => {
        axios.get('https://localhost:3001/') 
        .then(res => setUrheilija(res.data))
        .catch(err => console.log(err));    
    }, []) 
    
    const handleDelete = async (id) => {
        try {
            await axios.delete('https://localhost:3001/urheilija/'+id);
            window.location.reload()
    } catch(err) {
        console.log(err);
    }
const YhteystiedotContext = useContext(yhteystiedotContext); //hooks
console.log(YhteystiedotContext);
useEffect(() => {
    YhteystiedotContext.getYhteystiedot();
    console.log(YhteystiedotContext);
}, []);
} 
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-75 bg-white rounded'> 
      <Link to="/create" className='btn btn-success'>Add +</Link> 
      <table className='table'>
          <thead>
              <tr>
              <th>Nimi</th>
              <th>Syntynyt</th>
              <th>Paino</th>
              <th>Kuva</th>
              <th>Laji</th>
              <th>Saavutukset</th>
              <th>Action</th>
              </tr>
          </thead>
          <tbody>
              {
                  urheilija.map((data, i) => (
                      <tr key={i}>
                          <td>{data.nimi}</td>
                          <td>{data.syntynyt}</td>
                          <td>{data.paino}</td>
                          <td>{data.kuva}</td>
                          <td>{data.laji}</td>
                          <td>{data.saavutukset}</td>
                          <td>
                              <Link to={`update/${data.ID}`} className='btn btn-primary'>Update</Link>
                              <button className='btn btn-danger ms-2'onClick={ e => handleDelete(data.ID)}>Delete</button>  
                          </td>
                      </tr>
                  ))    
              }
          </tbody>
      </table>
      </div>
  </div>
);
};
}
export default Urheilija; 

