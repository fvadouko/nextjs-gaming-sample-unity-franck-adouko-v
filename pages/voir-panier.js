import React, { useContext } from "react";
import AuthCheck from "../components/AuthCheck/AuthCheck";
import { Context, UserContext } from "../lib/context";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

const VoirPanier = () => {
  const {
    setGamesArray,
    state: { gamesArray },
  } = React.useContext(Context);

  const { user, username } = useContext(UserContext);
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className="titreGames">Votre panier</h1>
      <div className="flexAccueil">
        <div className="CartContainer">
          <div className="Header">
            <h3 className="Heading">Récapitulatif</h3>
            <h5 className="Action">Remove all</h5>
          </div>

          {gamesArray &&
            gamesArray.map((game, index) => (
              <div key={index} className="Cart-Items">
                <div className="image-box">
                  <img
                    src={game.box_art_url}
                    alt="jeu profile pic"
                    style={{ width: 60 }}
                  />
                </div>
                <div className="about">
                  <h1 className="title">{game.name}</h1>
                </div>
                <div className="counter">
                  <div className="btn">+</div>
                  <div className="count">1</div>
                  <div className="btn">-</div>
                </div>
                <div className="prices">
                  <div className="amount">€5</div>
                  <div className="save">
                    <u></u>
                  </div>
                  <div className="remove">
                    <u>Remove</u>
                  </div>
                </div>
              </div>
            ))}

          <hr />
          <div className="checkout">
            <div className="total">
              <div>
                <div className="Subtotal">Abonnements</div>
                <div className="items">{gamesArray.length} items</div>
              </div>
              <div className="total-amount">${gamesArray.length * 5}</div>
            </div>

            <button
              className="button"
              onClick={() => {
                if (!user) {
                  router.push(`/se-connecter`);
                } else {
                  router.push(`/paiement`);
                }
              }}
            >
              Abonnez-vous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoirPanier;
