import { useOutletContext } from 'react-router-dom';

import MainProfile from './MainProfile';

function YourProfile() {
    const user = useOutletContext()
    return (
        <MainProfile user={user} />
    )
}
export default YourProfile

