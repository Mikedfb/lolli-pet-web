import {
  StethoscopeIcon,
  User,
  Phone,
  PawPrint,
  Clock,
  CalendarDays,
  MessageSquare,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const agendamentoClinicoSchema = z.object({
  nomeCliente: z.string().min(1, 'Nome do cliente é obrigatório.'),
  telefone: z
    .string()
    .regex(
      /^\(\d{2}\)\s?\d{4,5}-\d{4}$/,
      'Telefone inválido (Ex: (00) 00000-0000).',
    ),
  nomePet: z.string().min(1, 'Nome do Pet é obrigatório.'),

  servico: z.enum(['consulta', 'exame', 'vacina', 'outro'], {
    message: 'Selecione o tipo de serviço.',
  }),

  data: z.string().min(1, 'A data é obrigatória.'),
  hora: z.string().min(1, 'A hora é obrigatória.'),

  observacoes: z
    .string()
    .max(500, 'Máximo de 500 caracteres')
    .nullable()
    .optional(),
});

type AgendamentoClinicoFormData = z.infer<typeof agendamentoClinicoSchema>;

export function AgendamentoClinico() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgendamentoClinicoFormData>({
    resolver: zodResolver(agendamentoClinicoSchema),
    defaultValues: {
      nomeCliente: '',
      telefone: '',
      nomePet: '',
      servico: 'consulta',
      data: '',
      hora: '',
      observacoes: null,
    },
  });

  function onSubmit(data: AgendamentoClinicoFormData) {
    console.log('Agendamento Clínico Enviado:', data);
    alert(`Agendamento para ${data.nomePet} realizado com sucesso!`);
    // Lógica de API aqui
  }

  return (
    <div className='p-8 bg-gray-50 min-h-[calc(100vh-150px)] flex justify-center items-start'>
      <div className='container max-w-2xl w-full'>
        <h1 className='text-3xl font-extrabold text-center text-pink-600 mb-6 border-b-2 border-yellow-400 pb-2 flex items-center justify-center gap-2'>
          <StethoscopeIcon size={30} />
          Novo Agendamento Clínico
        </h1>
        <p className='text-center text-gray-500 mb-8'>
          Preencha os dados do cliente e do pet para agendar uma consulta.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6 p-8 bg-white rounded-xl shadow-lg border border-gray-100'
        >
          <fieldset className='border-2 border-cyan-500 p-4 rounded-md'>
            <legend className='font-bold text-lg text-cyan-700 px-2'>
              Dados do Cliente
            </legend>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='form-group'>
                <label
                  htmlFor='nomeCliente'
                  className=' font-semibold text-gray-700 flex items-center gap-1'
                >
                  <User size={16} className='text-cyan-500' /> Nome:
                </label>
                <input
                  type='text'
                  id='nomeCliente'
                  {...register('nomeCliente')}
                  className='w-full p-2 border border-gray-300 rounded focus:border-cyan-500'
                />
                {errors.nomeCliente && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.nomeCliente.message}
                  </p>
                )}
              </div>

              <div className='form-group'>
                <label
                  htmlFor='telefone'
                  className=' font-semibold text-gray-700 flex items-center gap-1'
                >
                  <Phone size={16} className='text-cyan-500' /> Telefone:
                </label>
                <input
                  type='tel'
                  id='telefone'
                  {...register('telefone')}
                  placeholder='(00) 00000-0000'
                  className='w-full p-2 border border-gray-300 rounded focus:border-cyan-500'
                />
                {errors.telefone && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.telefone.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          <fieldset className='border-2 border-cyan-500 p-4 rounded-md'>
            <legend className='font-bold text-lg text-cyan-700 px-2'>
              Dados do Pet e Serviço
            </legend>

            <div className='form-group'>
              <label
                htmlFor='nomePet'
                className=' font-semibold text-gray-700 flex items-center gap-1'
              >
                <PawPrint size={16} className='text-cyan-500' /> Nome do Pet:
              </label>
              <input
                type='text'
                id='nomePet'
                {...register('nomePet')}
                className='w-full p-2 border border-gray-300 rounded focus:border-cyan-500'
              />
              {errors.nomePet && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.nomePet.message}
                </p>
              )}
            </div>

            <div className='form-group'>
              <label
                htmlFor='servico'
                className='block font-semibold text-gray-700'
              >
                Tipo de Serviço:
              </label>
              <select
                id='servico'
                {...register('servico')}
                className='w-full p-2 border border-gray-300 rounded focus:border-cyan-500 bg-white'
              >
                <option value='consulta'>Consulta de Rotina</option>
                <option value='exame'>Exame Específico</option>
                <option value='vacina'>Vacina</option>
                <option value='outro'>Outro</option>
              </select>
              {errors.servico && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.servico.message}
                </p>
              )}
            </div>
          </fieldset>

          <fieldset className='border-2 border-cyan-500 p-4 rounded-md'>
            <legend className='font-bold text-lg text-cyan-700 px-2'>
              Data e Hora
            </legend>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='form-group'>
                <label
                  htmlFor='data'
                  className=' font-semibold text-gray-700 flex items-center gap-1'
                >
                  <CalendarDays size={16} className='text-cyan-500' /> Data:
                </label>
                <input
                  type='date'
                  id='data'
                  {...register('data')}
                  className='w-full p-2 border border-gray-300 rounded focus:border-cyan-500'
                />
                {errors.data && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.data.message}
                  </p>
                )}
              </div>

              <div className='form-group'>
                <label
                  htmlFor='hora'
                  className=' font-semibold text-gray-700 flex items-center gap-1'
                >
                  <Clock size={16} className='text-cyan-500' /> Hora:
                </label>
                <input
                  type='time'
                  id='hora'
                  {...register('hora')}
                  className='w-full p-2 border border-gray-300 rounded focus:border-cyan-500'
                />
                {errors.hora && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.hora.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          <div className='form-group'>
            <label
              htmlFor='observacoes'
              className=' font-semibold text-gray-700 flex items-center gap-1'
            >
              <MessageSquare size={16} className='text-cyan-500' /> Observações
              (Opcional):
            </label>
            <textarea
              id='observacoes'
              rows={3}
              {...register('observacoes')}
              placeholder='Ex: Suspeita de dor na pata traseira. Medicamento de uso contínuo.'
              className='w-full p-2 border border-gray-300 rounded focus:border-cyan-500'
            ></textarea>
            {errors.observacoes && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.observacoes.message}
              </p>
            )}
          </div>

          <button
            type='submit'
            className='w-full p-3 bg-cyan-500 text-white font-bold rounded-md hover:bg-cyan-600 transition'
          >
            Agendar Consulta
          </button>
        </form>
      </div>
    </div>
  );
}
