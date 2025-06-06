import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Livros from './pages/Livros'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cadastro from './pages/Cadastro';
import Editar from './pages/Editar';
import Excluir from './pages/Excluir';

function App() { 

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/livros' element={<Livros/>}/>
      <Route path='/cadastro' element={<Cadastro/>}/>
      <Route path='/editar/:id' element={<Editar/>}/>
      <Route path='/excluir/:id' element={<Excluir/>}/>
      <Route path='*' element={<h1> Problema nas rotas </h1>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
