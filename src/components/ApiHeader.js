import { useEffect, useState, Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Progress } from "antd";
import {useDispatch,useSelector} from "react-redux"
import Slider from "react-slick"
import Like from "./Like"
import Chekbox from "./Chekbox"
import filterFavourites from "../filterFavourites";
  
const API_KEY = "2a6bed66b9c565a674eb831d980b838f";
const API_IMG = "https://image.tmdb.org/t/p/w500";

const NOW_PLAYING = "https://api.themoviedb.org/3/movie/now_playing?api_key=2a6bed66b9c565a674eb831d980b838f&language=en-US&page=1"
const GET_POPULAR = "https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1"
export default function Example() {
  const [popularMovies, setPopularMovies] = useState([]);
  const dispatch = useDispatch()
  // const [popularMovies, setPopularMovies] = useState([])
  const reducerFavourite = useSelector(state => state.reducerFavourite)

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then((ress) => {
        console.log(ress.data.results);
        let result = ress.data.results
        setPopularMovies(ress.data.results);
      setPopularMovies(filterFavourites(reducerFavourite, result))
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(popularMovies);

  useEffect(() => {

    let currentPopularMovies = [...popularMovies]

    setPopularMovies(filterFavourites(reducerFavourite, currentPopularMovies))
  }, [reducerFavourite])

  function setItemToLocalStorage(val){
    console.log(val);
    // alert("Watch Listga qo'shildi")
    // dispatch({type: "add", payload: val })
    dispatch({type: "setStorage", payload:{id: val.id}})
  }

  function qoshFunNarsa(val){
    console.log(val);
    // alert("Watch Listga qo'shildi")
    dispatch({type: "add", payload: val })
  }

  return (
    <div>
        <div className="carusel ms-5">
        <div className="d-flex flex-row">
          {popularMovies.length > 0 &&
            popularMovies.map((item, index) => {
              return (
                <div key={index}>
                  <div className="card ms-3 item">
                    <img width="200px" src={API_IMG + item.poster_path} alt="" />
                        {/* <div className="textoqrang2" onClick={() => {qoshFunNarsa(item)}}> */}
                        {/* <a onClick={() => {qoshFunNarsa(item)}}>
                    <img width="50px" className="textoqrang2" src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-947-circle-more-white-4c440dfc1b0e626c70f4853dbbce9c4d1f2c5d8f3e05a7d3df47881cbd816adf.svg" alt="" />
                        </a> */}

                    {/* <div className="item"> */}
                      <ul className="nav">
                          <li className="nav-item">
                        <a className="nav-link textoq img5 active" aria-current="page">
                    <img width="50px" className="textoqrang2" src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-947-circle-more-white-4c440dfc1b0e626c70f4853dbbce9c4d1f2c5d8f3e05a7d3df47881cbd816adf.svg" alt="" />
                        {/* <div className="rasmv2"></div> */}
                        </a>
                        {/* <p>narsla</p> */}
                        <div className='navbar_item navbar_div'>
                                        <ul>
                                                <li><a className='textoq'>Add to list</a></li>
                                                <li className="m-0 p-0">
                                                  <span className='textoq' onClick={() => {setItemToLocalStorage(item)}}> 
                                                  {(item.favourite) ?  <span style={{ color: "green", fontWeight: "bold" }}>LIKE</span> : <span style={{ color: "red", fontWeight: "bold" }}>DISLAKE</span>}
                                                {/* <p className="d-flex m-0 p-0"> <Chekbox className="rang51"/> <p className="mt-2 "> Watchlist </p> </p> */}
                                                </span>
                                                  </li>
                                                <li className="m-0 p-0"><a className='textoq mt-2'  onClick={() => {qoshFunNarsa(item)}}> Watchlist </a></li>
                                                
                                                <li><a className='textoq'>Your rating</a></li>
                                        </ul>
                                    </div>
                          </li>
                      </ul>
                    {/* </div> */}
                        {/* </div> */}
                    {/* <a  className="text-danger textoqrang2" onClick={() => {qoshFunNarsa(item)}}>watch</a> */}
                    <div className="flex-row">
                    <Progress className="textoqrang " type="circle" percent={item.vote_average * 10} width="50px" />
                    </div>
                    
                  <Link to={`/singlemovies/${item.id}`}>
                    <h4>{item.title}</h4>
                    <h4>{item.release_date}</h4>
                    
                  </Link>
                  </div>
                </div>
              );
            })}
        </div>
        </div>  
    </div>
  );
}
