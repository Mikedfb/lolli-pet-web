import { Dog, Home, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-150px)] py-12 bg-gray-50'>
      <div className='p-10 bg-white rounded-xl shadow-2xl border-t-8 border-pink-500 max-w-lg w-full text-center transition-all duration-300 hover:shadow-pink-100'>
        <div className='flex justify-center items-center mb-6 text-pink-600'>
          <AlertTriangle size={50} className='mr-4 text-yellow-500' />
          <span className='text-8xl font-extrabold text-pink-600'>404</span>
        </div>

        <h1 className='text-3xl font-bold text-gray-800 mb-3'>
          Ops! Essa página fugiu!
        </h1>
        <p className='text-lg text-gray-600 mb-8'>
          O endereço que você tentou acessar não foi encontrado. Talvez um dos
          nossos pets tenha levado o caminho!
        </p>

        <Dog
          size={60}
          className='text-cyan-500 mx-auto mb-8 animate-bounce-slow'
        />

        <Link
          to='/'
          className='inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-full shadow-md text-white bg-pink-500 hover:bg-pink-600 transition duration-300 ease-in-out transform hover:scale-105'
        >
          <Home size={20} className='mr-2' />
          Voltar para a Home
        </Link>
      </div>
    </div>
  );
}
