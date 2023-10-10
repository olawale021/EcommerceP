import React ,{useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import Alert from 'react-bootstrap/Alert';
import axios from "axios"
import ShopCategories from '../../shopcategory/ShopCategories'
import CustomerReview from '../../customerreview/CustomerReview'
function Register() {
    const [user, setUser] = useState({
        name:'', email:'', password:''
    })
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    const onChangeInput = (e) =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }
    const registerSubmit = async (e) =>{
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user})
            localStorage.setItem('firstLogin', true)
            window.location.href = "/"
        } catch (err) {
            setAlertMsg(err.response.data.msg)
            setShowAlert(true)
        }
    }

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);


    return (
        <>
        {showAlert && (
                <Alert variant="danger" 
                onClose={() => setShowAlert(false)} dismissible
                style={{
                    textAlign: 'center',
                    color: 'red',
                }}
                >
                    {alertMsg}
                </Alert>
            )}
        <div className='login'>
                <div className="login-page">
                    <form onSubmit={registerSubmit}>
                        <h2>Register</h2>
                    <input type="text" name="name" required placeholder="Name" 
                        onChange={onChangeInput}  value={user.name}/>

                        <input type="email" name="email" required placeholder="Email" 
                        onChange={onChangeInput}  value={user.email}/>

                        <input type="password" name="password" required placeholder ="Password" value={user.password} 
                        onChange={onChangeInput}/>
                        
                        <div className="row">
                            <button type="submit">Register</button>
                            <Link to="/login">Login</Link>
                        </div>
                    </form>
                </div>
                <ShopCategories />
                <div>
                   <CustomerReview />
                </div>
            </div>
         </>
    )
}

export default Register