import '../styles/global.css';
import Logo from '../assets/Logo.svg';

export function Heading() {
  return (
    <header className='navContent'>
      <div>
        {/* Necessita aprimirar logo */}
        <img src={Logo} alt='Logo Lolli Pet' className='logo' />
      </div>
      <nav className='nav'>
        <a href='/home.html' className='nav-a'>
          HOME
        </a>
        <a href='/cadastrar_cliente.html' className='nav-a'>
          CADASTRAR CLIENTE
        </a>
        <a href='/agendamento_clinico.html' className='nav-a'>
          AGENDAMENTO CLINICO
        </a>
        <a href='/agendamento_petshop.html' className='nav-a'>
          AGENDAMENTO PETSHOP
        </a>
        <a href='/agenda.html' className='nav-a'>
          AGENDA DO DIA
        </a>
        <a href='/prontuario.html' className='nav-a'>
          PRONTUÁRIO
        </a>
      </nav>
    </header>
  );
}
