import '../styles/global.css';
import Logo from '../assets/Logo.svg';
import { Link } from 'react-router-dom';

export function Heading() {
  return (
    <header className='navContent'>
      <div>
        {/* Necessita aprimirar logo */}
        <img src={Logo} alt='Logo Lolli Pet' className='logo' />
      </div>
      <nav className='nav'>
        <Link to='/' className='nav-a'>
          HOME
        </Link>

        <Link to='/cadastrar-cliente' className='nav-a'>
          CADASTRAR CLIENTE
        </Link>

        <Link to='/agendamento-clinico' className='nav-a'>
          AGENDAMENTO CLINÍCO
        </Link>

        <Link to='/agendamento-petshop' className='nav-a'>
          AGENDAMENTO PETSHOP
        </Link>

        <Link to='/agenda' className='nav-a'>
          AGENDA DO DIA
        </Link>

        <Link to='/prontuario' className='nav-a'>
          PRONTUÁRIO
        </Link>
      </nav>
    </header>
  );
}
