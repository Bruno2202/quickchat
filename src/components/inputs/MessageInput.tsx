import { Send } from 'lucide-react';

interface Props {
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSend: () => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function MessageInput({ value, placeholder, onChange, onSend, onKeyDown }: Props) {
    return (
        <div className="flex flex-row gap-4 items-center">
            <input
                value={value}
                onChange={onChange}
                className="flex flex-1 outline-none rounded-8 py-2 px-4 placeholder:font-semibol bg-darkGrey"
                placeholder={placeholder}
                onKeyDown={onKeyDown}
                maxLength={2000}
            />
            <Send onClick={onSend} className='hover:text-blue transition-all hover:size-8 duration-300 cursor-pointer' />
        </div>
    )
}