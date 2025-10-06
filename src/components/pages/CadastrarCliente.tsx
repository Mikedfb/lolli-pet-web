import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Cat, PlusCircle, Trash2 } from 'lucide-react';
import {
  cadastroClienteSchemas,
  type CadastroClienteFormData,
} from '../schemas/CadastroClienteSchemas';

export function CadastrarCliente() {
  const {
    register,
    handleSubmit,
    control, // Necessário para o useFieldArray
    formState: { errors },
  } = useForm<CadastroClienteFormData>({
    resolver: zodResolver(cadastroClienteSchemas),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      pets: [
        // Adiciona um pet inicial por padrão para que o usuário veja os campos
        { nomePet: '', especie: '', raca: '' },
      ],
    },
  });

  // USEFIELDARRAY: Conecta o array 'pets' ao controle do formulário
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'pets', // Deve ser o nome do array no schema (pets: z.array(...))
  });

  function handleFormSubmit(data: CadastroClienteFormData) {
    console.log('Dados do cadastro validados e prontos', data);
    // console.log(data.pets); // Array de pets
  }

  return (
    <div className='p-8 flex justify-center items-start min-h-[calc(100vh-150px)]'>
      <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl'>
        <h1 className='text-3xl font-bold text-center text-pink-600 mb-6 border-b-2 border-yellow-400 pb-2'>
          Cadastro de Clientes e Pets
        </h1>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className='flex flex-col gap-5'
        >
          <fieldset className='border border-cyan-600 p-5 rounded-md'>
            <legend className='font-bold text-lg text-cyan-600 px-2 flex items-center gap-2'>
              <User size={20} />
              Dados do Cliente
            </legend>
            <div className='flex flex-col gap-3'>
              <label htmlFor='nome' className='font-medium text-gray-700'>
                Nome Completo:
              </label>
              <input
                type='text'
                id='nome'
                {...register('nome')}
                className='p-2 border rounded'
              />
              {errors.nome && (
                <p className='text-red-500 text-sm'>{errors.nome.message}</p>
              )}

              <label htmlFor='email' className='font-medium text-gray-700'>
                E-mail:
              </label>
              <input
                type='text'
                id='email'
                {...register('email')}
                className='p-2 border rounded'
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email.message}</p>
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
            </div>
          </fieldset>

          <fieldset className='border border-pink-600 p-5 rounded-md'>
            <legend className='font-bold text-lg text-pink-600 px-2 flex items-center gap-2'>
              <Cat size={20} />
              Dados dos Pets
            </legend>

            {/* Iteração sobre o array de pets */}
            {fields.map((field, index) => (
              // O div externo precisa de uma key única
              <div
                key={field.id}
                className='pet-block p-4 border border-pink-300 rounded-md bg-pink-50 mt-4'
              >
                <h4 className='font-bold text-md text-pink-700 mb-3'>
                  Pet {index + 1}
                </h4>

                <div className='flex flex-col gap-3'>
                  <label
                    htmlFor={`pets.${index}.nomePet`}
                    className='font-medium text-gray-700'
                  >
                    Nome do Pet:
                  </label>
                  <input
                    type='text'
                    id={`pets.${index}.nomePet`}
                    {...register(`pets.${index}.nomePet`)}
                    className='p-2 border rounded'
                  />
                  {errors.pets?.[index]?.nomePet && (
                    <p className='text-red-500 text-sm'>
                      {errors.pets[index]?.nomePet.message}
                    </p>
                  )}

                  <label
                    htmlFor={`pets.${index}.especie`}
                    className='font-medium text-gray-700'
                  >
                    Espécie:
                  </label>
                  <input
                    type='text'
                    id={`pets.${index}.especie`}
                    {...register(`pets.${index}.especie`)}
                    className='p-2 border rounded'
                  />
                  {errors.pets?.[index]?.especie && (
                    <p className='text-red-500 text-sm'>
                      {errors.pets[index]?.especie.message}
                    </p>
                  )}

                  {/* Raça */}
                  <label
                    htmlFor={`pets.${index}.raca`}
                    className='font-medium text-gray-700'
                  >
                    Raça:
                  </label>
                  <input
                    type='text'
                    id={`pets.${index}.raca`}
                    {...register(`pets.${index}.raca`)}
                    className='p-2 border rounded'
                  />
                </div>

                {fields.length > 1 && (
                  <button
                    type='button'
                    onClick={() => remove(index)}
                    className='mt-3 p-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition flex items-center justify-center gap-2 w-full'
                  >
                    <Trash2 size={18} /> Remover Pet
                  </button>
                )}
              </div>
            ))}

            {errors.pets && (
              <p className='text-red-500 text-sm font-bold mt-3'>
                ⚠️ {errors.pets.message}
              </p>
            )}

            <button
              type='button'
              onClick={() => append({ nomePet: '', especie: '', raca: '' })}
              className='mt-5 p-2 bg-gray-400 text-white font-semibold rounded hover:bg-gray-500 transition flex items-center justify-center gap-2'
            >
              <PlusCircle size={20} /> Adicionar outro Pet
            </button>
          </fieldset>

          <button
            type='submit'
            className='mt-4 p-3 bg-pink-600 text-white font-semibold rounded hover:bg-pink-700 transition'
          >
            Cadastrar Cliente
          </button>
        </form>
      </div>
    </div>
  );
}
