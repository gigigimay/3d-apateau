import React, { useState } from 'react'

const unimplemented = () => {
  throw new Error('function should be called from inside the context')
}

interface IDescContext {
  desc: string
  setDesc: React.Dispatch<React.SetStateAction<string>>
  blendMode: string
  setBlendMode: React.Dispatch<React.SetStateAction<string>>
}

const DescContext = React.createContext<IDescContext>({
  desc: '',
  setDesc: unimplemented,
  blendMode: '',
  setBlendMode: unimplemented,
})

export const DescContextProvider = ({
  children,
}: {
  children?: React.ReactNode
}) => {
  const [desc, setDesc] = useState('')
  const [blendMode, setBlendMode] = useState('mix-blend-hard-light')

  return (
    <DescContext.Provider value={{ desc, setDesc, blendMode, setBlendMode }}>
      {children}
    </DescContext.Provider>
  )
}

export const useDesc = () => {
  return React.useContext(DescContext)
}
