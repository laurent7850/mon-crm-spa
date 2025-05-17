import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// Types pour les prestations
type Prestation = {
  id: string;
  date_prestation: string;
  heures: number;
  project_id: string;
  adresse: string;
  statut: string;
};

type DashboardPersonnelProps = {
  user: { id: string };
};

type FormState = {
  date_prestation: string;
  heures: string;
  project_id: string;
  adresse: string;
};

export default function DashboardPersonnel({ user }: DashboardPersonnelProps) {
  const [prestations, setPrestations] = useState<Prestation[]>([]);
  const [form, setForm] = useState<FormState>({
    date_prestation: '',
    heures: '',
    project_id: '',
    adresse: '',
  });

  useEffect(() => {
    // Charger les prestations de l'utilisateur
    supabase
      .from('prestations')
      .select('*')
      .eq('user_id', user.id)
      .then(({ data }) => setPrestations((data as Prestation[]) || []));
  }, [user.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const insert = { ...form, user_id: user.id };
    const { error } = await supabase.from('prestations').insert([insert]);
    if (!error) window.location.reload();
    else alert('Erreur : ' + error.message);
  };

  return (
    <div>
      <h2>Encoder une prestation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={form.date_prestation}
          onChange={e => setForm(f => ({ ...f, date_prestation: e.target.value }))}
          required
        />
        <input
          type="number"
          placeholder="Heures"
          value={form.heures}
          onChange={e => setForm(f => ({ ...f, heures: e.target.value }))}
          required
        />
        <input
          type="text"
          placeholder="ID Projet"
          value={form.project_id}
          onChange={e => setForm(f => ({ ...f, project_id: e.target.value }))}
          required
        />
        <input
          type="text"
          placeholder="Adresse"
          value={form.adresse}
          onChange={e => setForm(f => ({ ...f, adresse: e.target.value }))}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
      <h2>Mes prestations</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Heures</th>
            <th>Projet</th>
            <th>Adresse</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {prestations.map(prest => (
            <tr key={prest.id}>
              <td>{prest.date_prestation}</td>
              <td>{prest.heures}</td>
              <td>{prest.project_id}</td>
              <td>{prest.adresse}</td>
              <td>{prest.statut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}