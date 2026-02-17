import { Ghost } from 'lucide-react';

export default function Navbar(){
    return (
        <nav className='flex justify-between items-center w-full p-4'>
                    <div><Ghost className="m-auto w-15 h-15 text-[#06c739]" /><h2 className='text-bold text-[18px]'>Are u Alive?</h2></div>
            <div>
                <ul className="flex space-x-4 list-none p-0 m-0">
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
        </nav>
    );
}