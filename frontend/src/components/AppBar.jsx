import {useNavigate} from 'react-router-dom'
import Search from './search';

export default function AppBar() {
    const navigate = useNavigate(); 

    return (
        <div>
        <div className='bg-red-500'> <h1>InspireBoard</h1> </div>
            
        <div className="flex space-x-10 bg-green-500">
            <button onClick={()=>{navigate('/explore')}}>Explore</button>
            <Search></Search>
            <button onClick={()=>{navigate('/profile')}}>Profile</button>
        </div>
        </div>
    )
}