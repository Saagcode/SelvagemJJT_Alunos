import '@fortawesome/fontawesome-free/css/all.css';
import logoSelvagem from '../../public/images/logoSelvagem.png';
import './home.css'
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import kimono_profile from '../../public/images/kimono-profile.png'
import kimono_profile_2 from '../../public/images/kimono-profile_2.png'
import '../media-queries/home_media-queries.css'

function Home() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear()
        navigate('/');
    }
    const today = new Date();
    const day = today.getDate();
    let month = today.getMonth() + 1;
    const year = today.getFullYear();

    if (month < 10) {
        month = '0' + month;
    }
    const months = {
        '1': 'Janeiro',
        '2': 'Fevereiro',
        '3': 'Março',
        '4': 'Abril',
        '5': 'Maio',
        '6': 'Junho',
        '7': 'Julho',
        '8': 'Agosto',
        '9': 'Setembro',
        '10': 'Outubro',
        '11': 'Novembro',
        '12': 'Dezembro'
    };

    let monthwritted = today.getMonth() + 1;
    monthwritted = translateMonth(monthwritted.toString());
    function translateMonth(theMonth) {
        return months[theMonth];
    }


    const [todayRadio, setTodayRadio] = useState(false);
    const [tomorrowRadio, setTomorrowRadio] = useState(false);

    function handleTodayRadioChange() {
        setStorageSelectedDate(`${day}/${month}/${year}`)
        setTodayRadio(true);
        setTomorrowRadio(false);
    }


    function handleTomorrowRadioChange() {
        setStorageSelectedDate(`${day + 1}/${month}/${year}`)
        setTodayRadio(false);
        setTomorrowRadio(true);
    }

    useEffect(() => {
        Aos.init()
    });
    const [showModal, setShowModal] = useState(false);
    function closeModal() {
        setShowModal(false);
        setColor1('');
        setColor2('');
        setColor3('');
        setColor4('');
        setColor5('');
        setTodayRadio('');
        setTomorrowRadio('');
    }
    function scheduleClass() {
        setShowModal(!showModal);
    }
    const [showMenu, setShowMenu] = useState(false);
    function show() {
        if (showMenu === true) {
            setShowMenu(false)
        } else {
            setShowMenu(true)
        }
    }

    const [lastScheduledMonth, setLastScheduledMonth] = useState('');
    const [storageSelectedTime, setStorageSelectedTime] = useState('');
    const [storageSelectedDate, setStorageSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [dataClasses, setDataClasses] = useState([]);
    const [color1, setColor1] = useState(false);
    const [color2, setColor2] = useState(false);
    const [color3, setColor3] = useState(false);
    const [color4, setColor4] = useState(false);
    const [color5, setColor5] = useState(false);
    function changeColor1() {
        setStorageSelectedTime('16:30');
        setColor1(true);
        setColor2(false);
        setColor3(false);
        setColor4(false);
        setColor5(false);
    }

    function changeColor2() {
        setStorageSelectedTime('17:30');
        setColor1(false);
        setColor2(true);
        setColor3(false);
        setColor4(false);
        setColor5(false);
    }

    function changeColor3() {
        setStorageSelectedTime('18:30');
        setColor1(false);
        setColor2(false);
        setColor3(true);
        setColor4(false);
        setColor5(false);
    }

    function changeColor4() {
        setStorageSelectedTime('19:30');
        setColor1(false);
        setColor2(false);
        setColor3(false);
        setColor4(true);
        setColor5(false);
    }

    function changeColor5() {
        setStorageSelectedTime('20:30');
        setColor1(false);
        setColor2(false);
        setColor3(false);
        setColor4(false);
        setColor5(true);
    }

    const [confirm, setConfirm] = useState(false);
    function mouseEnter() {
        setConfirm(!confirm)
    }
    function mouseOut() {
        setConfirm(false)
    }


    function handleSubmit() {
        if (!(color1 || color2 || color3 || color4 || color5) || todayRadio === '' || tomorrowRadio === '') {
            Swal.fire({
                title: 'Algo deu errado.',
                text: 'Preencha todos os campos solicitados!',
                icon: 'error'
            })
        } else {
            Swal.fire({
                title: 'Confirmar agendamento?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Aula confirmada',
                        'Sua aula foi agendada com sucesso.',
                        'success'
                    );
                    setShowModal(false);
                    setColor1('');
                    setColor2('');
                    setColor3('');
                    setColor4('');
                    setColor5('');
                    setTodayRadio('');
                    setTomorrowRadio('');
                    setSelectedDate(storageSelectedDate);
                    setSelectedTime(storageSelectedTime);
                    const newDataClasses = [...dataClasses, { date: storageSelectedDate, time: storageSelectedTime }];
                    setDataClasses(newDataClasses);
                    setLastScheduledMonth(monthwritted);
                } else {
                    Swal.fire(
                        'Agendamento Cancelado',
                        'Sua aula não foi agendada.',
                        'warning'
                    );
                    setColor1('');
                    setColor2('');
                    setColor3('');
                    setColor4('');
                    setColor5('');
                    setTodayRadio('');
                    setTomorrowRadio('');
                    setSelectedDate('');
                    setSelectedTime('');
                }
            })
        }
    }
    const [door, setDoor] = useState(false);
    function doorOpen() {
        setDoor(true)
    }
    return (
        <>
            <section className="section-menu_container">
                <div className="grid-menu_content">
                    <div className={showMenu ? 'elipsis-menu' : 'elipsis-menu_2'} onClick={show}>
                        <span className='ball' />
                        <span className='ball' />
                        <span className='ball' />
                    </div>
                    <div className='learner-name'>
                        <h1>Olá, Nome</h1>
                    </div>
                    <div className='container-logout'>
                        {door && (
                            <h2 className={door ? 'text_exit' : ''} data-aos='zoom-in' data-aos-duration='500'>
                                Sair?
                            </h2>
                        )}
                        <button className='btn_exit' onClick={handleLogout}>
                            <span className={door ? 'fa-solid fa-door-open' : 'fa-solid fa-door-closed'} onMouseEnter={doorOpen} onMouseLeave={() => setDoor(false)} />
                        </button>
                    </div>
                    {showMenu && (
                        <ul data-aos='fade-left' data-aos-duration='800' data-aos-offset='10' onClick={scheduleClass}>
                            <li>
                                Agendar aula
                            </li>
                        </ul>
                    )}
                    <div className='next-class'>
                        <h1>Próxima aula: <br />{selectedDate && selectedTime ? `${selectedDate} às ${selectedTime}` : 'Não  agendada.'}</h1>
                    </div>
                </div>
                <section className='section_learner-area'>
                    <div className='class-history'>
                        <h1>
                            <span className='fa-solid fa-list-check' /> Aulas Realizadas
                        </h1><br />
                        <div className='scroll-classes'>
                            <h1>
                                {monthwritted}
                            </h1>
                            {dataClasses.map((classData, index) => (
                                <h1 key={index} className='history-schedules'> <br />
                                    {`${classData.date} às ${classData.time}`}
                                </h1>
                            ))}
                        </div>
                    </div>
                    <div className='info-history'>
                        <h1>
                            <span className='fa-regular fa-comment-dots' /> Mensagem do Sensei
                        </h1>
                        <textarea className='feedback-sensei-box' cols="20" rows="5" disabled></textarea>
                    </div>
                </section>
                <div className='container-logo'>
                    <img src={logoSelvagem} alt="logo" className='logo-jjt' />
                </div>
                {showModal && (
                    <div className='modal-backdrop'>
                        <dialog className='modal-dialog' open>
                            <button className='container-cancel-btn' onClick={closeModal}>
                                <span className='fa-regular fa-circle-xmark' />
                            </button>
                            <section className='section-schedule_class'>
                                <div className='container-kimono-profile'>
                                    {todayRadio || tomorrowRadio || color1 || color2 || color3 || color4 || color5 ?
                                        <img src={kimono_profile_2} alt="kimono" className='kimono-profile_2' />
                                        : (
                                            <img src={kimono_profile} alt="kimono" className='kimono-profile' data-aos='zoom-in' data-aos-duration='1000' />
                                        )}
                                </div>
                                <div>
                                    <h1 className='title-date'>
                                        Data de agendamento:
                                    </h1>
                                    <div className='radio-input'>
                                        <label htmlFor="today">
                                            <input type="radio" className='today' id='today' checked={todayRadio} onChange={handleTodayRadioChange} />
                                            Hoje ({day}/{month}/{year})
                                        </label>
                                        <label htmlFor="tomorrow">
                                            <input type="radio" className='tomorrow' id='tomorrow' checked={tomorrowRadio} onChange={handleTomorrowRadioChange} />
                                            Amanhã ({day + 1}/{month}/{year})
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h1 className='title-schedule'>
                                        Qual o melhor horário?
                                    </h1>
                                    <div className='schedules'>
                                        <hgroup>
                                            <h1 className={color1 ? 'schedules-change' : 'schedules-default'} onClick={changeColor1} onChange={e => setColor1(e.target.value)}>
                                                16:30
                                            </h1>
                                            <h1 className={color2 ? 'schedules-change' : 'schedules-default'} onClick={changeColor2} onChange={e => setColor2(e.target.value)}>
                                                17:30
                                            </h1>
                                            <h1 className={color3 ? 'schedules-change' : 'schedules-default'} onClick={changeColor3} onChange={e => setColor3(e.target.value)}>
                                                18:30
                                            </h1>
                                            <h1 className={color4 ? 'schedules-change' : 'schedules-default'} onClick={changeColor4} onChange={e => setColor4(e.target.value)}>
                                                19:30
                                            </h1>
                                            <h1 className={color5 ? 'schedules-change' : 'schedules-default'} onClick={changeColor5} onChange={e => setColor5(e.target.value)}>
                                                20:30
                                            </h1>
                                        </hgroup>
                                    </div>
                                </div>
                            </section>
                            <button className='container-confirm-btn' onClick={handleSubmit} onMouseEnter={mouseEnter} onMouseLeave={mouseOut}>
                                {confirm && (
                                    <h1 data-aos='zoom-in' data-aos-duration='500'>
                                        Confirmar?
                                    </h1>
                                )}
                                <span className='fa-solid fa-circle-arrow-right' />
                            </button>
                        </dialog>
                    </div>
                )}
            </section>
        </>
    )
}

export default Home
