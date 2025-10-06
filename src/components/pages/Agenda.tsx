import {
  StethoscopeIcon,
  BathIcon,
  Clock,
  User,
  CalendarDays,
  PlusCircle,
  Trash2,
  Bell,
} from 'lucide-react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; //

const lembreteSchema = z.object({
  texto: z.string().min(6, 'O lembrete deve ter no mínimo 6 caracteres.'),
});

type LembreteFormData = z.infer<typeof lembreteSchema>;

interface Agendamento {
  id: string;
  hora: string;
  nomeCliente: string;
  nomePet: string;
  servico: string;
  tipo: 'clinico' | 'petshop';
}

interface Lembrete {
  id: string;
  texto: string;
}

const mockAgendamentosClinicos: Agendamento[] = [
  {
    id: '1',
    hora: '09:00',
    nomeCliente: 'Ana Silva',
    nomePet: 'Max',
    servico: 'Consulta de Rotina',
    tipo: 'clinico',
  },
  {
    id: '2',
    hora: '10:30',
    nomeCliente: 'João Pereira',
    nomePet: 'Luna',
    servico: 'Vacina (V8)',
    tipo: 'clinico',
  },
  {
    id: '3',
    hora: '14:00',
    nomeCliente: 'Mariana Souza',
    nomePet: 'Bisteca',
    servico: 'Exame de Sangue',
    tipo: 'clinico',
  },
];

const mockAgendamentosPetshop: Agendamento[] = [
  {
    id: '4',
    hora: '08:30',
    nomeCliente: 'Carlos Alves',
    nomePet: 'Mel',
    servico: 'Banho e Tosa Completa',
    tipo: 'petshop',
  },
  {
    id: '5',
    hora: '11:00',
    nomeCliente: 'Fábio Gomes',
    nomePet: 'Rex',
    servico: 'Tosa Higiênica',
    tipo: 'petshop',
  },
  {
    id: '6',
    hora: '15:30',
    nomeCliente: 'Patrícia Lima',
    nomePet: 'Nina',
    servico: 'Apenas Banho',
    tipo: 'petshop',
  },
];

const AgendamentoCard = ({ agendamento }: { agendamento: Agendamento }) => {
  const isClinico = agendamento.tipo === 'clinico';
  const borderColor = isClinico ? 'border-cyan-500' : 'border-pink-500';
  const textColor = isClinico ? 'text-cyan-700' : 'text-pink-700';

  return (
    <div
      className={`p-4 mb-4 bg-white shadow-md rounded-lg border-l-4 ${borderColor} transition hover:shadow-lg`}
    >
      <div className='flex items-center justify-between mb-2'>
        <div
          className={`font-extrabold text-lg ${textColor} flex items-center gap-2`}
        >
          <Clock size={20} />
          {agendamento.hora}
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            isClinico
              ? 'bg-cyan-100 text-cyan-700'
              : 'bg-pink-100 text-pink-700'
          }`}
        >
          {isClinico ? 'Clínica' : 'Petshop'}
        </span>
      </div>
      <p className='text-gray-900 font-semibold mb-1'>{agendamento.servico}</p>
      <div className='text-sm text-gray-600 space-y-0.5'>
        <p>
          <span className='font-medium'>Pet:</span> {agendamento.nomePet}
        </p>
        <p className='flex items-center gap-1'>
          <User size={14} />
          {agendamento.nomeCliente}
        </p>
      </div>
    </div>
  );
};

export function Agenda() {
  const hoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Estado para gerenciar a lista de lembretes
  const [lembretes, setLembretes] = useState<Lembrete[]>([
    { id: uuidv4(), texto: 'Verificar estoque de vacinas V10.' },
    { id: uuidv4(), texto: 'Ligar para o fornecedor de rações premium.' },
    {
      id: uuidv4(),
      texto:
        'A Tosa do Max (09:00) precisa de atenção especial na orelha esquerda.',
    },
  ]);

  // Configuração do React Hook Form para o formulário de Lembrete
  const {
    register,
    handleSubmit,
    reset, // Usado para limpar o campo após a submissão
    formState: { errors },
  } = useForm<LembreteFormData>({
    resolver: zodResolver(lembreteSchema),
    defaultValues: {
      texto: '',
    },
  });

  // Função para adicionar um novo lembrete
  function handleAddLembrete(data: LembreteFormData) {
    const novoItem: Lembrete = {
      id: uuidv4(),
      texto: data.texto,
    };
    setLembretes([...lembretes, novoItem]);
    reset(); // Limpa o campo após a submissão bem-sucedida
  }

  // Função para remover um lembrete
  function handleRemoveLembrete(id: string) {
    setLembretes(lembretes.filter(lembrete => lembrete.id !== id));
  }

  return (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-4xl font-extrabold text-center text-pink-600 mb-2 border-b-2 border-yellow-400 pb-2'>
          Agenda do Dia
        </h1>
        <p className='text-center text-gray-500 mb-10 text-xl font-medium flex items-center justify-center gap-2'>
          <CalendarDays size={20} className='text-gray-400' />
          {hoje.charAt(0).toUpperCase() + hoje.slice(1)}
        </p>

        <div className='flex flex-wrap lg:flex-nowrap gap-8 justify-center'>
          <section className='w-full lg:w-1/2 p-6 bg-white rounded-xl shadow-lg border-t-4 border-cyan-500'>
            <h2 className='text-2xl font-bold text-center text-cyan-600 mb-6 flex items-center justify-center gap-3'>
              <StethoscopeIcon size={24} />
              Consultório Veterinário
            </h2>

            <div className='space-y-4'>
              {mockAgendamentosClinicos.length > 0 ? (
                mockAgendamentosClinicos.map(agendamento => (
                  <AgendamentoCard
                    key={agendamento.id}
                    agendamento={agendamento}
                  />
                ))
              ) : (
                <p className='text-center text-gray-500 p-8 bg-gray-100 rounded-md'>
                  Nenhum agendamento clínico para hoje.
                </p>
              )}
            </div>
          </section>

          <section className='w-full lg:w-1/2 p-6 bg-white rounded-xl shadow-lg border-t-4 border-pink-500'>
            <h2 className='text-2xl font-bold text-center text-pink-600 mb-6 flex items-center justify-center gap-3'>
              <BathIcon size={24} />
              Petshop e Estética
            </h2>

            <div className='space-y-4'>
              {mockAgendamentosPetshop.length > 0 ? (
                mockAgendamentosPetshop.map(agendamento => (
                  <AgendamentoCard
                    key={agendamento.id}
                    agendamento={agendamento}
                  />
                ))
              ) : (
                <p className='text-center text-gray-500 p-8 bg-gray-100 rounded-md'>
                  Nenhum agendamento de petshop para hoje.
                </p>
              )}
            </div>
          </section>
        </div>

        <section className='mt-10 p-6 bg-white rounded-xl shadow-lg border-t-4 border-yellow-500 max-w-full mx-auto'>
          <h2 className='text-2xl font-bold text-center text-yellow-600 mb-4 flex items-center justify-center gap-3'>
            <Bell size={24} />
            Lembretes e Avisos do Dia
          </h2>

          <form
            onSubmit={handleSubmit(handleAddLembrete)}
            className='flex gap-3 mb-6 items-start'
          >
            <div className='flex-1'>
              <input
                type='text'
                id='novoLembrete'
                {...register('texto')}
                placeholder='Adicionar novo lembrete...'
                className='p-2 border border-gray-300 rounded focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 w-full'
              />
              {errors.texto && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.texto.message}
                </p>
              )}
            </div>
            <button
              type='submit'
              className='p-2 bg-yellow-500 text-white rounded font-semibold hover:bg-yellow-600 transition flex items-center gap-1 h-[42px] min-w-[120px] justify-center'
            >
              <PlusCircle size={20} />
              Adicionar
            </button>
          </form>

          <div className='space-y-3'>
            {lembretes.length > 0 ? (
              lembretes.map(lembrete => (
                <div
                  key={lembrete.id}
                  className='flex justify-between items-center text-gray-700 p-3 bg-yellow-50 rounded-md border-l-4 border-yellow-500 shadow-sm'
                >
                  <p className='text-sm font-medium flex-1 mr-4'>
                    {lembrete.texto}
                  </p>
                  <button
                    onClick={() => handleRemoveLembrete(lembrete.id)}
                    className='p-1 text-red-500 hover:text-red-700 transition'
                    title='Excluir Lembrete'
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            ) : (
              <p className='text-center text-gray-500 p-6 bg-gray-100 rounded-md'>
                Nenhum lembrete importante adicionado para hoje.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
