import {
  UserPlus,
  User,
  Phone,
  Mail,
  PawPrint,
  Dog,
  PlusCircle,
  Trash2,
} from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// --- ESQUEMA ZOD DOS PETS ---
const petSchema = z.object({
  nome: z.string().min(1, 'O nome do Pet é obrigatório.'),
  especie: z.string().min(1, 'A espécie (Cão, Gato, etc.) é obrigatória.'),
  raca: z.string().max(50, 'Máximo de 50 caracteres').nullable().optional(),
});

// --- ESQUEMA ZOD DO CLIENTE ---
const cadastrarClienteSchema = z.object({
  nome: z.string().min(1, 'O nome completo do cliente é obrigatório.'),
  email: z.string().email('E-mail inválido.').min(1, 'O e-mail é obrigatório.'),
  telefone: z
    .string()
    .regex(
      /^\(\d{2}\)\s?\d{4,5}-\d{4}$/,
      'Telefone inválido (Ex: (00) 00000-0000).',
    ),

  // Array de Pets - Deve ter pelo menos 1 item
  pets: z
    .array(petSchema)
    .min(
      1,
      'Pelo menos um Pet deve ser cadastrado. Use o botão "Adicionar Pet".',
    ),
});

type PetFormData = z.infer<typeof petSchema>;
type CadastrarClienteFormData = z.infer<typeof cadastrarClienteSchema>;

export function CadastrarCliente() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CadastrarClienteFormData>({
    resolver: zodResolver(cadastrarClienteSchema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      // Inicializa com um Pet obrigatório
      pets: [{ nome: '', especie: '', raca: '' }],
    },
  });

  // Hook para gerenciar campos dinâmicos (Pets)
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'pets',
  });

  function onSubmit(data: CadastrarClienteFormData) {
    console.log('Cliente e Pets Cadastrados:', data);
    alert(
      `Cliente ${data.nome} cadastrado com sucesso, com ${data.pets.length} pet(s)!`,
    );
    // Lógica de API aqui
  }

  return (
    <div className='p-8 bg-gray-50 min-h-[calc(100vh-150px)] flex justify-center items-start'>
      <div className='container max-w-3xl w-full'>
        <h1 className='text-3xl font-extrabold text-center text-pink-600 mb-6 border-b-2 border-yellow-400 pb-2 flex items-center justify-center gap-2'>
          <UserPlus size={30} />
          Cadastro de Cliente e Pets
        </h1>
        <p className='text-center text-gray-500 mb-8'>
          Cadastre as informações do cliente e de todos os seus animais de
          estimação.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6 p-8 bg-white rounded-xl shadow-lg border border-gray-100'
        >
          <fieldset className='border-2 border-cyan-500 p-4 rounded-md'>
            <legend className='font-bold text-lg text-cyan-700 px-2'>
              Dados do Cliente
            </legend>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='form-group md:col-span-3'>
                <label
                  htmlFor='nome'
                  className=' font-semibold text-gray-700 flex items-center gap-1'
                >
                  <User size={16} className='text-cyan-500' /> Nome Completo:
                </label>
                <input
                  type='text'
                  id='nome'
                  {...register('nome')}
                  className='w-full p-2 border border-gray-300 rounded focus:border-cyan-500'
                />
                {errors.nome && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.nome.message}
                  </p>
                )}
              </div>

              <div className='form-group'>
                <label
                  htmlFor='email'
                  className=' font-semibold text-gray-700 flex items-center gap-1'
                >
                  <Mail size={16} className='text-cyan-500' /> E-mail:
                </label>
                <input
                  type='email'
                  id='email'
                  {...register('email')}
                  className='w-full p-2 border border-gray-300 rounded focus:border-cyan-500'
                />
                {errors.email && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.email.message}
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

          <fieldset className='border-2 border-cyan-500 p-4 rounded-md space-y-4'>
            <legend className='font-bold text-lg text-cyan-700 px-2 flex items-center gap-2'>
              <Dog size={20} className='text-cyan-500' /> Dados dos Pets
            </legend>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className='pet-block border border-gray-300 p-4 rounded-lg bg-gray-50 space-y-3'
              >
                <div className='flex justify-between items-center border-b border-pink-300 pb-2 mb-3'>
                  <h4 className='text-xl font-bold text-pink-600 flex items-center gap-2'>
                    <PawPrint size={18} /> Pet {index + 1}
                  </h4>

                  {/* O botão remover só aparece se houver mais de um pet */}
                  {index > 0 && (
                    <button
                      type='button'
                      onClick={() => remove(index)}
                      className='p-2 bg-red-400 text-white rounded-full hover:bg-red-500 transition flex items-center gap-1 text-sm'
                    >
                      <Trash2 size={16} /> Remover
                    </button>
                  )}
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div className='form-group'>
                    <label
                      htmlFor={`pets.${index}.nome`}
                      className='block font-semibold text-gray-700'
                    >
                      Nome do Pet:
                    </label>
                    <input
                      type='text'
                      id={`pets.${index}.nome`}
                      {...register(`pets.${index}.nome`)}
                      className='w-full p-2 border border-gray-300 rounded focus:border-pink-500'
                    />
                    {errors.pets?.[index]?.nome && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.pets[index].nome.message}
                      </p>
                    )}
                  </div>

                  <div className='form-group'>
                    <label
                      htmlFor={`pets.${index}.especie`}
                      className='block font-semibold text-gray-700'
                    >
                      Espécie:
                    </label>
                    <input
                      type='text'
                      id={`pets.${index}.especie`}
                      {...register(`pets.${index}.especie`)}
                      placeholder='Ex: Cachorro, Gato'
                      className='w-full p-2 border border-gray-300 rounded focus:border-pink-500'
                    />
                    {errors.pets?.[index]?.especie && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.pets[index].especie.message}
                      </p>
                    )}
                  </div>

                  <div className='form-group'>
                    <label
                      htmlFor={`pets.${index}.raca`}
                      className='block font-semibold text-gray-700'
                    >
                      Raça (Opcional):
                    </label>
                    <input
                      type='text'
                      id={`pets.${index}.raca`}
                      {...register(`pets.${index}.raca`)}
                      className='w-full p-2 border border-gray-300 rounded focus:border-pink-500'
                    />
                    {errors.pets?.[index]?.raca && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.pets[index].raca.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Exibe erro se não houver pets */}
            {errors.pets?.root && (
              <p className='text-red-500 text-sm mt-1 font-semibold'>
                {errors.pets.root.message}
              </p>
            )}

            <button
              type='button'
              onClick={() =>
                append({ nome: '', especie: '', raca: '' } as PetFormData)
              }
              className='mt-4 p-2 bg-cyan-500 text-white font-bold rounded-md hover:bg-cyan-600 transition flex items-center justify-center gap-2'
            >
              <PlusCircle size={20} /> Adicionar outro Pet
            </button>
          </fieldset>

          <button
            type='submit'
            className='w-full p-3 bg-pink-500 text-white font-bold rounded-md hover:bg-pink-600 transition text-lg'
          >
            Cadastrar Cliente e Pets
          </button>
        </form>
      </div>
    </div>
  );
}
