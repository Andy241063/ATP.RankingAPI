import { useEffect, useMemo, useState } from 'react';

type TennisPlayer = {
  id: number;
  name: string;
  age: number;
  country: string;
  rankingScore: number;
};

type PlayerForm = {
  id: number;
  name: string;
  age: string;
  country: string;
  rankingScore: string;
};

const emptyForm = (): PlayerForm => ({
  id: 0,
  name: '',
  age: '',
  country: '',
  rankingScore: ''
});

const API_URL = '/api/tennisplayer';

function App() {
  const [players, setPlayers] = useState<TennisPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [playerToDelete, setPlayerToDelete] = useState<TennisPlayer | null>(null);
  const [form, setForm] = useState<PlayerForm>(emptyForm());

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/all`);
      const data = await response.json();
      setPlayers(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchPlayers();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEditModal = (player: TennisPlayer) => {
    setEditingId(player.id);
    setForm({
      id: player.id,
      name: player.name,
      age: String(player.age),
      country: player.country,
      rankingScore: String(player.rankingScore)
    });
    setModalOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      id: Number(form.id) || 0,
      name: form.name,
      age: Number(form.age),
      country: form.country,
      rankingScore: Number(form.rankingScore)
    };

    try {
      if (editingId) {
        await fetch(`${API_URL}?id=${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      setModalOpen(false);
      await fetchPlayers();
    } catch (error) {
      console.error(error);
    }
  };

  const requestDelete = (player: TennisPlayer) => {
    setPlayerToDelete(player);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!playerToDelete) return;

    await fetch(`${API_URL}/${playerToDelete.id}`, { method: 'DELETE' });
    setConfirmOpen(false);
    setPlayerToDelete(null);
    await fetchPlayers();
  };

  const rankedPlayers = useMemo(() => players.slice().sort((a, b) => b.rankingScore - a.rankingScore), [players]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-[#0c3c8c] shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 overflow-hidden rounded-xl bg-transparent p-0">
              <img src="/logo.png" alt="ATP logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-200/80">ATP Tour</p>
            </div>
          </div>
          <nav className="flex items-center gap-6 text-sm font-semibold text-white">
            <a className="text-white border-b-2 border-white pb-1" href="#">Singles</a>
            <a className="text-white/90 hover:text-white" href="#">Doubles</a>
            <a className="text-white/90 hover:text-white" href="#">Race To Turin</a>
            <a className="text-white/90 hover:text-white" href="#">Doubles Race</a>
            <a className="text-white/90 hover:text-white" href="#">Next Gen Race</a>
            <a className="text-white/90 hover:text-white" href="#">No. 1s</a>
            <button className="text-white/90 hover:text-white">Players</button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <section className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-400/10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Visão geral</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Rankings de simples</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Veja os principais tenistas do circuito, com posição, país, idade e pontuação.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <div>
              <span className="block text-slate-500">Total de jogadores</span>
              <span className="text-2xl font-semibold text-slate-900">{rankedPlayers.length}</span>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-400/10">
          <div className="flex justify-end border-b border-slate-200 bg-slate-50 px-4 py-4">
            <button
              onClick={openCreateModal}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-base font-bold text-[#0c3c8c] shadow-sm shadow-slate-400/10 hover:bg-slate-50"
              aria-label="Criar jogador"
            >
              +
            </button>
          </div>
          <div className="grid grid-cols-[70px_1.5fr_1fr_1fr_120px_120px] border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            <span>Pos.</span>
            <span>Jogador</span>
            <span>País</span>
            <span>Idade</span>
            <span>Pontos</span>
            <span>Ações</span>
          </div>

          {loading ? (
            <div className="p-10 text-center text-slate-500">Carregando ranking…</div>
          ) : rankedPlayers.length === 0 ? (
            <div className="p-10 text-center text-slate-500">Nenhum jogador cadastrado ainda.</div>
          ) : (
            rankedPlayers.map((player, index) => (
              <div key={player.id} className="grid grid-cols-[70px_1.5fr_1fr_1fr_120px_120px] items-center border-b border-slate-200 px-4 py-4 text-sm last:border-none hover:bg-slate-50">
                <span className="font-semibold text-[#0c3c8c]">{index + 1}</span>
                <div>
                  <p className="font-semibold text-slate-900">{player.name}</p>
                  <p className="text-xs text-slate-500">#{player.id}</p>
                </div>
                <span className="text-slate-600">{player.country}</span>
                <span className="text-slate-600">{player.age} anos</span>
                <span className="font-semibold text-slate-900">{player.rankingScore.toLocaleString('pt-BR')}</span>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(player)} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700 hover:border-[#0c3c8c] hover:text-[#0c3c8c]">Editar</button>
                  <button onClick={() => requestDelete(player)} className="rounded-md border border-rose-300 bg-rose-50 px-2 py-1 text-xs text-rose-600 hover:bg-rose-100">Excluir</button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>

      {confirmOpen && playerToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/30 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-400/20">
            <div className="mb-4">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-500">Confirmação</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">Remover jogador?</h3>
            </div>
            <p className="text-sm text-slate-700">
              Isso removerá <span className="font-semibold text-slate-900">{playerToDelete.name}</span> do ranking.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => { setConfirmOpen(false); setPlayerToDelete(null); }} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">Cancelar</button>
              <button type="button" onClick={confirmDelete} className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700">Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-400/20">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0c3c8c]">Admin</p>
                <h3 className="text-xl font-semibold text-slate-900">{editingId ? 'Editar jogador' : 'Criar jogador'}</h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-sm text-slate-600 hover:text-slate-900">Fechar</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-slate-700">Nome</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-0" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-slate-700">Idade</label>
                  <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} required className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-0" />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-slate-700">Ranking</label>
                  <input type="number" value={form.rankingScore} onChange={(e) => setForm({ ...form, rankingScore: e.target.value })} required className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-0" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm text-slate-700">País</label>
                <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} required className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-0" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">Cancelar</button>
                <button type="submit" className="rounded-lg bg-[#0c3c8c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a336f]">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
