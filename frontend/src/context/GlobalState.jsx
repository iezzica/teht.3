import { useReducer } from "react";
import PropTypes from "prop-types";
import AppReducer from "./AppReducer";
import YhteystiedotContext from "./YhteystiedotContext";
import { GET_YHTEYSTIEDOT } from "./types";
import axios from "axios";

const GlobalState = (props) => {
  //initial state
  let initialState = {
    yhteystiedot: [],
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getYhteystiedot = async () => {
    try {
      let res = await axios.get("http://localhost:3001/urheilijat");
      let { data } = res;

      dispatch({ type: GET_YHTEYSTIEDOT, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const getYhteystieto = async (id) => {
    try {
      let sql = "http://localhost:3001/urheilijat/" + id;
      let res = await axios.get(sql);

      console.log("GET_YHTEYSTIETO:");

      dispatch({ type: "GET_YHTEYSTIETO", payload: res.data });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const setYhteystiedot = async (uusiUrheilijatieto) => {
    try {
      await axios
        .post(`http://localhost:3001/lisaa`, uusiUrheilijatieto)
        .then((res) => {
          dispatch({ type: "ADD_YHTEYSTIETO", payload: res.data });
          console.log(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const setYhteystieto = async (id, paivitettyUrheilijatieto) => {
    try {
      await axios
        .put(`http://localhost:3001/urheilijat/${id}`, paivitettyUrheilijatieto)
        .then((res) => {
          dispatch({ type: "EDIT_YHTEYSTIETO", payload: res.data });
          console.log(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const poistaYhteystieto = async (id) => {
    try {
      //alert(id);

      //console.log("poistetaan");
      //console.log(id["id"]);

      let sql = "http://localhost:3001/urheilijat/" + id["id"];
      await axios
        //.delete(`http://localhost:3000/urheilijat/${id}`)
        .delete(sql)
        .then((res) => {
          dispatch({ type: "DELETE_YHTEYSTIETO", payload: id["id"] });
          console.log(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <YhteystiedotContext.Provider
      value={{
        yhteystiedot: state.yhteystiedot,
        getYhteystiedot,
        setYhteystieto,
        setYhteystiedot,
        poistaYhteystieto,
        getYhteystieto,
      }}
    >
      {props.children}
    </YhteystiedotContext.Provider>
  );
};

GlobalState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalState; //export default GlobalState;
