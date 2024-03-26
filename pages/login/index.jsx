import { useState, useEffect } from 'react';
import logoSelvagem from '../../public/images/logoSelvagem.png';
import '@fortawesome/fontawesome-free/css/all.css';
import './login.css';
import '../media-queries/login_media-queries.css'
import Aos from 'aos';
import 'aos/dist/aos.css';
import kimono from '../../public/images/kimono.png';
import Swal from 'sweetalert2';
import { ScaleLoader } from 'react-spinners';
import { useNavigate} from 'react-router-dom';
import Api from '../../services/Api'

function Login() {
    const [error, setError] = useState('');
    const [openModalLoading, setOpenModalLoading] = useState(false);
    const [id, setId] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        Aos.init()
    }, [])

    function handleSubmit() {
        if (id === '') {
            Swal.fire({
                title: 'Erro:',
                text: 'ID não preenchido ou incorreto.',
                icon: 'error'
            })
            setOpenModalLoading(false);
            setId('');
            return;
        } else {
            Swal.fire({
                title: 'Identificação realizada',
                text: 'Aguarde...',
                icon: 'success'
            })
            setOpenModalLoading(true);
            setId('');
            const requestBody = {
                id: id
            }
            Api.post('sessions', requestBody)
                .then(response => {
                    const authorizationKey = response.data.authorizationKey;
                    localStorage.setItem('sessionKey', authorizationKey);
                    localStorage.setItem('userId', id);
                    setTimeout(() => {
                        navigate('/home');
                    }, 3000);
                })
                .catch(error => {
                    setError('ID incorreto, Verifique e tente novamente.')
                    setTimeout(() => {
                        setError('');
                    }, 2500);
                    setOpenModalLoading(false);
                    console.log(error);
                })
        }
    }
    function closeLoader() {
        setOpenModalLoading(false);
    }

    return (
        <>
            {openModalLoading && (
                <div className='backdrop-loading' onClick={closeLoader}>
                    <dialog className='modal-loading'>
                        <div>
                            <ScaleLoader
                                color='#ffbb00'
                                size={100}
                                loading={true}
                            />
                        </div>
                    </dialog>
                </div>
            )}
            <section className='section-logo'>
                <div>
                    <img
                        src={logoSelvagem}
                        alt="logotipo"
                    />
                </div>
            </section>
            <img src={kimono} alt="" className={id ? 'kimono-img-writted' : 'kimono-img'} />
            <section className='container_section-form' data-aos='fade-up' data-aos-duration='1500' data-aos-offset='50'>
                <form action="post">
                    <div className='title-text' data-aos='fade-left' data-aos-duration='2000' data-aos-offset='50'>
                        <h1>
                            Login
                        </h1>
                    </div>
                    <div className='learner-input-section'>
                        <h2 className='title-id'>
                            Sua ID
                        </h2>
                        <input
                            type="number"
                            placeholder='Preencha somente números'
                            value={id}
                            onChange={e => setId(e.target.value)}
                            class='no-spin'
                        />
                            <button type='button' className='btn_submit' onClick={handleSubmit}>
                                Entrar
                            </button>
                    </div>
                    <div>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login