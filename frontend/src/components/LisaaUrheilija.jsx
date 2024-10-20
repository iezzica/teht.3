//import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//import { yhteystiedotContext } from "../context/YhteystiedotContext";
import axios from "axios";

export default function LisaaUrheilija() {
  let history = useNavigate();
  const [nimi, setNimi] = useState("");
  const [syntymapaiva, setSyntymapaiva] = useState("");
  const [paino, setPaino] = useState("");
  const [kuva, setKuva] = useState("");
  const [laji, setLaji] = useState("");
  const [saavutukset, setSaavutukset] = useState("");

  const navigate = useNavigate();
 // const YhteystiedotContext = useContext(yhteystiedotContext); //hooks

  //const handleSubmit = async (e) => {
  //e.preventDefault();
  //const uusiPuhelintieto = {
  //nimi: nimi,
  //puhelin: puhelin,

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("https://localhost:3001/create", {
        nimi,
        syntymapaiva,
        paino,
        kuva,
        laji,
        saavutukset,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }
  //console.log("Tarkistetaan uusiUrheilijatieto -objekti:");
  //console.log(uusiUrheilijatieto);

  //YhteystiedotContext.setYhteystiedot(uusiUrheilijatieto);
  history("/");

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3"></div>
      <form onSubmit={handleSubmit}>
        <h2>Lisää urheilija</h2>
        <div className="mb-2">
          <label htmlFor="">Nimi</label>
          <input
            type="text"
            placeholder="Lisää nimi"
            className="form-control"
          />
          onChange={(e) => setNimi(e.target.value)}
        </div>
        <div className="mb-2">
          <label htmlFor="">Syntymäpäivä</label>
          <input
            type="number"
            placeholder="Lisää syntymäpäivä"
            className="form-control"
          />
          onChange={(e) => setSyntymapaiva(e.target.value)}
        </div>
        <div className="mb-2">
          <label htmlFor="">Paino</label>
          <input
            type="number"
            placeholder="Lisää paino"
            className="form-control"
          />
          onChange={(e) => setPaino(e.target.value)}
        </div>
        <div className="mb-2">
          <label htmlFor="">Kuva</label>
          <input
            type="text"
            placeholder="Lisää kuva"
            className="form-control"
          />
          onChange={(e) => setKuva(e.target.value)}
        </div>
        <div className="mb-2">
          <label htmlFor="">Laji</label>
          <input
            type="text"
            placeholder="Lisää laji"
            className="form-control"
          />
          onChange={(e) => setLaji(e.target.value)}
        </div>
        <div className="mb-2">
          <label htmlFor="">Saavutukset</label>
          <input
            type="text"
            placeholder="Lisää saavutukset"
            className="form-control"
          />
          onChange={(e) => setSaavutukset(e.target.value)}
        </div>
        <button className="btn btn-success">Lisää</button>
      </form>
    </div>
  );
}
//export default LisaaUrheilija;
