import React, { useContext, useEffect } from "react";
import SignOutButton from "../components/SignButton/SignOutButton";

import SignInButton from "../components/SignButton/SignInButton";
import { Context, UserContext } from "../lib/context";
import styles from "../styles/Home.module.css";
import GamesSubscribed from "../components/GamesSubscribed/GamesSubscribed";
import { useRouter } from "next/router";

export default function SeConnecter(props) {
  const { user, username } = useContext(UserContext);
  const router = useRouter();
  const {
    setGamesArray,
    state: { gamesArray },
  } = React.useContext(Context);
  useEffect(() => {
    if (user && gamesArray.length > 0) {
      router.push("/paiement");
    }
    if (user && gamesArray.length === 0) {
      router.push("/welcome");
    }
  });

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <div>
      <h1 className="titreGames">Se Connecter</h1>

      <div className="flexAccueil">
        <div className={styles.container}>{!user && <SignInButton />}</div>
      </div>
    </div>
  );
}
