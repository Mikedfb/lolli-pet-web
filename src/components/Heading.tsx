import '../styles/global.css';
import Logo from '../assets/Logo.svg';

export function Heading() {
  return (
    <header className='flex justify-around text-[0.5rem] items-center h-30 bg-pink-400'>
      <div>
        {/* Necessita aprimirar logo */}
        <img
          src={Logo}
          alt='Logo Lolli Pet'
          className='h-20 transition duration-300 ease-in-out hover:scale-110'
        />
      </div>
      <nav className='flex gap-6 '>
        <a
          href='/home.html'
          className='text-yellow-300 font-bold py-2.5 px-3.5 rounded-md  transition-colors duration-300  hover:bg-blue-200'
        >
          HOME
        </a>
        <a
          href='/cadastrar_cliente.html'
          className='text-yellow-300 font-bold py-2.5 px-3.5 rounded-md  transition-colors duration-300  hover:bg-blue-200'
        >
          CADASTRAR CLIENTE
        </a>
        <a
          href='/agendamento_clinico.html'
          className='text-yellow-300 font-bold py-2.5 px-3.5 rounded-md  transition-colors duration-300  hover:bg-blue-200'
        >
          AGENDAMENTO CLINICO
        </a>
        <a
          href='/agendamento_petshop.html'
          className='text-yellow-300 font-bold py-2.5 px-3.5 rounded-md  transition-colors duration-300  hover:bg-blue-200'
        >
          AGENDAMENTO PETSHOP
        </a>
        <a
          href='/agenda.html'
          className='text-yellow-300 font-bold py-2.5 px-3.5 rounded-md  transition-colors duration-300  hover:bg-blue-200'
        >
          AGENDA DO DIA
        </a>
        <a
          href='/prontuario.html'
          className='text-yellow-300 font-bold py-2.5 px-3.5 rounded-md  transition-colors duration-300  hover:bg-blue-200'
        >
          PRONTUÁRIO
        </a>
      </nav>
    </header>
  );
}
