import {
  BathIcon,
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

const agendamentoPetshopSchema = z.object({
  nomeCliente: z.string().min(1, 'Nome do cliente é obrigatório.'),
  telefone: z
    .string()
    .regex(
      /^\(\d{2}\)\s?\d{4,5}-\d{4}$/,
      'Telefone inválido (Ex: (00) 00000-0000).',
    ),
  nomePet: z.string().min(1, 'Nome do Pet é obrigatório.'),

  servico: z.enum(['banho_tosa', 'banho', 'tosa', 'tosa_higienica', 'outro'], {
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

type AgendamentoPetshopFormData = z.infer<typeof agendamentoPetshopSchema>;

export function AgendamentoPetshop() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgendamentoPetshopFormData>({
    resolver: zodResolver(agendamentoPetshopSchema),
    defaultValues: {
      nomeCliente: '',
      telefone: '',
      nomePet: '',
      servico: 'banho', // Valor inicial
      data: '',
      hora: '',
      observacoes: null,
    },
  });

  function onSubmit(data: AgendamentoPetshopFormData) {
    console.log('Agendamento Petshop Enviado:', data);
    alert(`Agendamento de Petshop para ${data.nomePet} realizado com sucesso!`);
  }

  return (
    //  Fundo da Página Adaptado
    <div className='p-8 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-150px)] flex justify-center items-start transition-colors duration-500'>
      <div className='container max-w-2xl w-full'>
        {/*  Título e Borda Adaptados */}
        <h1 className='text-3xl font-extrabold text-center text-pink-600 dark:text-pink-400 mb-6 border-b-2 border-yellow-400 dark:border-yellow-600 pb-2 flex items-center justify-center gap-2'>
          <BathIcon size={30} />
          Novo Agendamento Petshop
        </h1>
        {/*  Parágrafo Adaptado */}
        <p className='text-center text-gray-500 dark:text-gray-400 mb-8'>
          Preencha os dados para agendar serviços de banho, tosa e estética.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          //  Fundo e Borda do Formulário Adaptados
          className='space-y-6 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700'
        >
          {/* FIELDSET PRINCIPAL */}
          {/*  Borda e Texto do Fieldset Adaptados */}
          <fieldset className='border-2 border-pink-500 dark:border-pink-600 p-4 rounded-md'>
            <legend className='font-bold text-lg text-pink-700 dark:text-pink-400 px-2'>
              Dados do Cliente
            </legend>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='form-group'>
                <label
                  htmlFor='nomeCliente'
                  // Texto da Label Adaptado
                  className=' font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1'
                >
                  <User
                    size={16}
                    className='text-pink-500 dark:text-pink-400'
                  />{' '}
                  Nome:
                </label>
                <input
                  type='text'
                  id='nomeCliente'
                  {...register('nomeCliente')}
                  // Input e Foco Adaptados
                  className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:border-pink-500 dark:focus:border-pink-400 dark:bg-gray-700 dark:text-gray-50'
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
                  // Texto da Label Adaptado
                  className=' font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1'
                >
                  <Phone
                    size={16}
                    className='text-pink-500 dark:text-pink-400'
                  />{' '}
                  Telefone:
                </label>
                <input
                  type='tel'
                  id='telefone'
                  {...register('telefone')}
                  placeholder='(00) 00000-0000'
                  // Input e Foco Adaptados
                  className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:border-pink-500 dark:focus:border-pink-400 dark:bg-gray-700 dark:text-gray-50'
                />
                {errors.telefone && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.telefone.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* DADOS DO PET E SERVIÇO */}
          {/* FIELDSET PRINCIPAL */}
          {/*  Borda e Texto do Fieldset Adaptados */}
          <fieldset className='border-2 border-pink-500 dark:border-pink-600 p-4 rounded-md'>
            <legend className='font-bold text-lg text-pink-700 dark:text-pink-400 px-2'>
              Dados do Pet e Serviço
            </legend>

            <div className='form-group'>
              <label
                htmlFor='nomePet'
                //  Texto da Label Adaptado
                className=' font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1'
              >
                <PawPrint
                  size={16}
                  className='text-pink-500 dark:text-pink-400'
                />{' '}
                Nome do Pet:
              </label>
              <input
                type='text'
                id='nomePet'
                {...register('nomePet')}
                //  Input e Foco Adaptados
                className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:border-pink-500 dark:focus:border-pink-400 dark:bg-gray-700 dark:text-gray-50'
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
                //  Texto da Label Adaptado
                className='block font-semibold text-gray-700 dark:text-gray-300'
              >
                Tipo de Serviço:
              </label>
              <select
                id='servico'
                {...register('servico')}
                // Select e Foco Adaptados (incluindo o fundo)
                className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:border-pink-500 dark:focus:border-pink-400 bg-white dark:bg-gray-700 dark:text-gray-50'
              >
                <option value='banho'>Apenas Banho</option>
                <option value='tosa'>Apenas Tosa</option>
                <option value='banho_tosa'>Banho e Tosa Completa</option>
                <option value='tosa_higienica'>Tosa Higiênica</option>
                <option value='outro'>Outro</option>
              </select>
              {errors.servico && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.servico.message}
                </p>
              )}
            </div>
          </fieldset>

          {/* DATA E HORA */}
          {/* FIELDSET PRINCIPAL */}
          {/*  Borda e Texto do Fieldset Adaptados */}
          <fieldset className='border-2 border-pink-500 dark:border-pink-600 p-4 rounded-md'>
            <legend className='font-bold text-lg text-pink-700 dark:text-pink-400 px-2'>
              Data e Hora
            </legend>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='form-group'>
                <label
                  htmlFor='data'
                  // Texto da Label Adaptado
                  className=' font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1'
                >
                  <CalendarDays
                    size={16}
                    className='text-pink-500 dark:text-pink-400'
                  />{' '}
                  Data:
                </label>
                <input
                  type='date'
                  id='data'
                  {...register('data')}
                  // Input e Foco Adaptados
                  className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:border-pink-500 dark:focus:border-pink-400 dark:bg-gray-700 dark:text-gray-50'
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
                  // Texto da Label Adaptado
                  className=' font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1'
                >
                  <Clock
                    size={16}
                    className='text-pink-500 dark:text-pink-400'
                  />{' '}
                  Hora:
                </label>
                <input
                  type='time'
                  id='hora'
                  {...register('hora')}
                  // Input e Foco Adaptados
                  className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:border-pink-500 dark:focus:border-pink-400 dark:bg-gray-700 dark:text-gray-50'
                />
                {errors.hora && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.hora.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* OBSERVAÇÕES */}
          <div className='form-group'>
            <label
              htmlFor='observacoes'
              // Texto da Label Adaptado
              className=' font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1'
            >
              <MessageSquare
                size={16}
                className='text-pink-500 dark:text-pink-400'
              />{' '}
              Observações (Opcional):
            </label>
            <textarea
              id='observacoes'
              rows={3}
              {...register('observacoes')}
              placeholder='Ex: Gato persa, porte grande, tosa na máquina baixa.'
              // Input e Foco Adaptados
              className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:border-pink-500 dark:focus:border-pink-400 dark:bg-gray-700 dark:text-gray-50'
            ></textarea>
            {errors.observacoes && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.observacoes.message}
              </p>
            )}
          </div>

          <button
            type='submit'
            //  Botão e Hover Adaptados
            className='w-full p-3 bg-pink-500 dark:bg-pink-600 text-white font-bold rounded-md hover:bg-pink-600 dark:hover:bg-pink-700 transition'
          >
            Agendar Serviço de Petshop
          </button>
        </form>
      </div>
    </div>
  );
}
