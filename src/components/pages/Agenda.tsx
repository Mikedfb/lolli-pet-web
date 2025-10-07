import {
  CalendarDays,
  StethoscopeIcon,
  BathIcon,
  Clock,
  User,
  PawPrint,
  Trash2,
  Edit,
} from 'lucide-react';

// --- INTERFACES DE DADOS (Mock) ---

interface AgendamentoBase {
  id: string;
  hora: string;
  nomeCliente: string;
  nomePet: string;
  observacoes?: string;
}

interface AgendamentoClinico extends AgendamentoBase {
  tipoServico: 'Consulta' | 'Exame' | 'Vacina' | 'Outro';
  medicoResponsavel: string;
}

interface AgendamentoPetshop extends AgendamentoBase {
  tipoServico: 'Banho' | 'Tosa' | 'Banho e Tosa' | 'Tosa Higiênica' | 'Outro';
  profissional: string;
}

// --- DADOS MOCKADOS PARA EXEMPLO ---

const mockAgendaClinica: AgendamentoClinico[] = [
  {
    id: 'CL001',
    hora: '09:00',
    nomeCliente: 'Ana Silva',
    nomePet: 'Rex',
    tipoServico: 'Consulta',
    medicoResponsavel: 'Dr(a). Juliana',
  },
  {
    id: 'CL002',
    hora: '11:30',
    nomeCliente: 'Carlos Souza',
    nomePet: 'Miau',
    tipoServico: 'Vacina',
    medicoResponsavel: 'Dr(a). Pedro',
    observacoes: 'Vacina anual (Raiva)',
  },
];

const mockAgendaPetshop: AgendamentoPetshop[] = [
  {
    id: 'PS001',
    hora: '10:00',
    nomeCliente: 'Mariana Lima',
    nomePet: 'Lola',
    tipoServico: 'Banho e Tosa',
    profissional: 'Felipe',
  },
  {
    id: 'PS002',
    hora: '14:00',
    nomeCliente: 'João Pereira',
    nomePet: 'Kiko',
    tipoServico: 'Tosa Higiênica',
    profissional: 'Fernanda',
    observacoes: 'Muito agitado, precisa de ajuda extra.',
  },
];

interface AgendamentoCardProps {
  agendamento: AgendamentoClinico | AgendamentoPetshop;
  tipo: 'clinica' | 'petshop';
  onCancel: (id: string) => void;
  onEdit: (
    id: string,
    currentData: AgendamentoClinico | AgendamentoPetshop,
  ) => void;
}

// --- COMPONENTE INTERNO: AgendamentoCard (AGORA COM DARK MODE) ---

const AgendamentoCard: React.FC<AgendamentoCardProps> = ({
  agendamento,
  tipo,
  onCancel,
  onEdit,
}) => {
  const isClinica = tipo === 'clinica';
  //  Cores de Borda e Acento Adaptadas
  const borderClass = isClinica
    ? 'border-cyan-500 dark:border-cyan-600'
    : 'border-pink-500 dark:border-pink-600';
  const accentClass = isClinica
    ? 'text-cyan-600 dark:text-cyan-400'
    : 'text-pink-600 dark:text-pink-400';
  const isPetshop = tipo === 'petshop';

  return (
    <div
      //  Fundo, Sombra e Hover do Card Adaptados
      className={`agendamento-card bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 ${borderClass} transition hover:shadow-lg dark:shadow-gray-700/50`}
    >
      <div className='flex justify-between items-start'>
        {/* Título Adaptado */}
        <h3
          className={`text-xl font-bold text-gray-800 dark:text-gray-200 ${accentClass}`}
        >
          {agendamento.tipoServico}
        </h3>
        {/*  ID Adaptado */}
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          #{agendamento.id}
        </span>
      </div>

      {/* Cor do Texto e Ícones dos Detalhes Adaptadas */}
      <p className='mt-2 text-sm flex items-center gap-2 text-gray-700 dark:text-gray-300'>
        <Clock size={16} className={accentClass} />
        <span className='font-bold'>Horário:</span> {agendamento.hora}
      </p>

      <p className='text-sm flex items-center gap-2 text-gray-700 dark:text-gray-300'>
        <User size={16} className='text-gray-500 dark:text-gray-400' />
        <span className='font-bold'>Cliente:</span> {agendamento.nomeCliente}
      </p>

      <p className='text-sm flex items-center gap-2 text-gray-700 dark:text-gray-300'>
        <PawPrint size={16} className='text-gray-500 dark:text-gray-400' />
        <span className='font-bold'>Pet:</span> {agendamento.nomePet}
      </p>

      {isClinica && (
        <p className='text-sm flex items-center gap-2 text-gray-700 dark:text-gray-300'>
          <StethoscopeIcon
            size={16}
            className='text-gray-500 dark:text-gray-400'
          />
          <span className='font-bold'>Médico:</span>{' '}
          {(agendamento as AgendamentoClinico).medicoResponsavel}
        </p>
      )}
      {isPetshop && (
        <p className='text-sm flex items-center gap-2 text-gray-700 dark:text-gray-300'>
          <BathIcon size={16} className='text-gray-500 dark:text-gray-400' />
          <span className='font-bold'>Profissional:</span>{' '}
          {(agendamento as AgendamentoPetshop).profissional}
        </p>
      )}

      {agendamento.observacoes && (
        //  Observações e Borda Separadora Adaptadas
        <p className='text-xs italic mt-2 text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600 pt-2'>
          Obs: {agendamento.observacoes}
        </p>
      )}

      <div className='flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700'>
        <button
          onClick={() => onEdit(agendamento.id, agendamento)}
          //  Botão Editar Adaptado
          className={`flex-1 p-2 bg-yellow-400 dark:bg-yellow-600 text-gray-800 dark:text-gray-50 font-bold rounded-md hover:bg-yellow-500 dark:hover:bg-yellow-700 transition flex items-center justify-center gap-1 text-sm`}
        >
          <Edit size={16} /> Editar
        </button>
        <button
          onClick={() => onCancel(agendamento.id)}
          //  Botão Cancelar Adaptado
          className='flex-1 p-2 bg-red-500 dark:bg-red-600 text-white font-bold rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition flex items-center justify-center gap-1 text-sm'
        >
          <Trash2 size={16} /> Cancelar
        </button>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL: Agenda (AGORA COM DARK MODE) ---

export function Agenda() {
  const hoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  // 1. Função Mock para Cancelamento
  const handleCancel = (id: string) => {
    const confirmacao = window.confirm(
      `Tem certeza que deseja cancelar o agendamento ${id}?`,
    );
    if (confirmacao) {
      alert(`Agendamento ${id} cancelado! (Esta é uma função mock)`);
      // Lógica real de cancelamento da API
    }
  };

  const handleEdit = (
    id: string,
    data: AgendamentoClinico | AgendamentoPetshop,
  ) => {
    alert(
      `Preparando para editar o agendamento ${id} de ${data.nomePet}. Você alteraria o dia/hora aqui.`,
    );
    console.log('Dados a serem editados:', data);
  };

  return (
    //  Fundo da Página Adaptado
    <div className='p-8 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-150px)] flex justify-center items-start transition-colors duration-500'>
      <div className='container max-w-6xl w-full'>
        {/* Título Principal Adaptado */}
        <h1 className='text-3xl font-extrabold text-center text-pink-600 dark:text-pink-400 mb-6 border-b-2 border-yellow-400 dark:border-yellow-600 pb-2 flex items-center justify-center gap-2'>
          <CalendarDays size={30} />
          Agenda do Dia
        </h1>
        {/*  Parágrafo de Data Adaptado */}
        <p className='text-center text-gray-500 dark:text-gray-400 mb-8 font-semibold'>
          Agendamentos para **{hoje}**
        </p>

        <div className='agenda-container flex flex-col lg:flex-row gap-8'>
          {/*  Seção Clínica Fundo, Borda e Sombra Adaptados */}
          <section className='agenda-clinica flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-cyan-500 dark:border-cyan-600 transition-colors duration-500'>
            {/*  Título Seção Clínica Adaptado */}
            <h2 className='text-2xl font-bold text-center text-cyan-700 dark:text-cyan-400 mb-6 border-b border-cyan-200 dark:border-cyan-700 pb-3 flex items-center justify-center gap-2'>
              <StethoscopeIcon size={24} /> Agenda Clínica
            </h2>
            <div className='space-y-4'>
              {mockAgendaClinica.map(agendamento => (
                <AgendamentoCard
                  key={agendamento.id}
                  agendamento={agendamento}
                  tipo='clinica'
                  onCancel={handleCancel}
                  onEdit={handleEdit}
                />
              ))}
            </div>
            {mockAgendaClinica.length === 0 && (
              <p className='text-center text-gray-500 dark:text-gray-400 italic mt-8'>
                Nenhum agendamento clínico para hoje.
              </p>
            )}
          </section>

          {/* Seção Petshop Fundo, Borda e Sombra Adaptados */}
          <section className='agenda-petshop flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-pink-500 dark:border-pink-600 transition-colors duration-500'>
            {/*  Título Seção Petshop Adaptado */}
            <h2 className='text-2xl font-bold text-center text-pink-700 dark:text-pink-400 mb-6 border-b border-pink-200 dark:border-pink-700 pb-3 flex items-center justify-center gap-2'>
              <BathIcon size={24} /> Agenda Petshop
            </h2>
            <div className='space-y-4'>
              {mockAgendaPetshop.map(agendamento => (
                <AgendamentoCard
                  key={agendamento.id}
                  agendamento={agendamento}
                  tipo='petshop'
                  onCancel={handleCancel}
                  onEdit={handleEdit}
                />
              ))}
            </div>
            {mockAgendaPetshop.length === 0 && (
              <p className='text-center text-gray-500 dark:text-gray-400 italic mt-8'>
                Nenhum agendamento de petshop para hoje.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
