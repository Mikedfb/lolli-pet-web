import { BathIcon, CalendarDaysIcon, StethoscopeIcon } from 'lucide-react';
import '../styles/global.css';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <main className='hero-section-container'>
      <section className='hero-secion-content'>
        <div>
          <h1 className='hero-h1'>
            Onde a saúde e a alegria do seu pet se encontram!
          </h1>
          <p className='hero-p '>
            Oferecemos o melhor em cuidados veterinários e serviços de estética,
            tudo em um só lugar.
          </p>
          <div className='hero-buttons-container'>
            <Link to='/agendamento-clinico' className=' hero-buttons-content '>
              Agendar Consulta
            </Link>
            <Link
              to='/agendamento-petshop'
              className='hero-buttons-content hero-buttons'
            >
              Agendar Petshop
            </Link>
          </div>
        </div>
      </section>

      <section className='services-container '>
        <h2 className='services-h2'>Nossos Serviços</h2>

        <div className='services-content'>
          <article className=' services-content-cards'>
            <span className='cards-icon'>
              <StethoscopeIcon className='text-cyan-500' size={40} />
            </span>
            <h3 className='cards-h3'>Consultório Veterinário</h3>
            <p>
              Consultas de rotina, vacinas, exames e cirurgias. Cuidado
              profissional para a saúde do seu pet.
            </p>
          </article>
          <article className='services-content-cards '>
            <span className='cards-icon'>
              <BathIcon className='text-pink-400 ' size={40} />
            </span>
            <h3 className='cards-h3'>Petshop e Estética</h3>
            <p>
              Banho e tosa, hidratação, tosa higiênica e outros cuidados para a
              beleza e higiene do seu amigo.
            </p>
          </article>
          <article className='services-content-cards '>
            <span className='cards-icon'>
              <CalendarDaysIcon className='text-yellow-300 ' size={40} />
            </span>
            <h3 className='cards-h3'>Organização Completa</h3>
            <p>
              Gerencie todos os agendamentos e horários da clínica e do petshop
              de forma simples e eficiente.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
