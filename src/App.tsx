import { Footer } from './components/Footer';
import { Heading } from './components/Heading';
import { Layout } from './components/Layout';
import './styles/global.css';
export function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Heading />
      <main className='flex-1'>
        <Layout />
      </main>
      <Footer />
    </div>
  );
}
