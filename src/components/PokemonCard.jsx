import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import '../index.css';
const getPokemonById = async (url) => {
  try {
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonCard = ({ pokemonData }) => {
  const [pokemon, setPokemon] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('');
  const navigate = useNavigate();

  const handleClickNavigate = () => {
    navigate(`/pokedex/${pokemon.id}`, { state: { pokemon } });
  };

  useEffect(() => {
    const loadPokemon = async () => {
      const pokemonInfo = await getPokemonById(pokemonData.url);

      setPokemon(pokemonInfo);
      if (pokemonInfo.name === 'pikachu') {
        setBackgroundColor('orange');
      }
    };

    loadPokemon();
  }, []);

  return (
    <>
      {pokemon && (
        <article
          onClick={handleClickNavigate}
          className="hover:cursor-pointer border rounded mt-5 text-center"
          style={{ backgroundColor }}
        >
          <header>
            <div></div>
            <div style={{ width: 150 }} className="w-full ml-3 mr-3">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="ml-5 mr-5"
              />
            </div>
          </header>

          <section>
            <section>
              <h2 className="text-2xl font-semibold">{pokemon.name}</h2>
              <p>{pokemon.types[0].type.name}</p>
              <p>Tipo</p>
            </section>

            <section>
              {pokemon.stats.map((stat) => (
                <section key={stat.stat.name}>
                  <h3>{stat.stat.name.toUpperCase()}</h3>
                  <p>{stat.base_stat}</p>
                </section>
              ))}
            </section>
          </section>
        </article>
      )}
    </>
  );
};

export default PokemonCard;
