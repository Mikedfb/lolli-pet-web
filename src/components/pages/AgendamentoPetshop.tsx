import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Importamos o schema com as validações corrigidas
import {
  agendamentoPetshopSchema,
  type AgendamentoPetshopFormData,
} from '../schemas/AgendamentoPetshopSchema';
import { BathIcon, User, Clock, CalendarDays } from 'lucide-react';

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
      servico: '',
      data: '',
      hora: '',
      observacoes: '',
    },
  });

  function handleFormSubmit(data: AgendamentoPetshopFormData) {
    console.log('Agendamento Petshop validado e pronto', data);
    // Lógica de envio para API
  }

  return (
    <div className='p-8 flex justify-center items-start min-h-[calc(100vh-150px)]'>
      <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl'>
        <h1 className='text-3xl font-bold text-center text-pink-600 mb-6 border-b-2 border-yellow-400 pb-2'>
          Agendamento Petshop
        </h1>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className='flex flex-col gap-5'
        >
          <fieldset className='border border-pink-600 p-5 rounded-md'>
            <legend className='font-bold text-lg text-pink-600 px-2 flex items-center gap-2'>
              <User size={20} />
              Dados do Cliente e Pet
            </legend>
            <div className='flex flex-col gap-3'>
              <label
                htmlFor='nomeCliente'
                className='font-medium text-gray-700'
              >
                Nome do Cliente:
              </label>
              <input
                type='text'
                id='nomeCliente'
                {...register('nomeCliente')}
                className='p-2 border rounded'
              />
              {errors.nomeCliente && (
                <p className='text-red-500 text-sm'>
                  {errors.nomeCliente.message}
                </p>
              )}

              <label htmlFor='telefone' className='font-medium text-gray-700'>
                Telefone:
              </label>
              <input
                type='tel'
                id='telefone'
                {...register('telefone')}
                className='p-2 border rounded'
              />
              {errors.telefone && (
                <p className='text-red-500 text-sm'>
                  {errors.telefone.message}
                </p>
              )}

              <label htmlFor='nomePet' className='font-medium text-gray-700'>
                Nome do Pet:
              </label>
              <input
                type='text'
                id='nomePet'
                {...register('nomePet')}
                className='p-2 border rounded'
              />
              {errors.nomePet && (
                <p className='text-red-500 text-sm'>{errors.nomePet.message}</p>
              )}
            </div>
          </fieldset>

          <fieldset className='border border-pink-600 p-5 rounded-md'>
            <legend className='font-bold text-lg text-pink-600 px-2 flex items-center gap-2'>
              <BathIcon size={20} />
              Detalhes do Agendamento
            </legend>
            <div className='flex flex-col gap-3'>
              <label htmlFor='servico' className='font-medium text-gray-700'>
                Tipo de Serviço:
              </label>
              <select
                id='servico'
                {...register('servico')}
                className='p-2 border rounded'
              >
                <option value=''>-- Selecione o serviço --</option>
                <option value='banho_tosa'>Banho e Tosa Completa</option>
                <option value='banho'>Apenas Banho</option>
                <option value='tosa'>Apenas Tosa</option>
                <option value='tosa_higienica'>Tosa Higiênica</option>
                <option value='outro'>Outro (especifique)</option>
              </select>
              {errors.servico && (
                <p className='text-red-500 text-sm'>{errors.servico.message}</p>
              )}

              <div className='flex gap-4'>
                <div className='flex-1'>
                  <label
                    htmlFor='data'
                    className='font-medium text-gray-700 flex items-center gap-1'
                  >
                    <CalendarDays size={16} /> Data:
                  </label>
                  <input
                    type='date'
                    id='data'
                    {...register('data')}
                    className='p-2 border rounded w-full'
                  />
                  {errors.data && (
                    <p className='text-red-500 text-sm'>
                      {errors.data.message}
                    </p>
                  )}
                </div>
                <div className='flex-1'>
                  <label
                    htmlFor='hora'
                    className='font-medium text-gray-700 flex items-center gap-1'
                  >
                    <Clock size={16} /> Hora:
                  </label>
                  <input
                    type='time'
                    id='hora'
                    {...register('hora')}
                    className='p-2 border rounded w-full'
                  />
                  {errors.hora && (
                    <p className='text-red-500 text-sm'>
                      {errors.hora.message}
                    </p>
                  )}
                </div>
              </div>

              <label
                htmlFor='observacoes'
                className='font-medium text-gray-700'
              >
                Observações:
              </label>
              <textarea
                id='observacoes'
                {...register('observacoes')}
                rows={4}
                className='p-2 border rounded'
              />
              {errors.observacoes && (
                <p className='text-red-500 text-sm'>
                  {errors.observacoes.message}
                </p>
              )}
            </div>
          </fieldset>

          <button
            type='submit'
            className='mt-4 p-3 bg-pink-600 text-white font-semibold rounded hover:bg-pink-700 transition'
          >
            Agendar Petshop
          </button>
        </form>
      </div>
    </div>
  );
}
