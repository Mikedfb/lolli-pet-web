import {
  Bath,
  CalendarDays,
  HeartPulse,
  Laugh,
  Stethoscope,
  UserRoundCheck,
} from 'lucide-react';
import '../styles/global.css';

export function Layout() {
  return (
    <main className='flex flex-col items-center text-[0.5rem] py-10 px-5 gap-12 min-h-[calc(100vh-150px)] mx-auto '>
      <section className='w-full max-w-3xl mx-auto text-center py-12 px-5 bg-pink-400  text-white rounded-2xl shadow-lg'>
        <div>
          <h1 className='text-2xl mb-3.5 font-bold'>
            Onde a saúde e a alegria do seu pet se encontram!
          </h1>
          <p className='text-base mb-8'>
            Oferecemos o melhor em cuidados veterinários e serviços de estética,
            tudo em um só lugar.
          </p>
          <div className='flex justify-around content-center items-center gap-5'>
            <a
              href='/agendamento_clinico.html'
              className='bg-yellow-300 text-black py-3.5 px-12 uppercase font-bold rounded-[12rem] transition duration-200   hover:-translate-y-[3px] hover:shadow-lg  '
            >
              Agendar Consulta
            </a>
            <a
              href='/agendamento_petshop.html'
              className='bg-yellow-300 text-black py-3.5 px-12 uppercase font-bold rounded-[12rem] transition duration-200   hover:-translate-y-[3px] hover:shadow-lg  '
            >
              Agendar Petshop
            </a>
          </div>
        </div>
      </section>

      <section className=' text-center w-full min-w-4xl'>
        <h2 className='text-pink-400 mb-7 text-base font-bold'>
          Nossos Serviços
        </h2>

        <div className='flex  flex-wrap justify-center gap-7'>
          <article className=' bg-white rounded-2xl p-7 w-72 shadow-[0_4px_10px_rgba(0,0,0,0.1)] text-center transition-transform duration-300 hover:translate-y-[-5px]'>
            <span className='flex items-center justify-center'>
              <Stethoscope className='text-cyan-500 mb-3.5' />
            </span>
            <h3 className='font-bold mb-2.5 text-sm'>
              Consultório Veterinário
            </h3>
            <p>
              Consultas de rotina, vacinas, exames e cirurgias. Cuidado
              profissional para a saúde do seu pet.
            </p>
          </article>
          <article className=' bg-white rounded-2xl p-7 w-72 shadow-[0_4px_10px_rgba(0,0,0,0.1)] text-center transition-transform duration-300 hover:translate-y-[-5px]'>
            <span className='flex items-center justify-center'>
              <Bath className='text-pink-400' />
            </span>
            <h3 className='font-bold mb-2.5 text-sm'>Petshop e Estética</h3>
            <p>
              Banho e tosa, hidratação, tosa higiênica e outros cuidados para a
              beleza e higiene do seu amigo.
            </p>
          </article>
          <article className=' bg-white rounded-2xl p-7 w-72 shadow-[0_4px_10px_rgba(0,0,0,0.1)] text-center transition-transform duration-300 hover:translate-y-[-5px]'>
            <span className='flex items-center justify-center'>
              <CalendarDays className='text-yellow-300' />
            </span>
            <h3 className='font-bold mb-2.5 text-sm'>Organização Completa</h3>
            <p>
              Gerencie todos os agendamentos e horários da clínica e do petshop
              de forma simples e eficiente.
            </p>
          </article>
        </div>
      </section>

      <section className=' text-center w-full min-w-3xl'>
        <h2 className='text-cyan-400 text-base font-bold mb-7'>
          Por que escolher a Lolli Pet?
        </h2>
        <div className='flex justify-around flex-wrap gap-5'>
          <article className='text-center p-5 rounded-[10px] bg-gray-200 min-w-36 shadow-[0px_2px_5px_rgba(0, 0, 0, 0.5)'>
            <span className='flex items-center justify-center'>
              <HeartPulse className='text-pink-400' />
            </span>
            <p className='font-black'>Cuidado e Paixão</p>
          </article>
          <article className='text-center p-5 rounded-[10px] bg-gray-200 min-w-36 shadow-[0px_2px_5px_rgba(0, 0, 0, 0.5)'>
            <span className='flex items-center justify-center'>
              <UserRoundCheck className='text-pink-400' />
            </span>
            <p className='font-black'>Profissionais Qualificados</p>
          </article>
          <article className='text-center p-5 rounded-[10px] bg-gray-200 min-w-36 shadow-[0px_2px_5px_rgba(0, 0, 0, 0.5)'>
            <span className='flex items-center justify-center'>
              <Laugh className='text-pink-400' />
            </span>
            <p className='font-black'>Ambiente Confortável</p>
          </article>
        </div>
      </section>
    </main>
  );
}
