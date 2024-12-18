import React, { useEffect, useState } from 'react';
import favoriteStyles from './Favorite.module.css';
import Movie from './Movie';
import { NavLink } from 'react-router-dom';
const Favorite = (props) => {
  return (
    <div>
      <header>
        <h1>MOVIE</h1>
      </header>
      <main>
        <div>
          <div className={favoriteStyles.list}>
            <h1 style={{
              marginTop: "5px"
            }}>{props.favorites}</h1>
            <div style={{
              height: "400px",
              overflow: "auto"
            }}>
            {props.movieNames.map((movieName, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "35vw",
                  marginLeft: "2.5vw",
                  marginBottom: "10px",
                }}
              >
                <p>{movieName}</p>
                <button
                  style={{
                    backgroundColor: "#A301D9",
                    borderColor: "#A301D9",
                    borderRadius: "10px",
                    width: "100px",
                    height: "35px",
                    fontSize: "15px",
                    color: "white",
                  }}
                >
                  <a
                    href={`https://www.imdb.com/title/${props.imbdlink[index]}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    IMDb
                  </a>
                </button>
              </div>
            ))}
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              
             
              <NavLink to='/'>
              <button onClick={()=>{
                props.movieNameDelet([]);
                props.imbdLinkDelete([]);
              }}
                style={{
                  backgroundColor: '#A301D9',
                  borderColor: '#A301D9',
                  borderRadius: "10px",
                  width: "10vw",
                  height: "35px",
                  fontSize: "15px",
                  color: "white",
                  marginTop: "25px",
                  marginBottom: "15px"
                }}
              >Movies</button>
              </NavLink>
            
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Favorite;
