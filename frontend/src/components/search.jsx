import { useEffect, useState, useDebounceValue } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Search() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (search == '') {
            return;
        }

        navigate(`/explore?search=${search}`);

    }, [search])

    let timeout;

    function debouneSearchChange(event) {

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            setSearch(event.target.value);
        }, 300);

    }

    return (
        <div>
            <input type='search' className='rounded bg-blue-500' onClick={() => { navigate('/explore') }} onChange={(e) => { debouneSearchChange(e) }} placeholder='Global Search'></input>
        </div>
    )
}