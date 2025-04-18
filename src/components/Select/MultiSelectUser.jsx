import { Listbox, ListboxButton, ListboxOption, ListboxOptions} from '@headlessui/react'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import UserOption from './Option/UserOption'
import { TbCaretUpDownFilled } from "react-icons/tb";
import UnitSelectedUsers from './Unit/UnitSelectedUsers';


const people = [
  { id: 1, name: 'Tom Cook', email: "a" },
  { id: 2, name: 'Wade Cooper', email: "b" },
  { id: 3, name: 'Tanya Fox',  email: "c" },
  { id: 4, name: 'Arlene Mccoy',  email: "d" },
  { id: 5, name: 'Devon Webb' },
]

export default function MultiSelectUser({value = [], onChange = (vals) => {}, options = people, loading = false, disabled = false}) {
    const [selectedPerson, setSelectedPerson] = useState([])
    const [isOpen, setOpen] = useState(false)

    const checkSelected = (email = "") =>{
        let emails = selectedPerson.map(p => p.email)
        return emails.includes(email) ? true : false
    }

    const cleanOptions = useMemo(() => {
      const opts = options.filter(op => op.hasOwnProperty("email"))

      return opts
    }, [options])

    useEffect(() => {
      const emails = selectedPerson.map(people => people.email)
      onChange(emails)
    }, [selectedPerson])

  return (
    <Listbox as='div' className='w-full relative text-sm' multiple value={selectedPerson} onChange={setSelectedPerson}>
        <ListboxButton disabled={disabled || loading} className={clsx(
          "w-full border border-neutral-300 py-3 px-4 rounded text-left  text-sm flex justify-between items-center",
          loading || disabled ? "cursor-not-allowed bg-neutral-100" : "cursor-auto"
        )} as='div'>
            {selectedPerson.length ? <UnitSelectedUsers selectedPerson={selectedPerson} />  : <span className='text-neutral-400 font-light'>Select Users</span>}
            {!loading ?<TbCaretUpDownFilled className='text-neutral-600' /> :
            <span className="loading loading-spinner loading-xs"></span>}
        </ListboxButton>
        <ListboxOptions transition className="w-full max-h-64 overflow-y-auto shadow-xl rounded absolute bg-white z-10 top-12 border border-neutral-200 origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0">
            {cleanOptions.map((person) => <UserOption data={person} isSelected={checkSelected(person.email)} key={person.id}/>)}
        </ListboxOptions>
    </Listbox>
      
  )
}