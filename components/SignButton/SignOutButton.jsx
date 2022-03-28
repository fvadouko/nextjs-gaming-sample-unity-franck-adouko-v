import { auth, googleAuthProvider } from "../../lib/firebase";

function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Se déconnecter</button>;
}

export default SignOutButton;
