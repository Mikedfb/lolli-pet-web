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
} from 'lucide-react';
import React, { useState } from 'react';

// --- INTERFACES DE DADOS (Mock) ---

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

// --- COMPONENTE DETALHES DO PRONTUÁRIO ---

interface ProntuarioDetalhesProps {
  pet: Pet;
  onClose: () => void;
}

const ProntuarioDetalhes: React.FC<ProntuarioDetalhesProps> = ({
  pet,
  onClose,
}) => {
  // Ordena o histórico pela data (mais recente primeiro)
  const historicoOrdenado = [...pet.historico].sort((a, b) => {
    // Converte a data DD/MM/AAAA para AAAA-MM-DD para comparação
    const dateA = new Date(a.data.split('/').reverse().join('-')).getTime();
    const dateB = new Date(b.data.split('/').reverse().join('-')).getTime();
    return dateB - dateA;
  });

  // Simula o Anexo de Arquivo
  const handleAnexarArquivo = () => {
    // Substituído alert() por console.log()
    console.log(
      `[Simulação] Abrindo seletor de arquivos para anexar um novo documento ao Pet ${pet.nome}.`,
    );
    // Aqui seria a lógica de upload e atualização do histórico.
  };

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

      {/* BOTÃO PARA ANEXAR ARQUIVOS */}
      <div className='mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 text-center'>
        <button
          onClick={handleAnexarArquivo}
          // Botão adaptado para Dark Mode
          className='p-3 bg-cyan-500 dark:bg-cyan-600 text-white font-bold rounded-md hover:bg-cyan-600 dark:hover:bg-cyan-700 transition flex items-center justify-center gap-2 mx-auto'
        >
          <PlusCircle size={20} /> Anexar Novo Arquivo/Imagem
        </button>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (PRONTUÁRIO) ---
// FIX: Renomeado para App e alterado para exportação padrão para funcionar no ambiente de ficheiro único.
export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null); // Estado para o Pet selecionado

  // Lógica de filtro para a busca
  const filteredPacientes = mockPacientes.filter(
    pet =>
      pet.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEdit = (pet: Pet) => {
    // Substituído alert() por console.log()
    console.log(
      `[Simulação] Abrindo formulário de edição para o Pet: ${pet.nome} (Cliente: ${pet.cliente}).`,
    );
  };

  // Função que SELECIONA o Pet e abre a visualização detalhada
  const handleViewProntuario = (pet: Pet) => {
    setSelectedPet(pet);
  };

  // Função para fechar a visualização detalhada
  const handleCloseProntuario = () => {
    setSelectedPet(null);
  };

  return (
    // Container principal com Dark Mode
    <div className='p-8 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-150px)] flex justify-center items-start transition-colors duration-500'>
      <div className='container max-w-5xl w-full'>
        {/* TÍTULO H1 adaptado */}
        <h1 className='text-3xl font-extrabold text-center text-pink-600 dark:text-pink-400 mb-6 border-b-2 border-yellow-400 dark:border-yellow-600 pb-2 flex items-center justify-center gap-2'>
          <ClipboardList size={30} />
          Gerenciamento de Prontuários
        </h1>
        {/* Descrição adaptada */}
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
          {/* Título da seção adaptado */}
          <h2 className='text-2xl font-bold text-cyan-700 dark:text-cyan-400 mb-4 flex items-center gap-2 border-b border-cyan-100 dark:border-gray-700 pb-2'>
            <PawPrint size={24} /> Listagem de Pacientes
          </h2>

          {/* CAMPO DE BUSCA adaptado */}
          <div className='mb-6 relative'>
            <input
              type='text'
              placeholder='Buscar por Nome do Pet, Nome do Cliente ou ID...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='w-full p-3 pl-10 border-2 border-cyan-300 dark:border-cyan-700 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-cyan-500 transition'
              disabled={!!selectedPet} // Desabilita a busca ao ver o prontuário
            />
            <Search
              size={20}
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500 dark:text-cyan-400'
            />
          </div>

          {/* TABELA DE PACIENTES */}
          <div className='overflow-x-auto shadow-md rounded-lg border border-gray-100 dark:border-gray-700'>
            <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
              {/* Cabeçalho da tabela adaptado */}
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
              {/* Corpo da tabela adaptado */}
              <tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700'>
                {filteredPacientes.length > 0 ? (
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
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className='px-6 py-4 text-center text-gray-500 dark:text-gray-400 italic'
                    >
                      Nenhum paciente encontrado.
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
          />
        )}
      </div>
    </div>
  );
}
