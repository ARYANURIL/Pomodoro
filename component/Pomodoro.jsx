'use client'

import { useState, useEffect } from "react"

export default function Pomodoro() {
  const[waktuSisa, setWaktuSisa] = useState(1500)
  const[isRunning, setIsRunning] = useState(false)
  const[mode, setMode] = useState('fokus')

  useEffect(() => {
    let interval = null

    if (isRunning && waktuSisa > 0) {
      interval = setInterval(() => {
        setWaktuSisa((prev) => prev - 1)
      }, 1000)

    } else if (waktuSisa === 0) {
      alert(mode === "fokus" ? "waktu fokus selesai waktunya istirahat" : "istirahat selesai kembali fokus")
      setIsRunning(false)
    } 
    
    return () => clearInterval(interval);
  }, [isRunning, waktuSisa, mode]);

  const formatWaktu = (detik) => {
    const menit = Math.floor(detik / 60);
    const sisaDetik = detik % 60; 
    return `${menit.toString().padStart(2, '0')}:${sisaDetik.toString().padStart(2, '0')}`
  }

  const setModeFokus = () => {
    setIsRunning(false)
    setMode('fokus')
    setWaktuSisa(25 * 60);
  }

  const setModeIstirahat = () => {
    setIsRunning(false)
    setMode('istirahat')
    setWaktuSisa(5 * 60)
  }

  const handleReset = () => {
    setIsRunning(false)
    setWaktuSisa(mode === 'fokus' ? 25 * 60 : 5 * 60)
  }

  return(
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">

      <div className="flex gap-4 mb-8 bg-slate-900 p-2 rounded-2xl border border-slate-800">

        <button
          onClick={setModeFokus}
          className={`px-6 py-2 rounded-xl font-semibold transition ${
            mode === 'fokus' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Fokus (25m)
        </button>

          <button
            onClick={setModeIstirahat}
            className={`px-6 py-2 rounded-xl font-semibold transition ${
              mode === 'istirahat' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Istirahat (5m)
          </button>
      </div>

      <div className="text-8xl font-black tracking-wider my-6 font-mono">
            {formatWaktu(waktuSisa)}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-8 py-4 rounded-2xl font-bold text-lg shadow-lg transition transform active:scale-95 ${
            isRunning
              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
              : 'bg-indigo-500 hover:bg-indigo-600 text-white' 
          }`}
        >
          {isRunning ? 'PAUSE' : 'START'}
        </button>

        <button
          onClick={handleReset}
          className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-2xl transition"
        >
          Reset
        </button>
      </div>

    </div>
  )
}   