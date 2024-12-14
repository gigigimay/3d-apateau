import { useEffect } from 'react'

import classNames from 'classnames'
import { useDesc } from 'DescContext'
import { blendModes } from 'utils'

const Apateu = ({ className }: { className: string }) => {
  const { setDesc, setBlendMode, blendMode } = useDesc()
  return (
    <button
      id={`btn-${className}`}
      className={classNames(
        className,
        'block text-right group cursor-pointer',
        'rounded-md px-2',
        'hover:scale-110',
        'focus:outline-dotted focus:outline-current focus:outline-4',
        blendMode === className && '!mix-blend-normal text-black'
      )}
      onMouseEnter={() => setDesc(className)}
      onMouseLeave={() => setDesc('')}
      onClick={() => setBlendMode(className)}
    >
      {blendMode === className && '> '}apateu
    </button>
  )
}

const Credits = () => {
  return (
    <div className="text-xs opacity-50">
      3D Model:{' '}
      <a
        href="https://skfb.ly/owZHE"
        target="__blank"
        rel="noopener noreferrer"
      >
        "Heart"
      </a>{' '}
      by Centure Morrals is licensed under{' '}
      <a
        href="http://creativecommons.org/licenses/by/4.0/"
        target="__blank"
        rel="noopener noreferrer"
      >
        Creative Commons Attribution
      </a>
      .
    </div>
  )
}

export const AppOverlay = () => {
  const { desc, blendMode, setBlendMode } = useDesc()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
      const currIndex = blendModes.findIndex((b) => b === blendMode)
      const modifier = e.key === 'ArrowDown' ? 1 : -1
      const newIndex = Math.min(
        blendModes.length - 1,
        Math.max(0, currIndex + modifier)
      )
      const newBlendMode = blendModes[newIndex]
      setBlendMode(newBlendMode)
      document.getElementById(`btn-${newBlendMode}`)?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [blendMode, setBlendMode])

  return (
    <>
      <div
        className={classNames(
          'absolute top-0 left-0 p-8 z-10 text-pink-700',
          'flex flex-col items-start pointer-events-none',
          blendMode
        )}
      >
        <div className="text-8xl uppercase font-bold">Kissy face</div>
        <div className="text-6xl whitespace-pre font-serif">
          {'- K i s s y   f a c e -'}
        </div>
        <div className="text-5xl font-extralight">Sent to your phone</div>
        <div className="text-6xl font-bold italic">BUT...</div>
        <div className="text-5xl mt-10 font-extralight">I'm tryna</div>
        <div className="text-7xl text-white px-4 py-0 bg-pink-700">
          kiss your lips
        </div>
        <div className="text-8xl font-bold">for real</div>
        <div className="text-2xl font-serif">uh-huh, uh-huh</div>
      </div>

      <div
        className={classNames(
          'absolute bottom-0 right-0 overflow-y-auto p-8',
          'text-right text-pink-700 text-3xl font-black',
          'flex flex-col items-end'
        )}
      >
        {blendModes.map((blendMode) => (
          <Apateu className={blendMode} key={blendMode} />
        ))}
      </div>

      <div
        className={classNames(
          'z-10 absolute left-0 bottom-0 p-8',
          'text-2xl text-pink-700 font-extralight',
          'mix-blend-difference'
        )}
      >
        {desc || blendMode}
        <Credits />
      </div>
    </>
  )
}
