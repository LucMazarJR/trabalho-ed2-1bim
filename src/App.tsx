import { useState } from 'react'
import Campo from './components/FormularioCadastro'
import mergeSort from './lib/merge-sort'

interface Aluno {
  nome: string
  ra: string
  idade: string
  sexo: string
  media: string
  resultado: string
}

function App() {
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [exibicao, setExibicao] = useState<Aluno[]>([])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const novoAluno = Object.fromEntries(formData.entries()) as unknown as Aluno
    
    if (!novoAluno.nome || !novoAluno.ra) {
      alert('Nome e RA são obrigatórios!')
      return
    }
    
    const novosAlunos = [...alunos, novoAluno]
    setAlunos(novosAlunos)
    setExibicao(novosAlunos)
    e.currentTarget.reset()
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-8 justify-between">
      <header className="w-screen bg-slate-400 h-full flex flex-col items-center p-6">
        <h2 className="font-semibold text-xl ">Sistema de cadastro de alunos</h2>
      </header>
      <div className="m-8 p-8 h-full w-full bg-slate-100 rounded-md space-y-6">
        <div className="p-4 px-8 bg-slate-300 space-y-4">
          <p className="font-semibold text-lg">Formulário de Cadastro de Aluno</p>
          <form className='space-y-6 py-2' onSubmit={handleSubmit}>
            <div className='flex gap-24'>
              <Campo label="Nome" type="text" id="nome" placeholder="Digite aqui o nome do aluno" required />
              <Campo label="RA" type="number" id="ra" placeholder="Digite aqui o ra do aluno" required />
            </div>
            <div className='flex gap-24'>
              <Campo label='Idade' type='number' id='idade' placeholder='Digite aqui a idade do aluno'/>
              <Campo label='Sexo' type='text' id='sexo' placeholder='Digite aqui o sexo do aluno'/>
              <Campo label='Média' type='number' id='media' placeholder='Digite aqui a média do aluno'/>
            </div>
            <Campo label='Resultado' type='select' id='resultado' placeholder='Selecione' opcoes={['Aprovado', 'Reprovado']}/>
            <button type='submit' className='bg-slate-900 text-white p-2 rounded-lg hover:bg-slate-950'>
              Adicionar Aluno
            </button>
          </form>
        </div>
        <div className='space-y-4'>
          <h2 className="font-semibold text-xl ">Alunos Cadastrados</h2>
          <div className='flex gap-6 w-full'>
            <button className='w-full bg-slate-600 text-white p-2 rounded-lg hover:bg-slate-700' onClick={() => setExibicao(alunos)}>
              Ordem padrão
            </button>
            <button className='w-full bg-slate-600 text-white p-2 rounded-lg hover:bg-slate-700' onClick={() => setExibicao(mergeSort(alunos, (obj1, obj2) => obj1.nome < obj2.nome))}>
              Ordenar por nome
            </button>
            <button className='w-full bg-slate-600 text-white p-2 rounded-lg hover:bg-slate-700' onClick={() => setExibicao(mergeSort(alunos, (obj1, obj2) => Number(obj1.ra) > Number(obj2.ra)))}>
              Ordenar por RA
            </button>
            <button className='w-full bg-slate-600 text-white p-2 rounded-lg hover:bg-slate-700' onClick={() => setExibicao(mergeSort(alunos.filter(aluno => aluno.resultado === "Aprovado"), (obj1, obj2) => obj1.nome < obj2.nome))}>
              Ordenar por nome + Aprovados
            </button>
          </div>
          {
            exibicao.map((aluno, index) => (
              <div key={index} className="p-2 bg-white text-slate-900 rounded border border-slate-300">
                <p><strong>Nome:</strong> {aluno.nome}</p>
                <p><strong>RA:</strong> {aluno.ra}</p>
                <p><strong>Idade:</strong> {aluno.idade}</p>
                <p><strong>Sexo:</strong> {aluno.sexo}</p>
                <p><strong>Média:</strong> {aluno.media}</p>
                <p><strong>Resultado:</strong> {aluno.resultado}</p>
              </div>
            ))
          }
        </div>
      </div>
      <footer className="w-screen bg-slate-800 text-white flex flex-col items-center p-8">
        <p className="font-bold text-2xl ">Trabalho Estrutura de Dados 2 - 1° Bimestre</p>
        <p>Luciano Neves Mazarão Junior - 25361</p>
        <p>Engenharia de Software</p>
      </footer>
    </div>
  )
}

export default App
