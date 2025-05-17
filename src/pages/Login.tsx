import { useState } from 'react';
import { supabase } from '../supabaseClient';

type LoginProps = {
  onLogin: (user: any) => void;
};

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error, user } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    else onLogin(user);
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Connexion</h2>
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
      <button type="submit">Se connecter</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}