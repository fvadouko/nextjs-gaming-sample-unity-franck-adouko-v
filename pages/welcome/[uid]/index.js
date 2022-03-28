import React, { useContext, useEffect, useState } from "react";
import { firestore, fromMillis, postToJSON } from "../../../lib/firebase";
import styles from "../../../styles/Home.module.css";
import { useRouter } from "next/router";
import { UserContext } from "../../../lib/context";
import Link from "next/link";

const Welcome = ({ games }) => {
  const [gamesFormat, setGamesFormat] = useState([]);
  const { user, username } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    let finalArray = games.map((game) => {
      let newUrl = game.box_art_url
        .replace("{width}", "250")
        .replace("{height}", "300");
      game.box_art_url = newUrl;
      return game;
    });

    setGamesFormat(finalArray);
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <h1 className="titreGames">Jouer à vos jeux maintenant !</h1>

        <div className="flexAccueil">
          {gamesFormat &&
            gamesFormat.length > 0 &&
            gamesFormat.map((game, index) => (
              <div key={index} className="carteGames">
                <img
                  src={game.box_art_url}
                  alt="jeu profile pic"
                  className="imgCarte"
                />

                <div className="cardBodyGames">
                  <h5 className="titreCartesGames">{game.name}</h5>
                  <Link href={`/welcome/${user.uid}/game/${game.id}`} passHref>
                    <a className="btnCarte">Jouer</a>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;

export async function getServerSideProps({ query }) {
  const { uid } = query;
  const gamesQuery = firestore.collection("users").where("uid", "==", uid);
  const games = [];
  const docs = await gamesQuery.get(); //).docs.map(postToJSON);
  console.log(docs);
  docs.forEach((doc) => {
    const gm = doc.data();
    for (let index = 0; index < gm.gamesArray.length; index++) {
      games.push(gm.gamesArray[index]);
    }
  });

  return {
    props: { games }, // will be passed to the page component as props
  };
}
