import { useEffect, useState } from 'react'
import { DefaultHome } from '../components/DefaultHome'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { UserHome } from '../components/UserHome';

export const AppHome = () => {
    const [isloggedIn, setIsLoggedIn] = useState(false);
    const userDetailsVal = useSelector((state: RootState) => state.userDetails);
    const { loading, user } = userDetailsVal;

    useEffect(() =>{
        if(user){
          setIsLoggedIn(true);
        }else{
          setIsLoggedIn(false);
        }
    }, [user])
  return (
    <>{loading? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ): (
        isloggedIn ? <UserHome /> : <DefaultHome />
      )}
    </>
  )
}
