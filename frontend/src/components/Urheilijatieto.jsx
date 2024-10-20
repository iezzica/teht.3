//import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useContext } from "react";
import yhteystiedotContext from "../context/YhteystiedotContext";
import { useNavigate } from "react-router-dom";

const Urheilijatieto = (props) => {
  const YhteystiedotContext = useContext(yhteystiedotContext); //hooks
  let history = useNavigate();
  const [naytaUrheilijatieto, setnaytaUrheilijatieto] = useState(false);
  const onDeleteClick = (id) => {
    YhteystiedotContext.poistaYhteystieto(id);
    window.location.reload();
    history("/");
  };
  const onShowClick = () => {
    let lippu = !naytaUrheilijatieto;
    setnaytaUrheilijatieto(lippu);
  };
  const { id, nimi } = props.yhteystieto;
  return (
    <div className="card card-body mb-3 display:flex, justifyContent: flex-end">
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <h4>{nimi}</h4>
        <button className="button_left" onClick={onShowClick.bind(this)}>
          ...
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          className="btn-group mr-2 text-right"
          role="group"
          aria-label="Second group"
        >
          <button
            className="button_right"
            onClick={onDeleteClick.bind(this, { id })}
          >
            Poista
          </button>
          <Link to={`urheilijatieto/muokkaa/${id}`}>
            <button className="button_right">Muokkaa</button>
          </Link>
        </div>
      </div>
      <br />
      {naytaUrheilijatieto ? (
        <ul className="list-group">
          <li className="list-group-item">Urheilija: {}</li>
        </ul>
      ) : null}
    </div>
  );
};
Urheilijatieto.propTypes = {
  yhteystieto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nimi: PropTypes.string.isRequired,
    syntymavuosi: PropTypes.number.isRequired,
    paino: PropTypes.number.isRequired,
    kuva: PropTypes.string.isRequired,
    laji: PropTypes.string.isRequired,
    saavutukset: PropTypes.string.isRequired,
  }).isRequired,
};

export default Urheilijatieto;
