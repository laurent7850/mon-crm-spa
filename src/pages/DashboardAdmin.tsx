import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// Définition des types pour les données
type Prestation = {
  id: string;
  date_prestation: string;
  heures: number;
  project_id: string;
  adresse: string;
  statut: string;
  users?: { nom: string; prenom: string };
};

export default function DashboardAdmin() {
  const [prestations, setPrestations] = useState<Prestation[]>([]);

  useEffect(() => {
    supabase
      .from('prestations')
      .select('*, users(nom,prenom)')
      .eq('statut', 'encodée')
      .then(({ data }) => setPrestations((data as Prestation[]) || []));
  }, []);

  const valider = async (id: string) => {
    await supabase.from('prestations').update({ statut: 'validée', valide_par_admin: true }).eq('id', id);
    window.location.reload();
  };

  const rejeter = async (id: string) => {
    await supabase.from('prestations').update({ statut: 'rejetée' }).eq('id', id);
    window.location.reload();
  };

  return (
    <div>
      <h2>Prestations à valider</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Heures</th>
            <th>Projet</th>
            <th>Utilisateur</th>
            <th>Adresse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {prestations.map((p) => (
            <tr key={p.id}>
              <td>{p.date_prestation}</td>
              <td>{p.heures}</td>
              <td>{p.project_id}</td>
              <td>{p.users ? `${p.users.prenom} ${p.users.nom}` : ''}</td>
              <td>{p.adresse}</td>
              <td>
                <button onClick={() => valider(p.id)}>Valider</button>
                <button onClick={() => rejeter(p.id)}>Rejeter</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
