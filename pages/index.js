import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import api from "../lib/axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Context } from "../lib/context";
import toast from "react-hot-toast";

export default function Home({games}) {
  
  const [gamesFormat, setGamesFormat] = useState([]);

  const {
    setGamesArray,
    state: { gamesArray },
  } = React.useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      let finalArray = games.map((game) => {
        let newUrl = game.box_art_url
          .replace("{width}", "250")
          .replace("{height}", "300");
        game.box_art_url = newUrl;
        return game;
      });

      setGamesFormat(finalArray);
    };

    fetchData();
  }, []);

  const addToCart = (game) => {
    gamesArray.push(game);
    setGamesArray(gamesArray);
    toast.success("Ajout d'un jeu au panier");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Abonnements aux Jeux tendances</title>
        <meta name="description" content="Generated Gaming Campus" />
        <link rel="icon" href="/IconTwicth.svg" />
      </Head>

      <div>
        <h1 className="titreGames">Jeux les plus populaires</h1>
        <h3 style={{ fontSize: 25, textAlign: "center" }}>
          Abonnez-vous à patir de 5€/mois
        </h3>
        <div className="flexAccueil">
          {gamesFormat.map((game, index) => (
            <div key={index} className="carteGames">
              <img
                src={game.box_art_url}
                alt="jeu profile pic"
                className="imgCarte"
              />

              <div className="cardBodyGames">
                <h5 className="titreCartesGames">{game.name}</h5>

                <button
                  type="button"
                  className="btnCarte"
                  onClick={() => addToCart(game)}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image
              src="/IconeTwitch.svg"
              alt="Twicth Logo"
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const result = await api.get("https://api.twitch.tv/helix/games/top");
  console.log(result)
  const games = result.data.data;

  return {
    props: {
      games,
    },
  };
}
