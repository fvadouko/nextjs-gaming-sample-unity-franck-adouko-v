import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { UserContext } from "../../lib/context";
import { auth } from "../../lib/firebase";

const Header = ({ children }) => {
  const router = useRouter();
  const { user, username } = useContext(UserContext);
  return (
    <>
      <div>
        <nav className="headerTop">
          <ul className="listeMenu">
            <li className="liensNav">
              <Link className="lien" href="/" passHref>
                <img src="IconeTwitch.svg" alt="logo twitch" className="logo" />
              </Link>
            </li>

            <li className="liensNav">
              <form className="formSubmit">
                <input required type="text" className="inputRecherche" />

                <Link className="lien" href="/" passHref>
                  <button type="submit">
                    <img
                      src="Search.svg"
                      alt="icone loupe"
                      className="logoLoupe"
                    />
                  </button>
                </Link>
              </form>
            </li>
            <li className="liensNav">
              <div style={{ display: "flex" }}>
                <Link href="/voir-panier" passHref>
                  <a className="lien" style={{ marginRight: 10 }}>
                    Voir panier
                  </a>
                </Link>
                {!user ? (
                  <Link href="/se-connecter" passHref>
                    <a className="lien" style={{ marginRight: 10 }}>
                      Se connecter
                    </a>
                  </Link>
                ) : (
                  <>
                    <a
                      className="lien"
                      style={{ marginRight: 10 }}
                      onClick={() => {
                        if (user) {
                          router.push(`/welcome/${user.uid}`);
                        }
                      }}
                    >
                      Welcome
                    </a>
                    <a
                      className="lien"
                      style={{ marginRight: 10 }}
                      onClick={() => {
                        if (user) {
                          auth.signOut();
                          router.push("/");
                        }
                      }}
                    >
                      Se deconnecter
                    </a>
                  </>
                )}
              </div>
            </li>
          </ul>
        </nav>

        <div className="menuResBtn">
          <img
            src="MenuIco.svg"
            alt="icone menu responsive"
            className="menuIco"
          />
        </div>
      </div>
      <div className="container">{children}</div>
    </>
  );
};

export default Header;
