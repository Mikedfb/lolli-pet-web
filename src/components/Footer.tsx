import { HeartPulseIcon, LaughIcon, UserRoundCheckIcon } from 'lucide-react';

export function Footer() {
  return (
    <section className=' value-container'>
      <h2 className='value-h2'>Por que escolher a Lolli Pet?</h2>
      <div className='value-content'>
        <article className='value-list-content'>
          <span className='value-icon'>
            <HeartPulseIcon className='text-pink-400 ' />
          </span>
          <p className=''>Cuidado e Paixão</p>
        </article>
        <article className='value-list-content'>
          <span className='value-icon'>
            <UserRoundCheckIcon className='text-pink-400 ' />
          </span>
          <p className=''>Profissionais Qualificados</p>
        </article>
        <article className='value-list-content'>
          <span className='value-icon'>
            <LaughIcon className='text-pink-400 ' />
          </span>
          <p className=''>Ambiente Confortável</p>
        </article>
      </div>
    </section>
  );
}
