import '../styles/global.css';

export function Layout() {
  return (
    <main className='flex flex-col items-center text-[0.5rem] py-10 px-5 gap-12 min-h-[calc(100vh-150px)] '>
      <section className='w-full max-w-3xl  text-center py-12 px-5 bg-pink-400  text-white rounded-2xl shadow-lg'>
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
    </main>
  );
}
