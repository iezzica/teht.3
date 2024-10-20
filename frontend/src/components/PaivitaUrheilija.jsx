import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import React from 'react';
import axios from "axios";

import yhteystiedotContext from "../context/YhteystiedotContext";

const PaivitaUrheilija = () => {
  const [nimi, setNimi] = useState("");
  const [syntymapaiva, setSyntymapaiva] = useState("");
  const [paino, setPaino] = useState("");
  const [kuva, setKuva] = useState("");
  const [laji, setLaji] = useState("");
  const [saavutukset, setSaavutukset] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const YhteystiedotContext = useContext(yhteystiedotContext); //hooks

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      YhteystiedotContext.getYhteystieto(id).then((res) => {
        setNimi(res.nimi);
        setSyntymapaiva(res.syntymapaiva);
        setPaino(res.paino);
        setKuva(res.kuva);
        setLaji(res.laji);
        setSaavutukset(res.saavutukset);
      });
    } else mounted = false;
  }, []);

  //const handleSubmit = async (e) => {
  //e.preventDefault();
  //const paivitettyPuhelintieto = {
  //nimi: nimi,
  //puhelin: puhelin,

  function handleSubmit(event) {
    event.preventDefault();
    const paivitettyUrheilijatieto = {
      nimi,
      syntymapaiva,
      paino,
      kuva,
      laji,
      saavutukset,
    };
    axios
      .put("https://localhost:3001/update/" + id, paivitettyUrheilijatieto)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  const onChangeNimi = (e) => {
    setNimi(e.target.value);
  };

  const onChangeSyntymapaiva = (e) => {
    setSyntymapaiva(e.target.value);
  };

  const onChangePaino = (e) => {
    setPaino(e.target.value);
  };

  const onChangeKuva = (e) => {
    setKuva(e.target.value);
  };

  const onChangeLaji = (e) => {
    setLaji(e.target.value);
  };

  const onChangeSaavutukset = (e) => {
    setSaavutukset(e.target.value);
  };
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3"></div>
      <form onSubmit={handleSubmit}>
        <h2>Päivitä urheilija</h2>
        <div className="mb-2">
          <label htmlFor="">Nimi</label>
          <input
            type="text"
            placeholder="Päivitä nimi"
            className="form-control"
            onChange={onChangeNimi}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="">Syntymäpäivä</label>
          <input
            type="number"
            placeholder="Päivitä syntymäpäivä"
            className="form-control"
            onChange={onChangeSyntymapaiva}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="">Paino</label>
          <input
            type="number"
            placeholder="Päivitä paino"
            className="form-control"
            onChange={onChangePaino}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="">Kuva</label>
          <input
            type="text"
            placeholder="Päivitä kuva"
            className="form-control"
            onChange={onChangeKuva}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="">Laji</label>
          <input
            type="text"
            placeholder="Päivitä laji"
            className="form-control"
            onChange={onChangeLaji}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="">Saavutukset</label>
          <input
            type="text"
            placeholder="Päivitä saavutukset"
            className="form-control"
            onChange={onChangeSaavutukset}
          />
        </div>
        <button className="btn btn-success">Päivitä</button>
      </form>
    </div>
  );
};
export default PaivitaUrheilija;
