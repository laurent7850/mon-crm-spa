import { useState } from 'react';
import { supabase } from '../supabaseClient';

type LoginProps = {
  onLogin: (user: any) => void;
};

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    else if (data && data.user) onLogin(data.user);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) setError(error.message);
    else {
      setError(null);
      alert("Inscription réussie ! Vérifiez vos emails pour activer votre compte.");
      setIsSignup(false); // repasse sur le formulaire de connexion
    }
  };

  return (
    <form onSubmit={isSignup ? handleSignup : handleLogin}>
      <h2>{isSignup ? "Créer un compte" : "Connexion"}</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Mot de passe"
        required
      />
      <button type="submit">{isSignup ? "S'inscrire" : "Se connecter"}</button>
      <button
        type="button"
        style={{ marginLeft: 8 }}
        onClick={() => { setIsSignup(!isSignup); setError(null); }}
      >
        {isSignup ? "Déjà un compte ?" : "Créer un compte"}
      </button>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </form>
  );
}
