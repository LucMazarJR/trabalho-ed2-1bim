interface CampoProps {
  label: string
  type: string
  id: string
  placeholder: string
  opcoes?: string[]
  required?: boolean
  step?: string
}

function Campo({ label, type, id, placeholder, opcoes, required, step }: CampoProps) {
  if (type === 'select') {
    return (
      <div className="flex flex-col w-full">
        <label>{label}</label>
        <select name={id} id={id} className="border border-gray-400 rounded-lg p-1 px-2" required={required}>
          <option value="">{placeholder}</option>
          {opcoes?.map((opcao) => (
            <option key={opcao} value={opcao}>{opcao}</option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      <label>{label}</label>
      <input 
        name={id}
        type={type}
        id={id} 
        className="border border-gray-400 rounded-lg p-1 px-2" 
        placeholder={placeholder}
        required={required}
        step={step}
      />
    </div>
  )
}

export default Campo