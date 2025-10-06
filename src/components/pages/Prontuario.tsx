import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import {
  Search,
  FileText,
  PlusCircle,
  Calendar,
  User,
  Stethoscope,
  MessageSquare,
} from 'lucide-react';

// --- TIPOS E SCHEMAS ---

interface ProntuarioEntrada {
  id: string;
  data: string;
  medico: string;
  tipo: 'consulta' | 'exame' | 'cirurgia' | 'outro';
  descricao: string;
}

interface PetProntuario {
  id: string;
  nome: string;
  cliente: string;
  raca: string;
  especie: string;
  historico: ProntuarioEntrada[];
}

const novaEntradaSchema = z.object({
  data: z.string().min(1, 'A data é obrigatória.'),
  medico: z.string().min(3, 'O nome do médico é obrigatório.'),
  tipo: z.enum(['consulta', 'exame', 'cirurgia', 'outro']),
  descricao: z
    .string()
    .min(10, 'A descrição deve ter no mínimo 10 caracteres.'),
});

type NovaEntradaFormData = z.infer<typeof novaEntradaSchema>;

// --- MOCK DATA ---
const mockProntuarios: PetProntuario[] = [
  {
    id: 'pet-1',
    nome: 'Max',
    cliente: 'Ana Silva',
    raca: 'Golden Retriever',
    especie: 'Cachorro',
    historico: [
      {
        id: 'hist-1',
        data: '2025-05-15',
        medico: 'Dr. João Mendes',
        tipo: 'consulta',
        descricao:
          'Consulta de rotina. Peso: 32kg. Vacina V10 aplicada. Recomendado vermífugo mensal.',
      },
      {
        id: 'hist-2',
        data: '2025-08-01',
        medico: 'Dra. Maria Clara',
        tipo: 'exame',
        descricao:
          'Exame de sangue completo. Leve alteração hepática detectada. Prescrito suplemento vitamínico por 30 dias.',
      },
    ],
  },
  {
    id: 'pet-2',
    nome: 'Nina',
    cliente: 'Carlos Alves',
    raca: 'Siamês',
    especie: 'Gato',
    historico: [
      {
        id: 'hist-3',
        data: '2025-09-01',
        medico: 'Dr. João Mendes',
        tipo: 'consulta',
        descricao:
          'Check-up anual. Peso: 4kg. Gengivite leve. Recomendada mudança para ração dental.',
      },
    ],
  },
];

const EntradaHistoricoCard = ({ entrada }: { entrada: ProntuarioEntrada }) => {
  const tipoMap = {
    consulta: { text: 'Consulta', color: 'border-cyan-500', icon: Stethoscope },
    exame: {
      text: 'Exame/Diagnóstico',
      color: 'border-blue-500',
      icon: MessageSquare,
    },
    cirurgia: { text: 'Cirurgia', color: 'border-red-500', icon: PlusCircle },
    outro: {
      text: 'Outro Atendimento',
      color: 'border-gray-500',
      icon: FileText,
    },
  };
  const details = tipoMap[entrada.tipo] || tipoMap.outro;

  return (
    <div
      className={`p-4 bg-white shadow-md rounded-lg border-l-4 ${details.color} mb-4 transition hover:shadow-lg`}
    >
      <div className='flex items-center justify-between mb-2 pb-2 border-b border-gray-100'>
        <div
          className={`font-bold text-lg text-gray-800 flex items-center gap-2`}
        >
          <details.icon size={20} className='text-gray-500' />
          {details.text}
        </div>
        <span
          className={`text-sm font-semibold text-gray-600 flex items-center gap-1`}
        >
          <Calendar size={14} />
          {entrada.data}
        </span>
      </div>
      <p className='text-sm text-gray-700 mb-2 whitespace-pre-line'>
        {entrada.descricao}
      </p>
      <p className='text-xs text-gray-500 flex items-center gap-1'>
        <Stethoscope size={14} />
        <span className='font-semibold'>Veterinário:</span> {entrada.medico}
      </p>
    </div>
  );
};

export function Prontuario() {
  const [petEncontrado, setPetEncontrado] = useState<PetProntuario | null>(
    null,
  );
  const [termoBusca, setTermoBusca] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NovaEntradaFormData>({
    resolver: zodResolver(novaEntradaSchema),
  });

  // Função de Busca
  function handleBuscarPet() {
    const termo = termoBusca.trim().toLowerCase();
    if (!termo) {
      setPetEncontrado(null);
      return;
    }

    // Simula a busca: encontra o pet pelo nome ou pelo nome do cliente
    const encontrado = mockProntuarios.find(
      pet =>
        pet.nome.toLowerCase() === termo ||
        pet.cliente.toLowerCase().includes(termo),
    );

    setPetEncontrado(encontrado || null);
  }

  // Função para adicionar nova entrada ao histórico (Simulação)
  function handleAddEntrada(data: NovaEntradaFormData) {
    if (!petEncontrado) {
      alert('Selecione um pet antes de adicionar uma entrada.');
      return;
    }

    const novaEntrada: ProntuarioEntrada = {
      id: uuidv4(),
      ...data,
    };

    // Lógica para adicionar a nova entrada ao histórico do pet encontrado
    // chamada de API (POST)
    console.log(
      'Nova Entrada Salva para o Pet:',
      petEncontrado.nome,
      novaEntrada,
    );

    const novoProntuario: PetProntuario = {
      ...petEncontrado,
      historico: [novaEntrada, ...petEncontrado.historico],
    };
    setPetEncontrado(novoProntuario);

    alert(
      `Entrada de prontuário salva com sucesso para ${petEncontrado.nome}!`,
    );
    reset();
  }

  return (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-extrabold text-center text-pink-600 mb-2 border-b-2 border-yellow-400 pb-2'>
          Gerenciamento de Prontuários
        </h1>
        <p className='text-center text-gray-500 mb-10 text-xl font-medium flex items-center justify-center gap-2'>
          <FileText size={20} className='text-gray-400' />
          Histórico clínico e de atendimentos dos pacientes
        </p>

        <section className='p-6 bg-white rounded-xl shadow-lg border-t-4 border-pink-500 mb-8'>
          <h2 className='text-2xl font-bold text-pink-600 mb-4 flex items-center gap-3'>
            <Search size={24} />
            Buscar Prontuário
          </h2>
          <div className='flex gap-3'>
            <input
              type='text'
              value={termoBusca}
              onChange={e => setTermoBusca(e.target.value)}
              placeholder='Buscar por Nome do Pet ou Cliente...'
              className='flex-1 p-3 border border-gray-300 rounded focus:border-pink-500 focus:ring-1 focus:ring-pink-500'
            />
            <button
              onClick={handleBuscarPet}
              className='p-3 bg-pink-500 text-white rounded font-semibold hover:bg-pink-600 transition min-w-[120px]'
            >
              Buscar
            </button>
          </div>
        </section>

        {petEncontrado ? (
          <div>
            <section className='p-6 bg-white rounded-xl shadow-lg border-t-4 border-cyan-500 mb-8'>
              <h2 className='text-2xl font-bold text-cyan-600 mb-4 flex items-center gap-3'>
                <FileText size={24} />
                Prontuário de {petEncontrado.nome}
              </h2>
              <div className='grid grid-cols-2 gap-x-6 gap-y-2 text-gray-700'>
                <p>
                  <span className='font-semibold'>Cliente:</span>{' '}
                  {petEncontrado.cliente}
                </p>
                <p>
                  <span className='font-semibold'>Espécie:</span>{' '}
                  {petEncontrado.especie}
                </p>
                <p>
                  <span className='font-semibold'>Raça:</span>{' '}
                  {petEncontrado.raca}
                </p>
                {/* Adicionar outros detalhes aqui se necessário */}
              </div>
            </section>

            <section className='p-6 bg-white rounded-xl shadow-lg border-t-4 border-cyan-500 mb-8'>
              <h2 className='text-2xl font-bold text-cyan-600 mb-4 flex items-center gap-3'>
                <PlusCircle size={24} />
                Registrar Nova Entrada de Atendimento
              </h2>
              <form
                onSubmit={handleSubmit(handleAddEntrada)}
                className='space-y-4'
              >
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div className='form-group'>
                    <label
                      htmlFor='data'
                      className='block font-semibold text-gray-700'
                    >
                      Data
                    </label>
                    <input
                      type='date'
                      id='data'
                      {...register('data')}
                      className='p-2 border border-gray-300 rounded w-full'
                    />
                    {errors.data && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.data.message}
                      </p>
                    )}
                  </div>

                  <div className='form-group'>
                    <label
                      htmlFor='medico'
                      className='block font-semibold text-gray-700'
                    >
                      Médico Veterinário
                    </label>
                    <input
                      type='text'
                      id='medico'
                      {...register('medico')}
                      placeholder='Ex: Dr. João'
                      className='p-2 border border-gray-300 rounded w-full'
                    />
                    {errors.medico && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.medico.message}
                      </p>
                    )}
                  </div>

                  <div className='form-group'>
                    <label
                      htmlFor='tipo'
                      className='block font-semibold text-gray-700'
                    >
                      Tipo de Atendimento
                    </label>
                    <select
                      id='tipo'
                      {...register('tipo')}
                      className='p-2 border border-gray-300 rounded w-full bg-white'
                    >
                      <option value='consulta'>Consulta</option>
                      <option value='exame'>Exame/Diagnóstico</option>
                      <option value='cirurgia'>Cirurgia</option>
                      <option value='outro'>Outro</option>
                    </select>
                    {errors.tipo && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.tipo.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className='form-group'>
                  <label
                    htmlFor='descricao'
                    className='block font-semibold text-gray-700'
                  >
                    Descrição do Atendimento
                  </label>
                  <textarea
                    id='descricao'
                    {...register('descricao')}
                    rows={4}
                    placeholder='Descreva o diagnóstico, procedimentos e prescrições...'
                    className='p-2 border border-gray-300 rounded w-full'
                  ></textarea>
                  {errors.descricao && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.descricao.message}
                    </p>
                  )}
                </div>

                <button
                  type='submit'
                  className='p-3 bg-cyan-500 text-white rounded font-semibold hover:bg-cyan-600 transition w-full flex items-center justify-center gap-2'
                >
                  <FileText size={20} />
                  Salvar Entrada no Prontuário
                </button>
              </form>
            </section>

            {/* --- HISTÓRICO DE ENTRADAS --- */}
            <section className='p-6 bg-white rounded-xl shadow-lg border-t-4 border-gray-400'>
              <h2 className='text-2xl font-bold text-gray-600 mb-6 flex items-center gap-3'>
                Histórico de Atendimentos
              </h2>
              <div className='space-y-4'>
                {petEncontrado.historico.length > 0 ? (
                  petEncontrado.historico.map(entrada => (
                    <EntradaHistoricoCard key={entrada.id} entrada={entrada} />
                  ))
                ) : (
                  <p className='text-center text-gray-500 p-8 bg-gray-100 rounded-md'>
                    Nenhuma entrada encontrada neste prontuário.
                  </p>
                )}
              </div>
            </section>
          </div>
        ) : (
          <div className='p-12 bg-white rounded-xl shadow-lg border-t-4 border-pink-500 mb-8 text-center'>
            <FileText size={48} className='text-gray-300 mx-auto mb-4' />
            <p className='text-xl text-gray-600 font-semibold'>
              Use o campo de busca acima para encontrar um prontuário pelo nome
              do Pet ou do Cliente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
