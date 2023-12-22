import React, {FC} from 'react'


interface InputProps {
    id: string;
    onChange: any;
    value: string;
    label: string;
    type?: string;
}

const Input: FC<InputProps> = ({
    id,
    onChange,
    value,
    label,
    type
}) => {
    return (
       <div className="relative">

            <input onChange={onChange} type={type} value={value} id={id} className="
                    block
                    rounded-nd
                    px-6
                    pt-6
                    pb-1
                    rounded
                    w-full
                    text-md
                    text-white
                    bg-neutral-700
                    apperance-none
                    focus: outline-none
                    focus: ring-0
                    peer
                
                    "
                    placeholder=" "
                        />
                <label className="
                    absolute
                    text-md
                    texte-zinc-400
                    duration-150
                    transform
                    -translate-y-3
                    scale-75
                    top-4
                    z-10
                    origin-[0]
                    left-6
                    peer-placeholder-shown: scale-100
                " htmlFor={id}>
                    {label}
                </label>
       </div>
    )
}

export default Input