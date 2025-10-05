import { Route, Routes } from 'react-router-dom';
import './styles/global.css';

import { Footer } from './components/Footer';
import { Heading } from './components/Heading';
import { Home } from './components/Home';

import { CadastrarCliente } from './components/pages/CadastrarCliente';
import { AgendamentoClinico } from './components/pages/AgendamentoClinico';
import { AgendamentoPetshop } from './components/pages/AgendamentoPetshop';
import { Agenda } from './components/pages/Agenda';
import { Prontuario } from './components/pages/Prontuario';
import { NotFound } from './components/pages/NotFound';

export function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Heading />
      <main className='flex-1'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cadastrar-cliente' element={<CadastrarCliente />} />
          <Route path='/agendamento-clinico' element={<AgendamentoClinico />} />
          <Route path='/agendamento-petshop' element={<AgendamentoPetshop />} />
          <Route path='/agenda' element={<Agenda />} />
          <Route path='/prontuario' element={<Prontuario />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
