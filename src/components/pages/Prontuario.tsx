import {
  ClipboardList,
  Search,
  Edit,
  FileText,
  User,
  PawPrint,
  Calendar,
  Paperclip,
  PlusCircle,
  X,
  Send,
  Loader,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

// --- INTERFACES DE DADOS ---

interface HistoricoEntry {
  id: string;
  data: string;
  tipo: 'Consulta' | 'Exame' | 'Vacina' | 'Banho' | 'Tosa' | 'Outro';
  descricao: string;
  responsavel: string;
  arquivos: { nome: string; url: string }[];
}

interface Pet {
  id: string;
  nome: string;
  especie: string;
  raca: string;
  cliente: string;
  telefone: string;
  historico: HistoricoEntry[];
}

// --- DADOS MOCKADOS PARA EXEMPLO (Mantidos) ---

const mockPacientes: Pet[] = [
  {
    id: 'P001',
    nome: 'Rex',
    especie: 'Cachorro',
    raca: 'Golden Retriever',
    cliente: 'Ana Silva',
    telefone: '(11) 98765-4321',
    historico: [
      {
        id: 'H005',
        data: '15/10/2025',
        tipo: 'Banho',
        descricao: 'Banho e secagem padrão.',
        responsavel: 'Prof. João',
        arquivos: [],
      },
      {
        id: 'H004',
        data: '10/09/2025',
        tipo: 'Consulta',
        descricao: 'Check-up de rotina. Peso normal, sem intercorrências.',
        responsavel: 'Dr(a). Juliana',
        arquivos: [],
      },
      {
        id: 'H003',
        data: '25/08/2025',
        tipo: 'Vacina',
        descricao: 'Vacina V8 anual aplicada.',
        responsavel: 'Dr(a). Juliana',
        arquivos: [{ nome: 'Cartão de Vacina.pdf', url: '#' }],
      },
    ],
  },
  {
    id: 'P002',
    nome: 'Miau',
    especie: 'Gato',
    raca: 'Siamês',
    cliente: 'Carlos Souza',
    telefone: '(21) 99887-7665',
    historico: [
      {
        id: 'H002',
        data: '01/10/2025',
        tipo: 'Consulta',
        descricao:
          'Queixa de apatia e falta de apetite. Prescrito antibiótico por 7 dias.',
        responsavel: 'Dr(a). Pedro',
        arquivos: [
          { nome: 'RaioX Abdominal.jpg', url: '#' },
          { nome: 'Exame de Sangue.pdf', url: '#' },
        ],
      },
      {
        id: 'H001',
        data: '15/09/2025',
        tipo: 'Banho',
        descricao: 'Banho hipoalergênico.',
        responsavel: 'Prof. Fernanda',
        arquivos: [],
      },
    ],
  },
];

// ---  ADICIONAR HISTÓRICO ---

interface AdicionarHistoricoModalProps {
  pet: Pet;
  onClose: () => void;
  onSave: (entry: Omit<HistoricoEntry, 'id'>) => void; // A ser usado no Backend
}

const TIPOS_ATENDIMENTO = [
  'Consulta',
  'Exame',
  'Vacina',
  'Banho',
  'Tosa',
  'Outro',
];

const AdicionarHistoricoModal: React.FC<AdicionarHistoricoModalProps> = ({
  pet,
  onClose,
  onSave,
}) => {
  const [data, setData] = useState(new Date().toISOString().substring(0, 10)); // Data atual por padrão
  const [tipo, setTipo] = useState<HistoricoEntry['tipo']>('Consulta');
  const [descricao, setDescricao] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // A ser substituída pela função de upload real
  const handleFileUpload = () => {
    console.log('[Simulação] Seleção de arquivo de imagem/PDF aberta.');
    // Aqui estaria a lógica de upload para o Storage
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricao || !responsavel) {
      console.warn('Preencha a descrição e o responsável.');
      return;
    }

    setIsSaving(true);

    const newEntry: Omit<HistoricoEntry, 'id'> = {
      data: new Date(data).toLocaleDateString('pt-BR'), // Converte YYYY-MM-DD para DD/MM/AAAA
      tipo,
      descricao,
      responsavel,
      arquivos: [], // Arquivos seriam adicionados aqui após upload
    };

    // SIMULAÇÃO: No ambiente real, essa função chamaria a API (POST /api/historico)
    setTimeout(() => {
      onSave(newEntry);
      setIsSaving(false);
      onClose();
      console.log(`[Simulação] Nova entrada salva para o Pet ${pet.nome}`);
    }, 1500);
  };

  return (
    // Modal Overlay (Fundo Escuro)
    <div className='fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center backdrop-blur-sm'>
      {/* Conteúdo do Modal */}
      <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-lg transition-all transform scale-100 border-t-4 border-pink-500'>
        <div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3 mb-4'>
          <h3 className='text-xl font-bold text-pink-700 dark:text-pink-400 flex items-center gap-2'>
            <FileText size={20} /> Novo Atendimento - {pet.nome}
          </h3>
          <button
            onClick={onClose}
            className='p-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition'
            title='Fechar'
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Campo Data e Tipo */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label
                htmlFor='data'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
              >
                Data
              </label>
              <input
                id='data'
                type='date'
                value={data}
                onChange={e => setData(e.target.value)}
                required
                className='w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-cyan-500 focus:border-cyan-500'
                max={new Date().toISOString().substring(0, 10)}
              />
            </div>
            <div>
              <label
                htmlFor='tipo'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
              >
                Tipo de Serviço
              </label>
              <select
                id='tipo'
                value={tipo}
                onChange={e =>
                  setTipo(e.target.value as HistoricoEntry['tipo'])
                }
                required
                className='w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-cyan-500 focus:border-cyan-500'
              >
                {TIPOS_ATENDIMENTO.map(t => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Campo Responsável */}
          <div>
            <label
              htmlFor='responsavel'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
            >
              Veterinário / Responsável
            </label>
            <input
              id='responsavel'
              type='text'
              value={responsavel}
              onChange={e => setResponsavel(e.target.value)}
              required
              placeholder='Nome do profissional'
              className='w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-cyan-500 focus:border-cyan-500'
            />
          </div>

          {/* Campo Descrição */}
          <div>
            <label
              htmlFor='descricao'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
            >
              Descrição Detalhada do Atendimento
            </label>
            <textarea
              id='descricao'
              rows={4}
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              required
              placeholder='Diagnóstico, procedimentos realizados, medicamentos, etc.'
              className='w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-cyan-500 focus:border-cyan-500'
            ></textarea>
          </div>

          {/* Botão para Anexar Arquivos (Simulado) */}
          <div className='flex justify-between items-center pt-2'>
            <button
              type='button'
              onClick={handleFileUpload}
              className='flex items-center gap-2 p-2 text-xs font-semibold text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/50 rounded-md hover:bg-yellow-200 dark:hover:bg-yellow-800/50 transition disabled:opacity-50'
              disabled={isSaving}
            >
              <Paperclip size={16} /> Anexar Imagem/PDF (Opcional)
            </button>
            <span className='text-xs text-gray-500 dark:text-gray-400 italic'>
              Max 10MB por anexo.
            </span>
          </div>

          {/* Botões de Ação */}
          <div className='flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700'>
            <button
              type='button'
              onClick={onClose}
              className='p-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50'
              disabled={isSaving}
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='p-2 bg-cyan-600 text-white font-bold rounded-md hover:bg-cyan-700 transition flex items-center justify-center gap-2 disabled:bg-cyan-800 disabled:cursor-not-allowed'
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader size={20} className='animate-spin' /> Salvando...
                </>
              ) : (
                <>
                  <Send size={20} /> Salvar Histórico
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- COMPONENTE DETALHES DO PRONTUÁRIO (Atualizado para abrir o Modal) ---

interface ProntuarioDetalhesProps {
  pet: Pet;
  onClose: () => void;
  onAddHistorico: (entry: Omit<HistoricoEntry, 'id'>) => void;
}

const ProntuarioDetalhes: React.FC<ProntuarioDetalhesProps> = ({
  pet,
  onClose,
  onAddHistorico,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ordena o histórico pela data (mais recente primeiro)
  const historicoOrdenado = [...pet.historico].sort((a, b) => {
    // Converte a data DD/MM/AAAA para AAAA-MM-DD para comparação
    const dateA = new Date(a.data.split('/').reverse().join('-')).getTime();
    const dateB = new Date(b.data.split('/').reverse().join('-')).getTime();
    return dateB - dateA;
  });

  return (
    // Estilo adaptado para Dark Mode
    <div className='mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-pink-500 dark:border-pink-600 transition-colors duration-500'>
      <div className='flex justify-between items-start border-b border-gray-200 dark:border-gray-700 pb-3 mb-4'>
        {/* Título adaptado */}
        <h2 className='text-2xl font-bold text-pink-700 dark:text-pink-400 flex items-center gap-2'>
          <FileText size={24} /> Prontuário de {pet.nome}
        </h2>
        <button
          onClick={onClose}
          // Botão adaptado
          className='p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm font-semibold'
        >
          Fechar
        </button>
      </div>

      {/* Informações Básicas */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6 pb-4 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200'>
        <p>
          <strong>ID:</strong> {pet.id}
        </p>
        <p>
          <strong>Espécie:</strong> {pet.especie}
        </p>
        <p>
          <strong>Raça:</strong> {pet.raca}
        </p>
        <p>
          <strong>Cliente:</strong> {pet.cliente}
        </p>
        <p className='col-span-2 md:col-span-4'>
          <strong>Telefone:</strong> {pet.telefone}
        </p>
      </div>

      {/* HISTÓRICO DE ATENDIMENTOS (Consultas e Banhos) */}
      <h3 className='text-xl font-bold text-cyan-700 dark:text-cyan-400 mb-3 flex items-center gap-2'>
        <Calendar size={20} /> Histórico de Atendimentos
      </h3>

      <div className='space-y-4'>
        {historicoOrdenado.map(entry => (
          <div
            key={entry.id}
            // Cor da borda baseada no tipo de serviço e Dark Mode
            className={`p-4 rounded-lg shadow-sm border-l-4 transition-colors duration-500 ${
              entry.tipo === 'Banho' || entry.tipo === 'Tosa'
                ? 'border-pink-300 bg-pink-50 dark:border-pink-700 dark:bg-gray-700/50'
                : 'border-cyan-300 bg-cyan-50 dark:border-cyan-700 dark:bg-gray-700/50'
            }`}
          >
            <div className='flex justify-between items-center mb-2'>
              <span className='text-xs font-semibold uppercase text-gray-600 dark:text-gray-300'>
                {entry.data}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold ${
                  entry.tipo === 'Banho' || entry.tipo === 'Tosa'
                    ? 'bg-pink-200 text-pink-800'
                    : 'bg-cyan-200 text-cyan-800'
                }`}
              >
                {entry.tipo}
              </span>
            </div>
            <p className='text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1'>
              {entry.descricao}
            </p>
            <p className='text-xs italic text-gray-500 dark:text-gray-400'>
              Responsável: {entry.responsavel}
            </p>

            {/* ANEXOS */}
            {entry.arquivos.length > 0 && (
              <div className='mt-2 border-t border-gray-100 dark:border-gray-600 pt-2'>
                <p className='text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1'>
                  <Paperclip size={14} /> Anexos:
                </p>
                <div className='flex flex-wrap gap-2 mt-1'>
                  {entry.arquivos.map(file => (
                    <a
                      key={file.nome}
                      href={file.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      // Link adaptado para Dark Mode
                      className='text-xs text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/50 px-2 py-1 rounded-full hover:bg-yellow-200 dark:hover:bg-yellow-800/50 transition'
                    >
                      {file.nome}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {historicoOrdenado.length === 0 && (
          <p className='text-center text-gray-500 dark:text-gray-400 italic p-4 border border-dashed rounded-lg dark:border-gray-600'>
            Não há histórico de atendimentos registrado para este Pet.
          </p>
        )}
      </div>

      {/* BOTÃO PARA ADICIONAR NOVO HISTÓRICO (AGORA ABRE O MODAL) */}
      <div className='mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 text-center'>
        <button
          onClick={() => setIsModalOpen(true)}
          // Botão adaptado para Dark Mode
          className='p-3 bg-cyan-500 dark:bg-cyan-600 text-white font-bold rounded-md hover:bg-cyan-600 dark:hover:bg-cyan-700 transition flex items-center justify-center gap-2 mx-auto'
        >
          <PlusCircle size={20} /> Adicionar Novo Atendimento
        </button>
      </div>

      {/* RENDERIZAÇÃO DO MODAL */}
      {isModalOpen && (
        <AdicionarHistoricoModal
          pet={pet}
          onClose={() => setIsModalOpen(false)}
          onSave={onAddHistorico}
        />
      )}
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (PRONTUÁRIO) ---

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  // ESTADOS PARA GESTÃO DE DADOS (serão substituídos pela API)
  const [pacientes, setPacientes] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // SIMULAÇÃO DE BUSCA DE DADOS
  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simular um atraso de 1 segundo (latência de rede)
        setTimeout(() => {
          setPacientes(mockPacientes);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError('Falha ao carregar dados dos pacientes.');
        setIsLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Lógica de filtro
  const filteredPacientes = pacientes.filter(
    pet =>
      pet.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEdit = (pet: Pet) => {
    // A ser implementado: Abre o formulário de edição do cadastro
    console.log(
      `[Simulação] Abrindo formulário de edição para o Pet: ${pet.nome}.`,
    );
  };

  const handleViewProntuario = (pet: Pet) => {
    setSelectedPet(pet);
  };

  const handleCloseProntuario = () => {
    setSelectedPet(null);
  };

  // NOVA FUNÇÃO: Adiciona a entrada ao histórico (SIMULAÇÃO DE FRONTEND)
  const handleAddHistorico = (newEntry: Omit<HistoricoEntry, 'id'>) => {
    if (!selectedPet) return;

    // Simulação de adição de ID único (necessário no frontend mockado)
    const entryWithId = { ...newEntry, id: `H${Date.now()}` };

    // Cria uma cópia da lista de pacientes e encontra o pet
    setPacientes(prevPacientes =>
      prevPacientes.map(pet =>
        pet.id === selectedPet.id
          ? { ...pet, historico: [...pet.historico, entryWithId] }
          : pet,
      ),
    );

    // Atualiza o pet selecionado para que os detalhes sejam atualizados instantaneamente
    setSelectedPet(prevPet =>
      prevPet
        ? { ...prevPet, historico: [...prevPet.historico, entryWithId] }
        : null,
    );

    // No backend real, esta função chamaria a API POST e o onSnapshot faria a atualização.
  };

  return (
    // Container principal com Dark Mode
    <div className='p-8 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-150px)] flex justify-center items-start transition-colors duration-500'>
      <div className='container max-w-5xl w-full'>
        {/* TÍTULO H1 */}
        <h1 className='text-3xl font-extrabold text-center text-pink-600 dark:text-pink-400 mb-6 border-b-2 border-yellow-400 dark:border-yellow-600 pb-2 flex items-center justify-center gap-2'>
          <ClipboardList size={30} />
          Gerenciamento de Prontuários
        </h1>
        {/* Descrição */}
        <p className='text-center text-gray-500 dark:text-gray-400 mb-8'>
          Busque um paciente para visualizar seu histórico ou editar seu
          cadastro.
        </p>

        {/* --- 1. SEÇÃO DE BUSCA E LISTAGEM DE PACIENTES --- */}
        <section
          className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-cyan-500 ${
            selectedPet ? 'mb-4' : 'mb-8'
          } transition-colors duration-500`}
        >
          {/* Título da seção */}
          <h2 className='text-2xl font-bold text-cyan-700 dark:text-cyan-400 mb-4 flex items-center gap-2 border-b border-cyan-100 dark:border-gray-700 pb-2'>
            <PawPrint size={24} /> Listagem de Pacientes
          </h2>

          {/* CAMPO DE BUSCA */}
          <div className='mb-6 relative'>
            <input
              type='text'
              placeholder='Buscar por Nome do Pet, Nome do Cliente ou ID...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='w-full p-3 pl-10 border-2 border-cyan-300 dark:border-cyan-700 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-cyan-500 transition'
              disabled={!!selectedPet || isLoading || !!error}
            />
            <Search
              size={20}
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500 dark:text-cyan-400'
            />
          </div>

          {/* TABELA DE PACIENTES */}
          <div className='overflow-x-auto shadow-md rounded-lg border border-gray-100 dark:border-gray-700'>
            <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
              {/* Cabeçalho da tabela */}
              <thead className='bg-cyan-50 dark:bg-gray-700'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    Pet / Cliente
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell'>
                    Espécie / Raça
                  </th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    Ações
                  </th>
                </tr>
              </thead>
              {/* Corpo da tabela */}
              <tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700'>
                {isLoading && (
                  <tr>
                    <td
                      colSpan={3}
                      className='px-6 py-8 text-center text-cyan-600 dark:text-cyan-400 font-semibold'
                    >
                      <div className='flex items-center justify-center gap-3'>
                        <svg
                          className='animate-spin h-5 w-5 text-cyan-500'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                        A carregar pacientes...
                      </div>
                    </td>
                  </tr>
                )}

                {error && (
                  <tr>
                    <td
                      colSpan={3}
                      className='px-6 py-8 text-center text-red-600 dark:text-red-400 font-semibold'
                    >
                      Erro ao carregar os dados: {error}
                    </td>
                  </tr>
                )}

                {!isLoading && !error && filteredPacientes.length > 0
                  ? // Map the filteredPacientes
                    filteredPacientes.map(pet => (
                      <tr
                        key={pet.id}
                        className='hover:bg-gray-50 dark:hover:bg-gray-700 transition'
                      >
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100'>
                          <div className='flex items-center gap-2'>
                            <PawPrint size={16} className='text-pink-500' />
                            <div>
                              <div className='font-bold'>
                                {pet.nome}{' '}
                                <span className='text-xs text-gray-500 dark:text-gray-400 ml-1'>
                                  ({pet.id})
                                </span>
                              </div>
                              <div className='text-gray-500 dark:text-gray-400 text-xs flex items-center gap-1'>
                                <User size={12} /> {pet.cliente}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 hidden sm:table-cell'>
                          {pet.especie} {pet.raca && `(${pet.raca})`}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                          <div className='flex flex-col sm:flex-row gap-2 justify-center'>
                            {/* Botão para ABRIR PRONTUÁRIO */}
                            <button
                              onClick={() => handleViewProntuario(pet)}
                              className='p-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition flex items-center justify-center gap-1 text-xs sm:text-sm disabled:bg-pink-700'
                              title='Visualizar Prontuário'
                              disabled={selectedPet?.id === pet.id}
                            >
                              <FileText size={16} /> Prontuário
                            </button>

                            {/* Botão para EDITAR CADASTRO */}
                            <button
                              onClick={() => handleEdit(pet)}
                              className='p-2 bg-yellow-400 text-gray-800 rounded-md hover:bg-yellow-500 transition flex items-center justify-center gap-1 text-xs sm:text-sm'
                              title='Editar Cadastro do Cliente e Pet'
                            >
                              <Edit size={16} /> Editar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  : // Caso de busca Vazia ou Base de Dados Vazia, sem carregamento ou erro
                    !isLoading &&
                    !error && (
                      <tr>
                        <td
                          colSpan={3}
                          className='px-6 py-4 text-center text-gray-500 dark:text-gray-400 italic'
                        >
                          {searchTerm
                            ? 'Nenhum paciente encontrado para a sua busca.'
                            : 'Nenhum paciente registado na base de dados.'}
                        </td>
                      </tr>
                    )}
              </tbody>
            </table>
          </div>
        </section>

        {/* --- 2. SEÇÃO DE PRONTUÁRIO DETALHADO (Aparece ao selecionar um Pet) --- */}
        {selectedPet && (
          <ProntuarioDetalhes
            pet={selectedPet}
            onClose={handleCloseProntuario}
            onAddHistorico={handleAddHistorico} // Passa a nova função de salvar
          />
        )}
      </div>
    </div>
  );
}
