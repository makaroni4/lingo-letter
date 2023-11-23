import { useEffect, useState } from 'react';
import { useAppStore } from '../store';
import { XMarkIcon } from '@heroicons/react/24/solid'

export default function Settings() {
  const {
    openAIAPIKey, setOpenAIAPIKey, setSettingsVisible
  } = useAppStore();

  return (
    <div className="fixed h-full top-0 right-0 bg-white w-1/3 z-30 pt-16 px-4 border-l-4 border-indigo-500">
      <XMarkIcon
        className="w-8 cursor-pointer absolute top-4 right-4"
        onClick={ () => setSettingsVisible(false) } />

      <div className="text-left">
        <label
          htmlFor=""
          className="font-bold mb-1 block">
          Open AI API Key
        </label>
        <input
          className='w-full rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700'
          onChange={(e) => setOpenAIAPIKey(e.target.value) }
          value={openAIAPIKey}
          placeholder='sk-K8x7I4PX2R8HHkEEehV3AZZ3TIhi1WAdZT7oRzxGbbtlasTZ'
          type="text" />
      </div>
    </div>
  )
}
